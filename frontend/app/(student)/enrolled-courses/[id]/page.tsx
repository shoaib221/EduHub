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

    let { course, enrollment, totalLessons,
        completedLessons,
        progress,
        lessons, totalQuizzes, quizAverage = 0,
        quizzes } = payload



    console.log(payload, quizAverage ?? 0)



    return (
        <div>
            <CourseHeader
                course={payload?.course} progress={payload?.progress} quizAverage={quizAverage}
            />

            <div className="mt-4">

                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold mb-4">
                        Lessons
                    </h2>

                    <span>
                        completed {payload?.completedLessons}/{payload?.totalLessons}
                    </span>
                </div>

            </div>



            {/* Lessons */}

            <section>

                <div className="space-y-3">
                    {
                        payload?.lessons?.map(
                            (lesson: any) => (

                                <div
                                    key={lesson.id}
                                    className="flex justify-between card-4"
                                >

                                    {lesson.title}

                                    {
                                        lesson?.completed
                                            ?
                                            <span className="text-green-600">
                                                Completed
                                            </span>
                                            :
                                            <span className="text-gray-400">
                                                Not completed
                                            </span>
                                    }

                                </div>

                            )
                        )
                    }

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
                            attended {payload?.completedLessons}/{payload?.totalLessons}
                        </span>
                    </div>

                </div>


                <div className="space-y-3">

                    {
                        quizzes && quizzes.map(
                            (quiz: any) => (

                                <div
                                    key={quiz.title}
                                    className={`p-4 flex justify-between card-4`}
                                >

                                    <span>
                                        {quiz.title}
                                    </span>


                                    {quiz.score >= 0 ? <span className={`font-bold ${quiz.score >= 50 ? "text-green-700" : "text-red-700"}`} >{quiz.score} %</span> : <span className="text-gray-400" >Not Attended</span>}


                                </div>

                            )
                        )
                    }


                </div>


            </section>

        </div>

    );


}






