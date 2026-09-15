import Link from "next/link";
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    Clock3,
    TrendingUp,
    Trophy,
    Users,
} from "lucide-react";
import { serverApi } from "@/lib/server-api";
import { Lesson } from "@/types/lesson";


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

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                {icon}

            </div>

            <p className="text-slate-500">
                {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
                {value}
            </h2>

        </div>
    );
}

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CourseAnalyticsPage({
    params,
}: PageProps) {
    const { id } = await params;

    // TODO:
    // Fetch analytics from Strapi

    const analytics = await serverApi(`/course-analytics/${id}`);

    const { lessonsCompleted, quizzesSubmitted, totalEnrollments, totalCompletedCourse, totalLessons, totalQuizzes } = analytics;

    console.log("course analytics", analytics);

    // return <div>Hello World</div>

    return (
        <main className="mx-auto max-w-7xl p-8">

            {/* Header */}

            <div className="mb-10 flex items-center justify-between">

                <div>

                    <Link
                        href="/dashboard"
                        className="mb-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
                    >
                        <ArrowLeft size={18} />

                        Dashboard

                    </Link>

                    <h1 className="text-xl font-bold">
                        Course Analytics
                    </h1>



                </div>

            </div>

            {/* Stats */}

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    icon={<Users />}
                    title="Students"
                    value={totalEnrollments}
                />

                <StatCard
                    icon={<CheckCircle2 />}
                    title="Completed"
                    value={totalCompletedCourse}
                />

            </section>



            <section className="mt-10 rounded-3xl bg-white p-8 shadow">

                <div className="mb-8 flex items-center gap-3">

                    <BookOpen className="text-blue-600" />

                    <h2 className="text-2xl font-bold">
                        Lesson Completion
                    </h2>

                </div>

                <div className="space-y-5">

                    {Object.entries(lessonsCompleted as Record<string, { title: string, completed: number }>).map(
                        ([lessonId, lesson]) => {

                            const percentage = (lesson.completed / totalEnrollments) * 100;


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
                                            className="h-full rounded-full bg-blue-600"
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



            <section className="mt-10 rounded-3xl bg-white p-8 shadow">

                <div className="mb-8 flex items-center gap-3">

                    <Clock3 className="text-blue-600" />

                    <h2 className="text-2xl font-bold">
                        Quiz Performance
                    </h2>

                </div>

                <div className="overflow-hidden rounded-2xl border">

                    <table className="w-full">

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Quiz
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Submitted
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Average Percentage
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {Object.entries(quizzesSubmitted as Record<string, { title: string, completed: number, averageScore: number }>).map(
                                ([quizId, quiz]) => {

                                    return (

                                        <tr
                                            key={quiz.title}
                                            className="border-t"
                                        >

                                            <td className="px-6 py-4">
                                                {quiz.title}
                                            </td>

                                            <td className="px-6 py-4 font-semibold">
                                                {quiz.completed}
                                            </td>

                                            <td className="px-6 py-4 font-semibold">
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
