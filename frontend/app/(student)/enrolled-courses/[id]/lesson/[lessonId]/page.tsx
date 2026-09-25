"use client"

import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    CheckCircle,
    Clock,
    Download,
    FileText,
    Loader,
    PlayCircle,
} from "lucide-react";

import { Lesson } from "@/types/lesson";
import BlocknoteViewer from "@/components/blocknote/BlocknoteViewer";
import ErrorProcessor from "@/lib/ErrorProcessor";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface PageProps {
    params: Promise<{
        id: string;
        lessonId: string;
    }>;

    searchParams: Promise<{
        tab?: string;
    }>;
}

export default function LessonPage({
    params, searchParams
}: PageProps) {

    const { id: enrollmentId, lessonId } = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null)



    async function fetchLesson() {
        try {
            const response = await api.get(`/enrollment/${enrollmentId}/lesson/${lessonId}`);
            setLesson(response.data.lesson)
        } catch (err) {
            ErrorProcessor(err);
        }
    }

    useEffect(() => {
        if (!lessonId) return;
        fetchLesson();
    }, [lessonId])

    async function MarkComplete() {
        try {
            await api.post(`/complete-lesson/${lessonId}`, { enrollmentId })
            alert("lesson completed");
        } catch (err) {
            ErrorProcessor(err)
        }

    }

    if (!lesson) return <Loader />

    return (
        <div className="mx-auto max-w-5xl space-y-8">

            {/* Header */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex flex-wrap items-center gap-4">

                    <div className="bg-yellow-100 p-2 text-(--color3)">
                        <BookOpen size={28} />
                    </div>

                    <h1 className="heading-1">
                        {lesson.title}
                    </h1>
                </div>

            </section>




            {/* Video */}
            <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="aspect-video bg-black">
                    <video
                        className="h-full w-full object-contain"
                        controls
                        preload="metadata"
                        poster="/video-thumbnail.jpg"
                    >
                        <source
                            src={"https://res.cloudinary.com/deqscvjss/video/upload/v1788757086/demo1_woru6q.mp4"}
                            type="video/mp4"
                        />

                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            {/* Lesson Description */}
            {/* <section className="rounded-3xl bg-white p-8 shadow-sm">

                <h2 className="text-2xl font-semibold text-slate-900">
                    About this lesson
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                    {lesson.description}
                </p>

            </section> */}

            {/* Lesson Notes */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex items-center gap-3">

                    <FileText className="text-(--color3) rounded-lg" />

                    <h2 className="heading-2">
                        Notes
                    </h2>

                </div>

                <pre className="mt-6 whitespace-pre-wrap font-sans leading-8 text-slate-600">
                    <BlocknoteViewer content={lesson.content} />
                </pre>

            </section>

            {/* Attachments */}
            {/* <section className="rounded-3xl bg-white p-8 shadow-sm">

                <h2 className="text-2xl font-semibold">
                    Attachments
                </h2>

                <div className="mt-6 space-y-4">

                    {lesson.attachments.map((file) => (

                        <div
                            key={file.id}
                            className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                        >

                            <div className="flex items-center gap-3">

                                <FileText className="text-blue-600" />

                                <span className="font-medium">
                                    {file.name}
                                </span>

                            </div>

                            <button className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 hover:bg-slate-200">

                                <Download size={18} />

                                Download

                            </button>

                        </div>

                    ))}

                </div>

            </section> */}



            {/* Footer */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex flex-wrap items-center justify-between gap-4">

                    {/* <Link
                        href={`/enrolled-courses/${id}/lesson/${Math.max(
                            1,
                            Number(lessonId) - 1
                        )}`}
                        className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
                    >
                        <ArrowLeft size={18} />
                        Previous Lesson
                    </Link> */}

                    {(lesson as any)?.completed ? <button
                        onClick={MarkComplete}
                        className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white">

                        <CheckCircle size={18} />

                        Completed

                    </button> : <button
                        onClick={MarkComplete}
                        className="flex items-center gap-2 button-1">

                        <CheckCircle size={18} />

                        Mark as Completed

                    </button>}


                    {/* <Link
                        href={`/enrolled-courses/${id}/lesson/${Number(
                            lessonId
                        ) + 1}`}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                    >
                        Next Lesson
                        <ArrowRight size={18} />
                    </Link> */}

                </div>

            </section>

        </div>
    );
}