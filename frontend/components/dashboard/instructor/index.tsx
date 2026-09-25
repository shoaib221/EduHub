"use client"

import Link from "next/link";
import {
    BookOpen,
    Users,
    TrendingUp,
    DollarSign,
    Plus,
    Edit,
    BarChart3,
    MessageSquare,
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { useEffect, useState } from "react";
import { Course } from "@/types/course";
import api from "@/lib/axios";


export default function InstructorDashboard() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {

        async function fetchCourses() {

            try {
                const coursesRes = await api.get("/instructed-courses");

                setCourses(
                    coursesRes.data.courses
                );
            } catch (error) {
                console.log(error);
            }
        }

        fetchCourses();

    }, []);



    return (

        <div className="space-y-8 p-2 md:p-4 lg:p-6">


            {/* Header */}
            <section className="rounded-3xl bg-(--color3) p-8 text-white">

                <h1 className="text-3xl font-bold">
                    Instructor Dashboard
                </h1>

                <p className="mt-3 text-indigo-100">
                    Manage your courses, students, and teaching performance.
                </p>

            </section>



            {/* Statistics */}
            <section className="grid gap-6 md:grid-cols-4">

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <p className="text-slate-500">
                        Total Students
                    </p>

                    <br />

                    <div className="flex gap-2 items-center text-2xl" >
                        <Users className="text-(--color3)" />

                        <h2 className="font-bold">
                            8,540
                        </h2>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <p className="text-slate-500">
                        Total Income
                    </p>

                    <br />

                    <div className="flex gap-2 items-center text-2xl" >
                        <DollarSign className="text-(--color3)" />

                        <h2 className="font-bold">
                            8,540
                        </h2>

                    </div>

                </div>



            </section>

            {/* My Courses */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">


                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-slate-900">
                        Instructed Courses - {courses?.length}
                    </h2>

                    <Link
                        href="/create-course"
                        className="button-2 flex gap-2 items-center"
                    >
                        <Plus size={18} />
                        Create Course
                    </Link>

                </div>



                <div className="mt-6 space-y-4">


                    {
                        courses.map((course) => (

                            <div
                                key={course.id}
                                className="flex justify-between gap-2 rounded-xl card-4"
                            >



                                <h3 className="font-bold">
                                    {course.title}
                                </h3>


                                <div className="flex gap-3">




                                    <Link
                                        href={`/course-analytics/${course.id}`}
                                        className="button-1"
                                    >
                                        Details
                                    </Link>

                                </div>


                            </div>

                        ))
                    }

                </div>

            </section>

        </div>
    );
}