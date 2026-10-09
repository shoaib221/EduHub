"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    Home,
    BookOpen,
    FileQuestion,
    Menu,
    X,
    Loader2,
} from "lucide-react";
import { Course } from "@/types/course";
import { CourseEnrollment } from "@/types/courseEnrollment";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import ErrorProcessor from "@/lib/ErrorProcessor";

export default function CourseSidebar() {
    const params = useParams()
    const { id: courseId } = params;
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [lessonOpen, setLessonOpen] = useState(true);
    const [quizOpen, setQuizOpen] = useState(true);
    const isActive = (href: string) => pathname === href;
    const [enrollment, setEnrollment] = useState<CourseEnrollment | null>(null);
    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {

        if (!courseId) return;

        async function fetchEnrollment() {
            try {
                const res = await api.get(`/enrolled-course/${courseId}`);
                setEnrollment(res.data?.enrollment);
                setCourse(res.data?.course);
            }
            catch (err) {
                console.log(ErrorProcessor(err))
            }
        }

        fetchEnrollment();

    }, [courseId])

    if (!enrollment) return null;


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
                    href={`/enrolled-courses/${enrollment.id}`}
                    className={`mb-3 flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive(`/enrolled-courses/${enrollment.id}`)
                        ? "bg-(--color3) text-white"
                        : "text-slate-700 hover:bg-slate-100"
                        }`}
                >
                    <Home size={20} />
                    Home
                </Link>

                {/* Lessons */}
                <button
                    onClick={() =>
                        setLessonOpen(!lessonOpen)
                    }
                    className="flex w-full items-center justify-between button-2"
                >
                    <div className="flex items-center gap-3">
                        <BookOpen size={20} />
                        Lessons
                    </div>

                    {lessonOpen ? (
                        <ChevronDown size={18} />
                    ) : (
                        <ChevronRight size={18} />
                    )}
                </button>

                {lessonOpen && (
                    <div className="ml-6 mt-2 space-y-2">

                        {course?.lessons?.map((lesson) => {

                            const href = `/enrolled-courses/${enrollment.id}/lesson/${lesson.id}`;

                            return (
                                <Link
                                    key={lesson.id}
                                    href={href}
                                    className={`block rounded-lg px-4 py-2 text-sm transition ${isActive(href)
                                        ? "font-semibold button-1"
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
                    className="mt-5 flex w-full items-center justify-between button-2"
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

                        {course?.quizzes?.map((quiz) => {

                            const href =
                                `/enrolled-courses/${enrollment.id}/quiz/${quiz.id}`;

                            return (
                                <Link
                                    key={quiz.id}
                                    href={href}
                                    className={`block rounded-lg px-4 py-2 text-sm transition ${isActive(href)
                                        ? "font-semibold button-1"
                                        : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                >
                                    {quiz.title}
                                </Link>
                            );
                        })}

                    </div>
                )}


            </aside >
        </>
    );
}