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

    const analytics = {
        title: "Complete React Course",

        totalStudents: 245,

        completedStudents: 118,

        averageProgress: 67,

        averageQuizScore: 82,

        totalLessons: 10,

        totalQuizzes: 10,

        lessonProgress: [
            { lesson: "Lesson 1", completed: 245 },
            { lesson: "Lesson 2", completed: 231 },
            { lesson: "Lesson 3", completed: 220 },
            { lesson: "Lesson 4", completed: 205 },
            { lesson: "Lesson 5", completed: 184 },
            { lesson: "Lesson 6", completed: 165 },
            { lesson: "Lesson 7", completed: 140 },
            { lesson: "Lesson 8", completed: 120 },
            { lesson: "Lesson 9", completed: 100 },
            { lesson: "Lesson 10", completed: 82 },
        ],

        quizScores: [
            {
                quiz: "Quiz 1",
                average: 91,
            },
            {
                quiz: "Quiz 2",
                average: 88,
            },
            {
                quiz: "Quiz 3",
                average: 84,
            },
            {
                quiz: "Quiz 4",
                average: 79,
            },
            {
                quiz: "Quiz 5",
                average: 75,
            },
        ],
    };

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
                    value={analytics.totalStudents}
                />

                <StatCard
                    icon={<CheckCircle2 />}
                    title="Completed"
                    value={analytics.completedStudents}
                />

                <StatCard
                    icon={<TrendingUp />}
                    title="Average Progress"
                    value={`${analytics.averageProgress}%`}
                />

                <StatCard
                    icon={<Trophy />}
                    title="Average Quiz"
                    value={`${analytics.averageQuizScore}%`}
                />

            </section>

            {/* Lessons */}

            <section className="mt-10 rounded-3xl bg-white p-8 shadow">

                <div className="mb-8 flex items-center gap-3">

                    <BookOpen className="text-blue-600" />

                    <h2 className="text-2xl font-bold">
                        Lesson Completion
                    </h2>

                </div>

                <div className="space-y-5">

                    {analytics.lessonProgress.map((lesson) => {

                        const percentage =
                            (lesson.completed /
                                analytics.totalStudents) *
                            100;

                        return (
                            <div key={lesson.lesson}>

                                <div className="mb-2 flex justify-between">

                                    <span className="font-medium">
                                        {lesson.lesson}
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
                    })}

                </div>

            </section>

            {/* Quiz Scores */}

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
                                    Average Score
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {analytics.quizScores.map((quiz) => (

                                <tr
                                    key={quiz.quiz}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4">
                                        {quiz.quiz}
                                    </td>

                                    <td className="px-6 py-4 font-semibold">

                                        {quiz.average}%

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </section>

        </main>
    );
}

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