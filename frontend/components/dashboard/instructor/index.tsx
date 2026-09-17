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

                    <BookOpen className="text-blue-600" />

                    <h2 className="mt-4 text-3xl font-bold">
                        12
                    </h2>

                    <p className="text-slate-500">
                        Total Courses
                    </p>

                </div>



                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <Users className="text-green-600" />

                    <h2 className="mt-4 text-3xl font-bold">
                        8,540
                    </h2>

                    <p className="text-slate-500">
                        Total Students
                    </p>

                </div>



                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <TrendingUp className="text-purple-600" />

                    <h2 className="mt-4 text-3xl font-bold">
                        4.8
                    </h2>

                    <p className="text-slate-500">
                        Average Rating
                    </p>

                </div>



                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <DollarSign className="text-orange-600" />

                    <h2 className="mt-4 text-3xl font-bold">
                        $12.5K
                    </h2>

                    <p className="text-slate-500">
                        Total Earnings
                    </p>

                </div>


            </section>

            {/* My Courses */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">


                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-slate-900">
                        Instructed Courses
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
                                className="flex flex-col justify-between gap-5 rounded-xl border border-slate-200 p-5 md:flex-row md:items-center"
                            >

                                <div>

                                    <h3 className="font-semibold text-slate-900">
                                        {course.title}
                                    </h3>


                                    <div className="mt-2 flex gap-4 text-sm text-slate-500">

                                        <span>
                                            {/* {course.students} Students */}
                                        </span>

                                        <span>
                                            {/* ⭐ {course.rating || "N/A"} */}
                                        </span>

                                        <span>
                                            {/* {course.status} */}
                                        </span>

                                    </div>

                                </div>



                                <div className="flex gap-3">

                                    {/* <Link
                                        href={`/courses/${course.id}/edit`}
                                        className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-slate-50"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </Link> */}


                                    <Link
                                        href={`/course-analytics/${course.id}`}
                                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
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