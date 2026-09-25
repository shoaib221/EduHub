"use client"

import { Quiz } from "@/types/quiz";
import { CheckCircle } from "lucide-react";



export default function Page({ quiz, answers, optionSelect, onSubmit }: { quiz: Quiz, answers: Record<number, number>, optionSelect: (x: number, y: number) => void, onSubmit: any }) {

    return (
        <>

            {/* Summary */}
            <div
                className={`rounded-2xl p-6 text-center shadow-sm`}
            >

                <h1 className="heading-1 text-center">
                    Quiz Test
                </h1>

                <br />

                <div className="heading-2" >
                    Title
                </div>

            </div >

            <div className="space-y-8">

                {quiz.questions?.map((question, questionIndex) => (

                    <section
                        key={questionIndex}
                        className="rounded-3xl bg-white p-8 shadow-sm"
                    >

                        <h2 className="text-xl font-semibold text-slate-900">
                            Question {questionIndex + 1}
                        </h2>

                        <p className="mt-4 text-lg text-slate-700">
                            {question.statement}
                        </p>

                        <div className="mt-8 space-y-4">

                            {question.options.map(
                                (option, optionIndex) => (

                                    <label
                                        key={optionIndex}
                                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition 
                                            ${answers[question.id!] === optionIndex
                                                ? "border-blue-600 bg-blue-50"
                                                : "border-slate-200 hover:bg-slate-50"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            checked={answers[question.id!] === optionIndex}
                                            onChange={() => optionSelect(question.id!, optionIndex)}
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

            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                        onClick={onSubmit}
                        className="flex items-center gap-2 button-1"
                    >
                        <CheckCircle size={18} />
                        Submit Answers
                    </button>
                </div>
            </section>
        </>
    )
}