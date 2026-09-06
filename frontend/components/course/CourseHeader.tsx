// components/course/CourseHeader.tsx



import Image from "next/image";
import { BookOpen, PlayCircle, Trophy } from "lucide-react";
import { Course } from "@/types/course";



export default function CourseHeader({
    course
}: { course: Course }) {



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
                            Progress
                        </span>

                    </div>

                    {/* <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-200">

                        <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div> */}

                    {/* <p className="text-sm text-slate-600">
                        {completedLessons} of {totalLessons} lessons completed
                    </p>

                    <p className="mt-2 text-xl font-bold">
                        {progress}%
                    </p> */}

                </div>

                <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="mb-2 flex items-center gap-2">

                        <PlayCircle
                            size={20}
                            className="text-green-600"
                        />

                        <span className="font-semibold">
                            Continue Learning
                        </span>

                    </div>

                    {/* <p className="text-slate-700">
                        {currentLesson}
                    </p> */}

                    <button
                        className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        Resume Course
                    </button>

                </div>

                <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="mb-2 flex items-center gap-2">

                        <Trophy
                            size={20}
                            className="text-yellow-500"
                        />

                        <span className="font-semibold">
                            Completion
                        </span>

                    </div>

                    <p className="text-slate-700">
                        Finish every lesson and quiz to earn your certificate.
                    </p>

                </div>

            </div>

        </section>
    );
}