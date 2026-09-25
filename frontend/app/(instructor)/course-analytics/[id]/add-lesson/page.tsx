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
        <main className="max-w-4xl p-8">

            <h1 className="heading-1">
                Create New Lesson
            </h1>

            <form
                onSubmit={handleSubmit}
                className=""
            >

                <section className="rounded-3xl bg-white space-y-4 shadow">

                    <div className="">

                        {/* title */}
                        <div>

                            <label className="mb-2 block font-medium">
                                Lesson Title
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
                                    placeholder="Introduction"
                                    className="input-1"
                                    required
                                />

                            </div>

                        </div>

                        <br />

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
                        <br />

                        {/* Video URL */}
                        <div>

                            <label className="">
                                Video URL
                            </label>

                            <div className="flex items-center rounded-xl gap-2">

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
                                    className="input-1"
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

                <br />



                <button
                    type="submit"
                    disabled={loading}
                    className="button-1 flex gap-2 items-center"
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
                            Create
                        </>
                    )}
                </button>



            </form>

        </main>
    );
}