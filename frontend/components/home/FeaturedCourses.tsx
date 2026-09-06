"use client"

import { Course } from "@/types/course";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/axios";


export default function FeaturedCourses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                const res = await api.get("/courses");

                setCourses(res.data.courses);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-blue-600">
                            Featured Courses
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-slate-900">
                            Learn from the Best
                        </h2>

                        <p className="mt-3 max-w-2xl text-slate-600">
                            Explore our most popular courses designed by
                            industry experts to help you achieve your learning
                            goals.
                        </p>
                    </div>

                    <Link
                        href="/courses"
                        className="hidden rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:border-blue-600 hover:text-blue-600 md:block"
                    >
                        View All
                    </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {courses && courses.map((course) => (
                        <div
                            key={course.id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-56">
                                {course.coverImage && <Image
                                    src={course.coverImage}
                                    alt={course.title!}
                                    fill
                                    className="object-cover"
                                />}
                            </div>

                            <div className="p-6">
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                    Bestseller
                                </span>

                                <h3 className="mt-4 line-clamp-2 text-xl font-bold text-slate-900">
                                    {course.title}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Instructor:{" "}
                                    <span className="font-medium text-slate-700">
                                        {course.instructor?.username}
                                    </span>
                                </p>

                                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="font-bold text-slate-900">
                                            {course.enrolled_users?.length}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Students
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-bold text-slate-900">
                                            {course.lessons?.length}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Lessons
                                        </p>
                                    </div>


                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {course.price}
                                    </span>

                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                                    >
                                        View Course
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Link
                        href="/courses"
                        className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                    >
                        View All Courses
                    </Link>
                </div>
            </div>
        </section>
    );
}