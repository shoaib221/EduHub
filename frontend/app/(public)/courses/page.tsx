"use client"

import FeaturedCourses from "@/components/home/FeaturedCourses";
import api from "@/lib/axios";
import { Course } from "@/types/course";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true);
    const router = useRouter()

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
        <main className="min-h-screen bg-slate-50 p-4">
            {/* Hero */}
            <section className="bg-(--color3) py-20">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <h1 className="text-5xl font-bold text-white">
                        Explore Courses
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
                        Discover high-quality courses taught by experienced
                        instructors and start learning today.
                    </p>

                    <div className="mx-auto mt-10 flex max-w-2xl items-center rounded-xl bg-white px-4 py-3 shadow-lg">
                        <Search
                            className="mr-3 text-slate-400"
                            size={22}
                        />

                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                        />
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="border-b bg-white">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-6">
                    <select className="rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500">
                        <option>All Categories</option>
                        <option>Programming</option>
                        <option>Design</option>
                        <option>Business</option>
                        <option>AI</option>
                    </select>

                    <select className="rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500">
                        <option>Sort By</option>
                        <option>Newest</option>
                        <option>Popular</option>
                        <option>Highest Rated</option>
                    </select>
                </div>
            </section>

            {/* Courses */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 p-8">
                {courses && courses.map((course) => (
                    <div
                        key={course.id}
                        className="group card-3 py-8"

                        onClick={() => router.push(`/courses/${course.id}`)}




                    >
                        <div className="relative h-56">
                            {
                                course.coverImage && <Image
                                    src={course.coverImage}
                                    alt={course.title!}
                                    fill
                                    className="object-cover"
                                />
                            }
                        </div>


                        <h3 className="mt-1 line-clamp-2 text-xl font-bold text-slate-900 group-hover:text-(--color3)">
                            {course.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Instructor:{" "}
                            <span className="font-medium text-slate-700">
                                {course.instructor?.username}
                            </span>
                        </p>

                        <div className="py-2 flex items-center justify-between">
                            <span className="text-2xl font-bold text-(--color3)">
                                $ {course.price}
                            </span>


                        </div>
                    </div>

                ))}
            </div>

        </main >
    );
}