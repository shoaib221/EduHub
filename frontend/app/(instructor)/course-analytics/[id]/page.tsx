"use client"

import Link from "next/link";
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    Clock3,
    Loader2,
    TrendingUp,
    Trophy,
    Users,
} from "lucide-react";

import { Lesson } from "@/types/lesson";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/types/course";
import api from "@/lib/axios";


interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
}

function StatCard({
    icon,
    title,
    value,
}: StatCardProps) {
    return (
        <div className="rounded-3xl bg-white p-6 shadow">

            <p className="text-slate-500">
                {title}
            </p>
            <br />

            <div className="flex gap-2 items-center" >
                <div className="text-(--color3)">
                    {icon}
                </div>

                <h2 className="font-bold text-xl">
                    {value}
                </h2>
            </div>



        </div>
    );
}

interface PageProps {
    params: Promise<{
        id: string;
    }>;
};





export default function CourseAnalyticsPage() {


    const params = useParams();
    const { id } = params;

    const [course, setCourse] = useState<Course | null>(null)
    const [analytics, setAnalytics] = useState<any>(null)

    useEffect(() => {
        if (!id) return;

        async function fetchData() {
            try {
                let res = await api.get(`/course-analytics/${id}`);
                setAnalytics(res.data);
                res = await api.get(`/course/${id}`);
                const { course } = res.data;
            } catch (err) {

            }
        }

        fetchData();

    }, [id])



    if (!analytics) return <Loader2 />



    return (
        <main className="mx-auto max-w-7xl py-8">

            {/* Header */}

            <div className="mb-10 flex items-center justify-between">

                <div>

                    <div className="heading-2">
                        Course Analytics
                    </div>

                    <div className="heading-1">
                        {course?.title}
                    </div>

                </div>

            </div>

            {/* Stats */}

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    icon={<Users />}
                    title="Students"
                    value={analytics.totalEnrollments}
                />

                <StatCard
                    icon={<CheckCircle2 />}
                    title="Completed"
                    value={analytics.totalCompletedCourse}
                />

            </section>



            <section className="mt-10 rounded-3xl bg-white py-8 shadow">

                <div className="mb-8 flex items-center gap-3">

                    <BookOpen className="text-(--color3)" />

                    <h2 className="font-bold text-xl">
                        Lesson Completion
                    </h2>

                </div>

                <div className="space-y-5">

                    {Object.entries(analytics.lessonsCompleted as Record<string, { title: string, completed: number }>).map(
                        ([lessonId, lesson]) => {

                            const percentage = (lesson.completed / analytics.totalEnrollments) * 100;

                            return (
                                <div key={lessonId}>

                                    <div className="mb-2 flex justify-between">

                                        <span className="font-medium">
                                            {lesson.title}
                                        </span>

                                        <span>
                                            {lesson.completed} students
                                        </span>

                                    </div>

                                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                                        <div
                                            className="h-full rounded-full bg-(--color3)"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />

                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>

            </section>



            <section className="mt-10 rounded-3xl bg-white py-8 shadow">

                <div className="mb-8 flex items-center gap-3">

                    <Clock3 className="text-(--color3)" />

                    <h2 className="text-xl font-bold">
                        Quiz Performance
                    </h2>

                </div>

                <div className="overflow-hidden rounded-2xl border">

                    <table className="w-full">

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="p-2 text-center">
                                    Quiz
                                </th>

                                <th className="p-2 text-center">
                                    Submitted
                                </th>

                                <th className="p-2 text-center">
                                    Average Percentage
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {Object.entries(analytics.quizzesSubmitted as Record<string, { title: string, completed: number, averageScore: number }>).map(
                                ([quizId, quiz]) => {

                                    return (

                                        <tr
                                            key={quiz.title}
                                            className="border-t"
                                        >

                                            <td className="p-2 text-center">
                                                {quiz.title}
                                            </td>

                                            <td className="p-2 text-center">
                                                {quiz.completed}
                                            </td>

                                            <td className="p-2 text-center">
                                                {quiz.averageScore ?? 0} %
                                            </td>

                                        </tr>)
                                }
                            )}

                        </tbody>

                    </table>

                </div>

            </section>

        </main>
    );
}
