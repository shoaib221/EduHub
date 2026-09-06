"use client"

import Link from "next/link";
import {
    BookOpen,
    Clock,
    Award,
    PlayCircle,
    CheckCircle,
    TrendingUp,
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useEffect, useState } from "react";
import { Course } from "@/types/course";
import api from "@/lib/axios";
import ErrorProcessor from "@/lib/ErrorProcessor";


export default function StudentDashboard() {
    const [courses, setCourses] = useState<Course[]>([]);



    async function FetchEnrolledCourses() {
        try {
            const response = await api.get("/enrolled-courses");
            setCourses(response.data.courses);
        }
        catch (err) {
            ErrorProcessor(err);
        }
    }

    useEffect(() => {
        FetchEnrolledCourses();
    }, [])




    return (

        <div className="space-y-8 p-4">

            {/* Welcome */}
            <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">

                <h1 className="text-3xl font-bold">
                    Welcome back 👋
                </h1>

                <p className="mt-3 text-blue-100">
                    Continue your learning journey and achieve your goals.
                </p>

            </section>



            {/* Stats */}
            <section className="grid gap-6 md:grid-cols-4">


                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <BookOpen className="text-blue-600" />

                    <h2 className="mt-4 text-3xl font-bold text-slate-900">
                        {courses?.length}
                    </h2>

                    <p className="text-slate-500">
                        Enrolled Courses
                    </p>

                </div>



                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <TrendingUp className="text-green-600" />

                    <h2 className="mt-4 text-3xl font-bold text-slate-900">
                        65%
                    </h2>

                    <p className="text-slate-500">
                        Average Progress
                    </p>

                </div>



                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <Award className="text-purple-600" />

                    <h2 className="mt-4 text-3xl font-bold text-slate-900">
                        3
                    </h2>

                    <p className="text-slate-500">
                        Certificates
                    </p>

                </div>



                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <Clock className="text-orange-600" />

                    <h2 className="mt-4 text-3xl font-bold text-slate-900">
                        24h
                    </h2>

                    <p className="text-slate-500">
                        Learning Time
                    </p>

                </div>


            </section>



            {/* Continue Learning */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-slate-900">
                        Enrolled Courses
                    </h2>

                    <Link
                        href="/courses"
                        className="text-sm font-semibold text-blue-600"
                    >
                        Browse Courses
                    </Link>
                </div>

                <div className="mt-6 space-y-5">

                    {
                        courses.map((course) => (

                            <div
                                key={course.id}
                                className="rounded-2xl border border-slate-200 p-5"
                            >

                                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {course.title}
                                        </h3>

                                        {/* <p className="mt-1 text-sm text-slate-500">
                                            {course.completedLessons}/{course.lessons} lessons completed
                                        </p> */}
                                    </div>

                                    <Link
                                        href={`/enrolled-courses/${course.id}`}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                                    >
                                        <PlayCircle size={18} />
                                        Continue
                                    </Link>

                                </div>

                                {/* Progress */}
                                {/* <div className="mt-5">

                                    <div className="mb-2 flex justify-between text-sm">

                                        <span className="text-slate-500">
                                            Progress
                                        </span>

                                        <span className="font-semibold text-blue-600">
                                            {course.progress}%
                                        </span>

                                    </div>


                                    <div className="h-2 rounded-full bg-slate-200">

                                        <div
                                            className="h-2 rounded-full bg-blue-600"
                                            style={{
                                                width: `${course.progress}%`,
                                            }}
                                        />

                                    </div>

                                </div> */}

                            </div>

                        ))
                    }

                </div>

            </section>




            {/* Recent Activity */}
            {/* <section className="rounded-3xl bg-white p-8 shadow-sm">

                <h2 className="text-2xl font-bold text-slate-900">
                    Recent Activity
                </h2>


                <div className="mt-6 space-y-4">


                    <div className="flex items-center gap-4">

                        <CheckCircle className="text-green-600" />

                        <div>
                            <p className="font-medium text-slate-900">
                                Completed React Hooks lesson
                            </p>

                            <p className="text-sm text-slate-500">
                                2 hours ago
                            </p>
                        </div>

                    </div>



                    <div className="flex items-center gap-4">

                        <CheckCircle className="text-green-600" />

                        <div>
                            <p className="font-medium text-slate-900">
                                Passed JavaScript Quiz
                            </p>

                            <p className="text-sm text-slate-500">
                                Yesterday
                            </p>
                        </div>

                    </div>


                </div>

            </section> */}

        </div>
    );
}