"use client"

import Image from "next/image";
import Link from "next/link";
import {
    CheckCircle,
    Clock,
    FileText,
    GraduationCap,
    Loader2,
    PlayCircle,
    Star,
    Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/types/course";
import api from "@/lib/axios";
import ErrorProcessor from "@/lib/ErrorProcessor";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";




interface PageProps {
    params: Promise<{
        id: string;
    }>;
}


export default function CourseDetailsPage() {

    const { id } = useParams()
    const [course, setCourse] = useState<Course | null>(null)
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!id) return;

        async function FetchCourse() {
            try {
                const response = await api.get(`/course/${id}`)

                console.log(response)

                setCourse(response.data.course)
            }
            catch (err) {
                console.log(ErrorProcessor(err))
            }
        }

        FetchCourse();

    }, [id])

    const handleEnroll = async () => {

        try {
            const res = await api.post(
                "/payment/create-stripe-session",
                {
                    courseId: id,
                }
            );
            if (!res.data.payment_url)
                throw new Error("no payment url")

            window.location.href = res.data.payment_url;
        } catch (err) {
            ErrorProcessor(err);
        }

    };

    if (!course) return <Loader2 />


    return (
        <main className="min-h-screen bg-slate-50">

            {/* Hero */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">

                    <div className="text-white">

                        <span className="rounded-full bg-white/20 px-4 py-1 text-sm">
                            {course.category}
                        </span>


                        <h1 className="mt-6 text-4xl font-bold lg:text-5xl">
                            {course.title}
                        </h1>


                        <p className="mt-6 text-lg text-blue-100">
                            {course.description}
                        </p>


                        <div className="mt-8 flex flex-wrap gap-6 text-sm">

                            {/* <div className="flex items-center gap-2">
                                <Star
                                    size={18}
                                    fill="currentColor"
                                />
                                {course.rating} ({course.reviews})
                            </div> */}


                            {/* <div className="flex items-center gap-2">
                                <Users size={18} />
                                {course.students} students
                            </div>


                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                {course.duration}
                            </div> */}

                        </div>


                        <p className="mt-6">
                            Instructor:
                            <span className="ml-2 font-semibold">
                                {course.instructor?.username}
                            </span>
                        </p>

                    </div>


                    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

                        <div className="relative h-72">
                            <Image
                                src={course.coverImage!}
                                alt={course.title!}
                                fill
                                className="object-cover"
                            />
                        </div>


                        <div className="p-6">

                            <h2 className="text-3xl font-bold text-slate-900">
                                $ {course.price}
                            </h2>


                            {user ? <button
                                className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
                                onClick={handleEnroll}
                            >

                                Enroll Now
                            </button> :
                                <button className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
                                    onClick={() => router.push('/register')}
                                >
                                    Sign up to Enroll
                                </button>
                            }



                            <div className="mt-6 space-y-3 text-sm text-slate-600">

                                {/* <p className="flex items-center gap-2">
                                    <PlayCircle size={18} />
                                    {course.lessons} lessons
                                </p> */}

                                <p className="flex items-center gap-2">
                                    <FileText size={18} />
                                    Quizzes included
                                </p>

                                <p className="flex items-center gap-2">
                                    <GraduationCap size={18} />
                                    Certificate after completion
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* Content */}
            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-3">


                {/* Main */}
                <div className="space-y-10 lg:col-span-2">

                    {/* Curriculum */}
                    <div className="rounded-2xl bg-white p-8 shadow-sm">

                        <h2 className="text-3xl font-bold text-slate-900">
                            Course Curriculum
                        </h2>


                        <div className="mt-6 space-y-4">

                            {course.lessons?.map((lesson, index) => (

                                <div
                                    key={lesson.id}
                                    className="flex items-center justify-between rounded-xl border p-5"
                                >

                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            {index + 1}. {lesson.title}
                                        </p>


                                    </div>


                                    <PlayCircle
                                        className="text-blue-600"
                                    />

                                </div>

                            ))}

                        </div>

                    </div>


                </div>


                {/* Sidebar */}
                <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">

                    <h3 className="text-xl font-bold text-slate-900">
                        Course Details
                    </h3>


                    {/* <div className="mt-6 space-y-4 text-slate-600">

                        <p>
                            Level:
                            <span className="ml-2 font-medium text-slate-900">
                                {course.level}
                            </span>
                        </p>


                        <p>
                            Duration:
                            <span className="ml-2 font-medium text-slate-900">
                                {course.duration}
                            </span>
                        </p>


                        <p>
                            Lessons:
                            <span className="ml-2 font-medium text-slate-900">
                                {course.lessons}
                            </span>
                        </p>

                    </div> */}


                    <Link
                        href="/profile"
                        className="mt-8 block rounded-xl bg-slate-900 py-3 text-center font-semibold text-white"
                    >
                        Track Progress
                    </Link>

                </aside>

            </section>

        </main>
    );
}