"use client"

import FeaturedCourses from "@/components/home/FeaturedCourses";
import { Search } from "lucide-react";

export default function CoursesPage() {



    return (
        <main className="min-h-screen bg-slate-50">
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
            <FeaturedCourses />

            {/* Pagination */}
            <section className="pb-20">
                <div className="mx-auto flex max-w-7xl justify-center gap-2 px-6">
                    <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 hover:bg-slate-100">
                        Previous
                    </button>

                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                        1
                    </button>



                    <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 hover:bg-slate-100">
                        Next
                    </button>
                </div>
            </section>
        </main>
    );
}