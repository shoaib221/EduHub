"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";

type Course = {
    id: number;
    documentId?: string;
    title: string;
    description?: string;
};

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    async function loadCourses(pageNumber: number) {
        if (loading || !hasMore) return;

        try {
            setLoading(true);

            const res = await api.get("/courses", {
                params: {
                    "pagination[page]": pageNumber,
                    "pagination[pageSize]": 12,
                    "sort[0]": "createdAt:desc",
                },
            });

            const newCourses = res.data.data ?? [];
            const pagination = res.data.meta?.pagination;

            setCourses((prev) => {
                const existingIds = new Set(
                    prev.map((course) => course.id)
                );

                const uniqueCourses = newCourses.filter(
                    (course: Course) =>
                        !existingIds.has(course.id)
                );

                return [...prev, ...uniqueCourses];
            });

            if (pagination) {
                setHasMore(
                    pagination.page < pagination.pageCount
                );
            } else {
                setHasMore(newCourses.length === 20);
            }
        } catch (error) {
            console.error("Failed to load courses:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCourses(1);
    }, []);

    useEffect(() => {
        const loader = loaderRef.current;

        if (!loader) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];

                if (
                    first.isIntersecting &&
                    hasMore &&
                    !loading
                ) {
                    setPage((prev) => prev + 1);
                }
            },
            {
                root: null,
                rootMargin: "200px",
                threshold: 0,
            }
        );

        observer.observe(loader);

        return () => {
            observer.disconnect();
        };
    }, [hasMore, loading]);

    useEffect(() => {
        if (page === 1) return;

        loadCourses(page);
    }, [page]);

    return (
        <div className="mx-auto max-w-6xl p-6">
            <h1 className="mb-6 text-3xl font-bold">
                Courses
            </h1>

            <div className="space-y-4">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="rounded-xl border border-slate-200 bg-white p-5"
                    >
                        <h2 className="text-xl font-semibold">
                            {course.title}
                        </h2>

                        {course.description && (
                            <p className="mt-2 text-slate-600">
                                {course.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div
                ref={loaderRef}
                className="flex min-h-20 items-center justify-center"
            >
                {loading && (
                    <p className="text-slate-500">
                        Loading more courses...
                    </p>
                )}

                {!hasMore && courses.length > 0 && (
                    <p className="text-slate-500">
                        No more courses.
                    </p>
                )}
            </div>
        </div>
    );
}