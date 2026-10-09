"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    Home,
    BookOpen,
    FileQuestion,
    Menu,
    X,
    LoaderCircle,
} from "lucide-react";
import api from "@/lib/axios";
import { Lesson } from "@/types/lesson";
import { Quiz } from "@/types/quiz";
import { Course } from "@/types/course";
import { NotFound } from "../auth/NotFound";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ErrorProcessor from "@/lib/ErrorProcessor";

interface CourseSidebarProps {
    course: Course
}




export default function CourseSidebar() {
    const params = useParams()
    const { id: courseId } = params;
    const [course, setCourse] = useState<Course | null>(null)
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [lessonOpen, setLessonOpen] = useState(true);
    const [quizOpen, setQuizOpen] = useState(true);
    const isActive = (href: string) => pathname === href;
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [fetchingData, setFetchingData] = useState(true)


    useEffect(() => {
        if (!courseId) return;

        async function fetchCourse() {
            try {
                const res = await api.get(`/course/${courseId}`);
                setCourse(res.data.course)
                setLessons(res.data.course?.lessons)
                setQuizzes(res.data.course?.quizzes);
            } catch (err) {
                ErrorProcessor(err);
            }
            finally {
                setFetchingData(false)
            }
        }

        fetchCourse();

    }, [courseId])

    if (fetchingData) return <LoaderCircle />

    if (!course) return <NotFound />;

    console.log(course)

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex gap-2 fixed left-2 top-17 z-30 rounded-lg bg-(--color1) p-2 text-(--color3) lg:hidden"
            >
                Content {sidebarOpen ? <IoIosArrowBack size={20} /> : <IoIosArrowForward size={20} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-16 z-30 p-2
                    h-[calc(100vh-4rem)]
                    w-72
                    overflow-y-auto
                    border-r
                    border-slate-200
                    bg-white
                    transition-transform
                    duration-300
                    shadow-[12px_0_24px_rgba(0,0,0,0.2)]
                    lg:static
                    lg:translate-x-0

                    ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="flex gap-4 rounded-lg bg-(--color1) px-4 py-2 text-(--color3) lg:hidden"
                >
                    {sidebarOpen ? <IoIosArrowBack size={20} /> : <IoIosArrowForward size={20} />} Close
                </button>


                {/* Home */}
                <Link
                    href={`/course-analytics/${course.id}`}
                    className={`mb-3 flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive(`/course-analytics/${course.id}`)
                        ? "bg-(--color3) text-white"
                        : "text-slate-700 hover:bg-slate-100"
                        }`}
                >
                    <Home />
                    Home
                </Link>

                {/* Home */}
                <Link
                    href={`/course-analytics/${course.id}/add-lesson`}
                    className={`mb-3 flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive(`/course-analytics/${course.id}/add-lesson`)
                        ? "bg-(--color3) text-white"
                        : "text-slate-700 hover:bg-slate-100"
                        }`}
                >
                    <BookOpen />
                    Add Lesson
                </Link>

                <Link
                    href={`/course-analytics/${course.id}/add-quiz`}
                    className={`mb-3 flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive(`/course-analytics/${course.id}/add-quiz`)
                        ? "bg-(--color3) text-white"
                        : "text-slate-700 hover:bg-slate-100"
                        }`}
                >
                    <FileQuestion />
                    Add Quiz
                </Link>

                {/* Lessons */}
                <button
                    onClick={() =>
                        setLessonOpen(!lessonOpen)
                    }
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 button-2"
                >
                    <div className="flex items-center gap-3">
                        <BookOpen />
                        Lessons
                    </div>

                    {lessonOpen ? (
                        <ChevronDown />
                    ) : (
                        <ChevronRight />
                    )}
                </button>

                {lessonOpen && (
                    <div className="ml-6 mt-2 space-y-2">

                        {lessons && lessons.map((lesson) => {

                            const href =
                                `/course-analytics/${course.id}/lesson/${lesson.id}`;

                            return (
                                <Link
                                    key={lesson.id}
                                    href={href}
                                    className={`block rounded-lg px-4 py-2 text-sm transition ${isActive(href)
                                        ? "bg-(--color3) font-semibold text-white"
                                        : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                >
                                    {lesson.title}
                                </Link>
                            );
                        })}

                    </div>
                )}

                {/* Quizzes */}
                <button
                    onClick={() =>
                        setQuizOpen(!quizOpen)
                    }
                    className="mt-5 flex w-full items-center justify-between rounded-xl px-2 py-3 font-semibold button-2"
                >
                    <div className="flex items-center gap-3">
                        <FileQuestion />
                        Quizzes
                    </div>

                    {quizOpen ? (
                        <ChevronDown size={18} />
                    ) : (
                        <ChevronRight size={18} />
                    )}
                </button>

                {quizOpen && (
                    <div className="ml-6 mt-2 space-y-2">

                        {quizzes && quizzes.map((quiz) => {

                            const href =
                                `/course-analytics/${course.id}/quiz/${quiz.id}`;

                            return (
                                <Link
                                    key={quiz.id}
                                    href={href}
                                    className={`block rounded-lg px-4 py-2 text-sm transition ${isActive(href)
                                        ? "bg-(--color3) font-semibold text-white"
                                        : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                >
                                    {quiz.title}
                                </Link>
                            );
                        })}

                    </div>
                )}


            </aside>
        </>
    );
}