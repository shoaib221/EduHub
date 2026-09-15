"use client";

import { Quiz } from "@/types/quiz";
import { QuizResult } from "@/types/quizResult";



export default function Page({
    quiz, quizResult
}: { quiz: Quiz, quizResult: QuizResult }) {

    const totalQuestions = quiz.questions?.length ?? 1;
    const percentage = Math.round(
        (quizResult.score / Number(totalQuestions)) * 100
    );

    const passed = percentage >= 50;


    return (
        <div className="mx-auto max-w-4xl space-y-6">

            {/* Summary */}
            <div
                className={`rounded-2xl p-6 text-center shadow-sm ${passed
                    ? "bg-green-50"
                    : "bg-red-50"
                    }`}
            >
                <h1 className="text-3xl font-bold">
                    Quiz Result
                </h1>


                <p
                    className={`mt-3 text-xl font-semibold ${passed
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                >
                    {passed ? "Passed" : "Failed"}
                </p>


                <div className="mt-4 text-4xl font-bold">
                    {percentage}%
                </div>


                <p className="mt-2 text-slate-600">
                    {quizResult.score} out of {totalQuestions} correct
                </p>
            </div>



            {/* Questions */}
            <div className="space-y-4">

                {quiz.questions?.map(
                    (question, index) => {

                        const correct =
                            quizResult.answers[question.id!] ===
                            question.correctAnswer;


                        return (
                            <div
                                key={question.id}
                                className="rounded-2xl bg-white p-5 shadow-sm"
                            >

                                <div className="flex justify-between">
                                    <h2 className="font-semibold">
                                        {index + 1}. {question.statement}
                                    </h2>


                                    <span
                                        className={
                                            correct
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {correct
                                            ? "Correct"
                                            : "Wrong"}
                                    </span>

                                </div>



                                <div className="mt-4 space-y-2">

                                    {question.options.map(
                                        (option, optionIndex) => {

                                            const isSelected = optionIndex === quizResult.answers[question.id!];

                                            const isCorrect = optionIndex === question.correctAnswer;


                                            return (
                                                <div
                                                    key={optionIndex}
                                                    className={`
                                                        rounded-lg border p-2
                                                        ${isCorrect
                                                            ? "border-green-600 bg-green-50"
                                                            : isSelected ? "border-red-600" : "border-slate-200"
                                                        }
                                                    `}
                                                >


                                                    <div className="flex items-center gap-2">

                                                        <span>
                                                            {String.fromCharCode(
                                                                65 + optionIndex
                                                            )}.
                                                        </span>

                                                        <span>
                                                            {option}
                                                        </span>

                                                    </div>



                                                </div>
                                            );
                                        }
                                    )}

                                </div>

                            </div>
                        );
                    }
                )}

            </div>

        </div>
    );
}