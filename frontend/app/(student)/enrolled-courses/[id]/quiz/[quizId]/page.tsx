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
import { useParams, useRouter } from "next/navigation";
import { Quiz } from "@/types/quiz";
import api from "@/lib/axios";
import ErrorProcessor from "@/lib/ErrorProcessor";
import { QuizResult } from "@/types/quizResult";
import QuizResultPage from "@/components/quiz/quizResult";
import QuizQuestion from "@/components/quiz/quizQuestion";


export default function QuizPage() {
    const router = useRouter();
    const { id: courseId, quizId } = useParams();
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

    useEffect(() => {
        async function FetchQuiz() {
            // console.log("fetch quiz");
            try {
                const response = await api.get(`/quiz/${quizId}`);
                setQuiz(response.data.quiz);
                // console.log(response.data.quiz);
            }
            catch (err) {
                ErrorProcessor(err);
            }
        }

        async function FetchQuizResult() {
            try {
                const response = await api.get(`/quiz-result/${quizId}`)
                if (response.data.result) {
                    console.log(response.data.result)
                    setQuizResult(response.data.result)
                }
            }
            catch (err) {
                ErrorProcessor(err)
            } finally {
                await FetchQuiz();
            }
        }


        FetchQuizResult();
    }, [])

    useEffect(() => {
        if (answers) console.log(answers)
    }, [answers])

    function handleSelect(
        questionId: number,
        optionIndex: number
    ) {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex,
        }));
    }

    async function handleSubmit() {
        try {
            const response = await api.post(`/quiz-test/${quiz?.id}`, {
                answers
            });
            console.log("quiz submitted successfully")
            setQuizResult(response.data.quizResult);
            window.location.reload();
        }
        catch (err) {
            ErrorProcessor(err)
        }
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
                                {quiz?.title}
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
            {
                quizResult ?
                    <QuizResultPage quiz={quiz} quizResult={quizResult} />
                    :
                    <QuizQuestion onSubmit={handleSubmit} quiz={quiz} answers={answers} optionSelect={handleSelect} />
            }



        </div>
    );
}