"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CirclePlus, Loader2, Save, Trash2 } from "lucide-react";
import api from "@/lib/axios";
import QuestionCreator from "@/components/question/QuestionInput";
import { Question } from "@/types/question";
import { Quiz } from "@/types/quiz";
import { Circle, CircleDot } from "lucide-react";
import ErrorProcessor from "@/lib/ErrorProcessor";



export default function EditQuizPage() {
    const router = useRouter();

    const { id, quizId } = useParams<{
        id: string;
        quizId: string;
    }>();

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    useEffect(() => {
        if (!quizId) {
            return;
        }

        async function fetchQuiz() {
            try {
                setLoading(true);
                const response = await api.get(`/quiz/${quizId}`);
                setQuiz(response.data.quiz);
                setQuestions(response.data.quiz?.questions)

                console.log("Fetched quiz:", response);

            } catch (err) {
                setError(
                    "Failed to fetch quiz data. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchQuiz();
    }, [quizId]);


    async function fetchQuestions() {
        try {
            setLoading(true);
            const response = await api.get(
                `/quiz/${quizId}/questions`
            );

            console.log("Fetched questions:", response);

            setQuestions(response.data.questions);
        } catch (err) {
            setError(
                "Failed to fetch quiz data. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    }



    async function deleteQuestion(questionId: number) {
        console.log("questionId", questionId)

        try {
            const response = await api.delete(
                `/question/${questionId}`
            );
        }
        catch (err) {
            setError(
                "Failed to delete question. Please try again later."
            );
        }
    }

    async function deleteQuiz() {
        try {
            const response = await api.delete(`/quiz/${quizId}`)
            router.push("/dashboad")
        } catch (err) {
            setError(ErrorProcessor(err))
        }
    }


    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            await api.patch(
                `/quiz/${quizId}`,
                {
                    title: quiz?.title,
                    description: quiz?.description,
                    questions,
                }
            );

            router.push(`/course-analytics/${id}`);
        } catch (err: any) {
            setError(
                err.response?.data?.error?.message ??
                "Failed to update quiz."
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }



    return (
        <main className="mx-auto max-w-6xl p-8">

            <h1 className="heading-1">
                Edit Quiz
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <section className="rounded-3xl bg-white shadow">

                    <label className="">
                        Quiz Title
                    </label>

                    <input
                        value={quiz?.title}
                        onChange={(e) =>
                            setQuiz((currentQuiz) =>
                                currentQuiz
                                    ? { ...currentQuiz, title: e.target.value }
                                    : null
                            )
                        }
                        className="input-1"
                        required
                    />

                    <br /> <br />

                    <label className="font-semibold">
                        Description
                    </label>

                    <textarea
                        value={quiz?.description}
                        onChange={(e) =>
                            setQuiz((currentQuiz) =>
                                currentQuiz
                                    ? { ...currentQuiz, description: e.target.value }
                                    : null
                            )
                        }
                        className="input-1"
                        rows={5}
                        required
                    />

                </section>

                {error && (
                    <div className="rounded-xl bg-red-100 p-4 text-red-700">
                        {error}
                    </div>
                )}

                <div className="flex gap-2">

                    <button
                        disabled={saving}
                        className="button-1 flex gap-2 items-center"
                        type="submit"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save />
                                Update Quiz
                            </>
                        )}
                    </button>

                    <button
                        disabled={saving}
                        className="button-2 flex gap-2 items-center"
                        onClick={deleteQuiz}
                    >
                        <Trash2 />
                        Delete Quiz
                    </button>



                </div>

            </form>

            <br /><br />

            <div className="heading-2" >Create New Question</div>

            <QuestionCreator quizId={quizId} onCreation={fetchQuestions} />

            <br /><br />

            <div className="heading-2" >Questions</div>


            {questions.map((question, quesNo) => (

                <div
                    key={question.id}
                    className="items-center justify-between rounded-xl bg-white p-5 shadow"
                >

                    <p className="flex items-center justify-between gap-3 text-lg font-semibold">


                        <div>
                            Q {quesNo + 1}
                        </div>

                        <button
                            onClick={() =>
                                deleteQuestion(question.id || 0)
                            }
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 />
                        </button>
                    </p>

                    <div>
                        {question.statement || "Untitled Question"}
                    </div>


                    <ul className="space-y-2">
                        {question.options?.map((option, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-3 rounded-lg px-3 py-2"
                            >
                                {question.correctAnswer === index ? (
                                    <CircleDot className="h-5 w-5 text-green-600" />
                                ) : (
                                    <Circle className="h-5 w-5 text-slate-400" />
                                )}

                                <span
                                    className={
                                        question.correctAnswer === index
                                            ? "font-medium text-green-700"
                                            : "text-slate-700"
                                    }
                                >
                                    {option}
                                </span>
                            </li>
                        ))}
                    </ul>




                </div>

            ))}


        </main>
    );
}