"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Clock,
    HelpCircle,
    Loader,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Quiz } from "@/types/quiz";
import api from "@/lib/axios";
import ErrorProcessor from "@/lib/ErrorProcessor";


export default function QuizPage() {

    const { id: courseId, quizId } = useParams()

    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [quiz, setQuiz] = useState<Quiz | null>(null)

    useEffect(() => {
        async function FetchQuiz() {
            try {
                const response = await api.get(`/quiz/${quizId}`)
                setQuiz(response.data.quiz)
                console.log(response.data.quiz)
            }
            catch (err) {
                ErrorProcessor(err);
            }
        }

        FetchQuiz()
    }, [])

    function handleSelect(
        questionId: number,
        optionIndex: number
    ) {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionIndex,
        }));
    }

    function handleSubmit() {
        // TODO:
        // POST answers to Strapi

        console.log(answers);
    }

    if (!quiz) return <Loader />

    return (
        <div className="mx-auto max-w-5xl space-y-8">

            {/* Header */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex flex-wrap items-center justify-between gap-6">

                    <div>

                        <div className="flex items-center gap-3">

                            <HelpCircle className="text-blue-600" />

                            <h1 className="text-3xl font-bold text-slate-900">
                                {quiz.title}
                            </h1>

                        </div>

                        <p className="mt-3 text-slate-500">
                            Answer every question before
                            submitting.
                        </p>

                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-orange-100 px-5 py-3 font-semibold text-orange-700">

                        <Clock size={18} />

                        {/* {quiz.duration} Minutes */}

                    </div>

                </div>

            </section>

            {/* Questions */}
            <div className="space-y-8">

                {quiz.questions?.map((question, index) => (

                    <section
                        key={question.id}
                        className="rounded-3xl bg-white p-8 shadow-sm"
                    >

                        <h2 className="text-xl font-semibold text-slate-900">

                            Question {index + 1}

                        </h2>

                        <p className="mt-4 text-lg text-slate-700">
                            {question.statement}
                        </p>

                        <div className="mt-8 space-y-4">

                            {question.options.map(
                                (option, optionIndex) => (

                                    <label
                                        key={optionIndex}
                                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${answers[
                                            question.id!
                                        ] === optionIndex
                                            ? "border-blue-600 bg-blue-50"
                                            : "border-slate-200 hover:bg-slate-50"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            checked={
                                                answers[
                                                question.id!
                                                ] ===
                                                optionIndex
                                            }
                                            onChange={() =>
                                                handleSelect(
                                                    question.id!,
                                                    optionIndex
                                                )
                                            }
                                        />

                                        <span>
                                            {option}
                                        </span>

                                    </label>
                                )
                            )}

                        </div>

                    </section>

                ))}

            </div>

            {/* Footer */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex flex-wrap items-center justify-between gap-4">

                    <Link
                        href={`/enrolled-courses/${courseId}/lesson/${quizId}`}
                        className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
                    >

                        <ArrowLeft size={18} />

                        Back to Lesson

                    </Link>

                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                    >

                        <CheckCircle size={18} />

                        Submit Quiz

                    </button>

                    <Link
                        href={`/enrolled-courses/${courseId}/lesson/${Number(quizId || 1) + 1
                            }`}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                    >

                        Next Lesson

                        <ArrowRight size={18} />

                    </Link>

                </div>

            </section>

        </div>
    );
}