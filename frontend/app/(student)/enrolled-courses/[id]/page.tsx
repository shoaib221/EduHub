import CourseHeader from "@/components/course/CourseHeader";
import { serverApi } from "@/lib/server-api";
import { Course } from "@/types/course";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CourseEnrollment } from "@/types/courseEnrollment";
import ErrorProcessor from "@/lib/ErrorProcessor";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function DashboardPage({
    params,
}: PageProps) {

    const { id: enrollmentId } = await params;

    if (!enrollmentId) {
        notFound();
    }

    let payload;

    try {
        payload = await serverApi(`/enrolled-course/${enrollmentId}`);
    } catch (err) {
        notFound();
    }

    const { course, enrollment, totalLessons,
        completedLessons,
        progress,
        lessons, totalQuizzes, attendedQuizzes, quizAverage = 0,
        quizzes } = payload



    console.log(payload, quizAverage ?? 0)



    return (
        <div>
            <CourseHeader
                course={payload?.course} progress={payload?.progress} quizAverage={quizAverage}
            />

            {/* Lessons */}

            <section>
                <div className="mt-4">

                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold mb-4">
                            Lessons
                        </h2>

                        <span>
                            completed {payload?.completedLessons} of {payload?.totalLessons}
                        </span>
                    </div>

                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-(--color2) border-collapse">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="border border-(--color2) px-4 py-2 text-left">
                                    Title
                                </th>

                                <th className="border border-(--color2) px-4 py-2 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {payload?.lessons?.map(
                                (lesson: any) => (
                                    <tr key={lesson.id}>
                                        <td className="border border-(--color2) px-4 py-2">
                                            {lesson.title}
                                        </td>

                                        <td className="border border-(--color2) px-4 py-2">
                                            {
                                                lesson?.completed
                                                    ?
                                                    <span className="text-green-600 font-bold">
                                                        Completed
                                                    </span>
                                                    :
                                                    <span className="">
                                                        Not completed
                                                    </span>
                                            }
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

            </section>

            {/* Quiz Results */}

            <section className="mt-10">

                <div className="mt-4">

                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold mb-4">
                            Quizzes
                        </h2>

                        <span>
                            attended {attendedQuizzes} of {totalQuizzes}
                        </span>
                    </div>

                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-(--color2) border-collapse">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="border border-(--color2) px-4 py-2 text-left">
                                    Title
                                </th>

                                <th className="border border-(--color2) px-4 py-2 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {quizzes && quizzes.map(
                                (quiz: any) => (
                                    <tr key={quiz.id}>
                                        <td className="border border-(--color2) px-4 py-2">
                                            {quiz.title}
                                        </td>

                                        <td className="border border-(--color2) px-4 py-2">
                                            {quiz.score >= 0 ? <span className={`font-bold ${quiz.score >= 50 ? "text-green-700" : "text-red-700"}`} > {quiz.score >= 50 ? "Passed" : "Failed"} ( {quiz.score} % )</span> : <span className="text-gray-400" >Not Attended</span>}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>


            </section>

        </div>

    );


}






