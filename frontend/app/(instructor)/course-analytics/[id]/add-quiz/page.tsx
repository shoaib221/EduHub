"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
    CirclePlus,
    Save,
    Trash2,
    Loader2,
} from "lucide-react";

import api from "@/lib/axios";
import { Question } from "@/types/question";
import { useParams } from "next/navigation";


export default function AddQuizPage() {

    const { id: courseId } = useParams<{ id: string }>();


    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [order, setOrder] = useState(1);


    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            console.log(title, description, order, courseId);

            await api.post("/quiz", {
                title,
                description,
                order,
                courseId,
            });

            setTitle("");
            setDescription("");
            setOrder(1);

            alert("Quiz created successfully!");


        } catch (err: any) {
            setError(
                err.response?.data?.error?.message ??
                "Failed to create quiz."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto max-w-6xl p-8">

            <h1 className="mb-8 text-4xl font-bold">
                Create Quiz
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <section className="rounded-3xl bg-white p-8 shadow">

                    <div>
                        <label className="mb-2 block font-semibold">
                            Quiz Title
                        </label>

                        <input
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="w-full rounded-xl border p-4"
                            placeholder="Quiz 1"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            rows={5}
                            className="w-full rounded-xl border p-4"
                            placeholder="Quiz 1"
                            required
                        />

                    </div>


                </section>



                {error && (
                    <div className="rounded-xl bg-red-100 p-4 text-red-700">
                        {error}
                    </div>
                )}

                <div className="flex justify-end">

                    <button
                        disabled={loading}
                        className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save />
                                Create Quiz
                            </>
                        )}
                    </button>

                </div>

            </form>

        </main>
    );
}