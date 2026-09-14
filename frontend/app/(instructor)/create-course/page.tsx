"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
    BookOpen,
    DollarSign,
    FileText,
    ImageIcon,
    Loader2,
    Save,
    Users,
} from "lucide-react";

import api from "@/lib/axios";

export default function CreateCoursePage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: 0,
        coverImage: "",
    });

    function handleChange(
        e: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await api.post(
                "/course",
                formData
            );

            setFormData({
                title: "",
                description: "",
                category: "",
                price: 0,
                coverImage: "",
            });

        }
        catch (err: any) {
            console.dir(err);
            setError(
                err.response?.data?.error?.message ??
                "Failed to create course."
            );
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto max-w-5xl p-8">

            <h1 className="mb-8 text-4xl font-bold">
                Create New Course
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <section className="rounded-3xl bg-white p-8 shadow">

                    <div className="grid gap-6">

                        <div>

                            <label className="mb-2 block font-medium">
                                Course Title
                            </label>

                            <div className="flex items-center rounded-xl border px-4">

                                <BookOpen
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-4 outline-none"
                                    placeholder="Complete React Course"
                                    required
                                />

                            </div>

                        </div>

                        {/* <div>

                            <label className="mb-2 block font-medium">
                                Subtitle
                            </label>

                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-4 outline-none"
                                placeholder="Master React from beginner to advanced"
                            />

                        </div> */}

                        <div>

                            <label className="mb-2 block font-medium">
                                Description
                            </label>

                            <textarea
                                rows={8}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-4 outline-none"
                                placeholder="Describe your course..."
                                required
                            />

                        </div>

                    </div>

                </section>

                <section className="grid gap-6 md:grid-cols-2">

                    <div className="rounded-3xl bg-white p-8 shadow">

                        <h2 className="mb-6 text-xl font-semibold">
                            Course Details
                        </h2>

                        <div className="space-y-5">

                            <div>

                                <label className="mb-2 block">
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border p-4"
                                />

                            </div>

                            {/* <div>

                                <label className="mb-2 block">
                                    Level
                                </label>

                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border p-4"
                                >
                                    <option>
                                        Beginner
                                    </option>

                                    <option>
                                        Intermediate
                                    </option>

                                    <option>
                                        Advanced
                                    </option>

                                </select>

                            </div> */}

                            {/* <div>

                                <label className="mb-2 block">
                                    Language
                                </label>

                                <input
                                    type="text"
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border p-4"
                                />

                            </div> */}

                        </div>

                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow">

                        <h2 className="mb-6 text-xl font-semibold">
                            Pricing & Media
                        </h2>

                        <div className="space-y-5">

                            <div>

                                <label className="mb-2 block">
                                    Price ($)
                                </label>

                                <div className="flex items-center rounded-xl border px-4">

                                    <DollarSign
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full p-4 outline-none"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block">
                                    Cover Image URL
                                </label>

                                <div className="flex items-center rounded-xl border px-4">

                                    <ImageIcon
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        name="coverImage"
                                        value={formData.coverImage}
                                        onChange={handleChange}
                                        className="w-full p-4 outline-none"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {error && (
                    <div className="rounded-xl bg-red-100 p-4 text-red-700">
                        {error}
                    </div>
                )}

                <div className="flex justify-end">

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Create Course
                            </>
                        )}
                    </button>

                </div>

            </form>

        </main>
    );
}