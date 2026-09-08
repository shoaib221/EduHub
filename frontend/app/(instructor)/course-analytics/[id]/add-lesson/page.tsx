"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    BookOpen,
    Clock,
    FileText,
    Loader2,
    Save,
    Video,
} from "lucide-react";

import api from "@/lib/axios";
import BlockNoteEditor from "@/components/blocknote/BlocknoteEditor";
import { Lesson } from "@/types/lesson";


interface AddLessonProps {
    courseId: string;
}



export default function AddLesson({ }: AddLessonProps) {

    const { id: courseId } = useParams<{ id: string }>();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState<Lesson>({
        title: "",
        videoURL: "",
        content: [],
        order: 0
    });

    function handleChange(
        e: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
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

            console.log(formData);

            await api.post(
                `/course/${courseId}/lesson`,
                formData
            );

            window.location.reload();

        }
        catch (err: any) {
            setError(
                err.response?.data?.error?.message ??
                "Failed to create lesson."
            );
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto max-w-4xl p-8">

            <h1 className="mb-8 text-4xl font-bold">
                Add Lesson
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <section className="rounded-3xl bg-white p-8 shadow">

                    <div className="space-y-6">

                        {/* title */}
                        <div>

                            <label className="mb-2 block font-medium">
                                Lesson Title
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
                                    placeholder="Introduction"
                                    className="w-full p-4 outline-none"
                                    required
                                />

                            </div>

                        </div>

                        {/* Content */}
                        <div>

                            <label className="mb-2 block font-medium">
                                Content
                            </label>

                            <BlockNoteEditor
                                name="content"
                                value={formData.content}
                                onChange={(name, value) => {
                                    setFormData({ ...formData, [name]: value });
                                }}
                            />

                        </div>


                        {/* Video URL */}
                        <div>

                            <label className="mb-2 block font-medium">
                                Video URL
                            </label>

                            <div className="flex items-center rounded-xl border px-4">

                                <Video
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="videoURL"
                                    value={formData.videoURL}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full p-4 outline-none"
                                />

                            </div>

                        </div>

                        {/* <div>

                            <label className="mb-2 block font-medium">
                                Duration
                            </label>

                            <div className="flex items-center rounded-xl border px-4">

                                <Clock
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="18 minutes"
                                    className="w-full p-4 outline-none"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">
                                Lesson Notes
                            </label>

                            <div className="rounded-xl border">

                                <div className="flex items-center gap-2 border-b px-4 py-3">

                                    <FileText
                                        size={18}
                                        className="text-slate-400"
                                    />

                                    <span className="font-medium">
                                        Notes
                                    </span>

                                </div>

                                <textarea
                                    rows={10}
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Write lesson notes..."
                                    className="w-full resize-none p-4 outline-none"
                                />

                            </div>

                        </div> */}

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
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Add Lesson
                            </>
                        )}
                    </button>

                </div>

            </form>

        </main>
    );
}