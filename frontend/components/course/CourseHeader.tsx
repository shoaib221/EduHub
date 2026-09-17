// components/course/CourseHeader.tsx



import Image from "next/image";
import { BookOpen, PlayCircle, Trophy } from "lucide-react";
import { Course } from "@/types/course";



export default function CourseHeader({
    course, progress, quizAverage
}: { course: Course, progress: number, quizAverage: number }) {

    console.log(quizAverage, "Course Header")

    return (
        <section className="overflow-hidden rounded-3xl bg-white shadow">

            <div className="relative h-72 w-full">

                <Image
                    src={course.coverImage!}
                    alt={course.title!}
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 text-white">

                    <h1 className="text-4xl font-bold">
                        {course.title}
                    </h1>

                    <p className="mt-2 max-w-3xl text-white/90">
                        {course.description}
                    </p>

                    <p className="mt-3 text-sm text-white/80">
                        Instructor • {course.instructor?.username}
                    </p>

                </div>

            </div>

            <div className="grid gap-6 p-8 md:grid-cols-3">

                <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="mb-2 flex items-center gap-2">

                        <BookOpen
                            size={20}
                            className="text-blue-600"
                        />

                        <span className="font-semibold">
                            Lessons completed {progress}%

                        </span>

                    </div>

                    <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-200">

                        <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>



                </div>

                <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="mb-2 flex items-center gap-2">

                        <BookOpen
                            size={20}
                            className="text-blue-600"
                        />

                        <span className="font-semibold">
                            Quiz Average {quizAverage}%

                        </span>

                    </div>

                    <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-200">

                        <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{
                                width: `${quizAverage}%`,
                            }}
                        />

                    </div>



                </div>


            </div>

        </section>
    );
}