"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    Home,
    BookOpen,
    FileQuestion,
    Menu,
    X,
} from "lucide-react";
import { Course } from "@/types/course";

interface CourseSidebarProps {
    courseId: string;
}



export default function CourseSidebar({
    course
}: { course: Course }) {
    const pathname = usePathname();

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [lessonOpen, setLessonOpen] = useState(true);

    const [quizOpen, setQuizOpen] = useState(true);

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed left-4 top-20 z-50 rounded-lg bg-blue-600 p-2 text-white lg:hidden"
            >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-16 z-40
                    h-[calc(100vh-4rem)]
                    w-72
                    overflow-y-auto
                    border-r
                    border-slate-200
                    bg-white
                    transition-transform
                    duration-300

                    lg:static
                    lg:translate-x-0

                    ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >
                <div className="p-5">



                    {/* Home */}
                    <Link
                        href={`/enrolled-courses/${course.id}`}
                        className={`mb-3 flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive(`/course-analytics/${course.id}`)
                            ? "bg-blue-600 text-white"
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
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-slate-800 hover:bg-slate-100"
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

                            {course.lessons?.map((lesson) => {

                                const href =
                                    `/enrolled-courses/${course.id}/lesson/${lesson.id}`;

                                return (
                                    <Link
                                        key={lesson.id}
                                        href={href}
                                        className={`block rounded-lg px-4 py-2 text-sm transition ${isActive(href)
                                            ? "bg-blue-100 font-semibold text-blue-700"
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
                        className="mt-5 flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-slate-800 hover:bg-slate-100"
                    >
                        <div className="flex items-center gap-3">
                            <FileQuestion size={20} />
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

                            {course.quizzes?.map((quiz) => {

                                const href =
                                    `/enrolled-courses/${course.id}/quiz/${quiz.id}`;

                                return (
                                    <Link
                                        key={quiz.id}
                                        href={href}
                                        className={`block rounded-lg px-4 py-2 text-sm transition ${isActive(href)
                                            ? "bg-blue-100 font-semibold text-blue-700"
                                            : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        {quiz.title}
                                    </Link>
                                );
                            })}

                        </div>
                    )}

                </div>
            </aside>
        </>
    );
}