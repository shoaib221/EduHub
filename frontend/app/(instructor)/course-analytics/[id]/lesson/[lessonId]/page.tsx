"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import ErrorProcessor from "@/lib/ErrorProcessor";


interface AddLessonProps {
    courseId: string;
}



export default function UpdateLesson({ }: AddLessonProps) {

    const { id: courseId, lessonId } = useParams<{ id: string, lessonId: string }>();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const [formData, setFormData] = useState<Lesson>({
        title: "",
        videoURL: "",
        content: [],
        order: 0
    });

    async function FetchLesson() {
        setLoading(true)
        try {
            const response = await api.get(`/lesson/${lessonId}`);

            setFormData({ ...response.data.lesson })
        }
        catch (err) {
            setError(ErrorProcessor(err))
        }
        finally {
            setLoading(false)
        }
    }

    async function DeleteLesson() {
        try {
            const response = await api.delete(`/lesson/${lessonId}`)
            router.push(`/course-analytics/${courseId}`)
        }
        catch (err) {
            setError(ErrorProcessor(err))
        }
    }

    useEffect(() => {
        if (!lessonId) return;

        FetchLesson();

    }, [lessonId])

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

    function EditorChange(name: any, value: any) {

        console.log(value)

        setFormData({ ...formData, [name]: value });

    }



    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            console.log(formData);

            await api.patch(
                `/lesson/${lessonId}`,
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

    if (loading) return <Loader2 />

    return (
        <main className="px-4 max-w-4xl p-8">

            <h1 className="heading-1">
                Edit Lesson
            </h1>

            <form
                onSubmit={handleSubmit}
                className=""
            >

                <section className="rounded-3xl bg-white p-2 shadow">

                    <div className="space-y-6">

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


                        {/* Content */}
                        <div>

                            <label className="mb-2 block font-medium">
                                Content
                            </label>

                            <BlockNoteEditor
                                name="content"
                                value={formData.content}
                                onChange={EditorChange}
                            />

                        </div>


                        {/* Video URL */}
                        <div>

                            <label className="mb-2 block font-medium">
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


                    </div>

                </section>

                {error && (
                    <div className="rounded-xl bg-red-100 p-4 text-red-700">
                        {error}
                    </div>
                )}

                <br />

                <div className="flex gap-4">

                    <button
                        type="submit"
                        disabled={loading}
                        className="button-1 flex gap-2 items-center"
                    >
                        {loading ? (
                            <>
                                <Loader2

                                    className="animate-spin"
                                />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save />
                                Save
                            </>
                        )}
                    </button>

                    <button
                        onClick={DeleteLesson}
                        disabled={loading}
                        className="button-2"
                    >
                        Delete
                    </button>

                </div>

            </form>

        </main>
    );
}