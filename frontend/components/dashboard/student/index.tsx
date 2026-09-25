"use client"

import Link from "next/link";
import {
    BookOpen,
    Clock,
    Award,
    PlayCircle,
    CheckCircle,
    TrendingUp,
    Loader,
} from "lucide-react";


import { Course } from "@/types/course";
import ErrorProcessor from "@/lib/ErrorProcessor";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CourseEnrollment } from "@/types/courseEnrollment";

export default function StudentDashboard() {
    const { user } = useAuth();
    const [courses, setCourses] = useState<CourseEnrollment[]>([]);

    async function fetchEnrolledCourses() {
        try {
            const response = await api.get("/enrolled-courses")
            setCourses(response.data.courses);
        } catch (err) {
            ErrorProcessor(err)
        }
    }

    useEffect(() => {
        if (user) fetchEnrolledCourses();

    }, [user])

    return (

        <div className="space-y-8 p-4">

            {/* Welcome */}
            <section className="rounded-3xl bg-(--color3) p-8 text-white">

                <h1 className="text-3xl font-bold">
                    Welcome back 👋
                </h1>

                <p className="mt-3 text-blue-100">
                    Continue your learning journey and achieve your goals.
                </p>

            </section>

            {/* Continue Learning */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-slate-900">
                        Enrolled Courses ({courses?.length})
                    </h2>

                    <Link
                        href="/courses"
                        className="button-2"
                    >
                        Browse Courses
                    </Link>
                </div>

                <div className="mt-6 space-y-5">

                    {
                        courses?.map((course) => (

                            <div
                                key={course.id}
                                className="card-4  p-5"
                            >

                                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {course.course?.title}
                                        </h3>

                                        {/* <p className="mt-1 text-sm text-slate-500">
                                            {course.completedLessons}/{course.lessons} lessons completed
                                        </p> */}
                                    </div>

                                    <Link
                                        href={`/enrolled-courses/${course.id}`}
                                        className="button-1 flex items-center gap-2"
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




        </div>
    );
}