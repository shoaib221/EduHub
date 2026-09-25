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

            <div className="heading-2 text-center">
                Create New Course
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <section className="rounded-3xl bg-white px-8 shadow">

                    <div className="grid gap-6">

                        <div>

                            <label className="mb-2 block font-medium">
                                Course Title
                            </label>

                            <div className="flex items-center rounded-xl gap-2">

                                <BookOpen
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="input-1"
                                    placeholder="Complete React Course"
                                    required
                                />

                            </div>

                        </div>



                        <div>

                            <label className="mb-2 block font-medium">
                                Description
                            </label>

                            <textarea
                                rows={8}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input-1"
                                placeholder="Describe your course..."
                                required
                            />

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block">
                            Cover Image URL
                        </label>

                        <div className="flex items-center rounded-xl gap-2">

                            <ImageIcon
                                size={18}
                                className="text-slate-400"
                            />

                            <input
                                type="text"
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleChange}
                                className="input-1"
                                placeholder="https://example.com/image.jpg"
                            />

                        </div>

                    </div>

                </section>

                <section className="grid gap-4 md:grid-cols-2 px-8">



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
                                className="input-1"
                                placeholder="science, business, humanity etc"
                            />



                        </div>



                    </div>







                    <div className="space-y-5">

                        <div>

                            <label className="mb-2 block">
                                Price ($)
                            </label>

                            <div className="flex items-center rounded-xl">

                                <DollarSign
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="input-1"
                                    placeholder="Enter course peice"
                                />

                            </div>

                        </div>



                    </div>



                </section>

                {error && (
                    <div className="rounded-xl bg-red-100 p-4 text-red-700">
                        {error}
                    </div>
                )}

                <div className="flex justify-center">

                    <button
                        type="submit"
                        disabled={loading}
                        className="button-1 flex gap-1 items-center"
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