

import { ReactNode } from "react";

import CourseHeader from "@/components/instructed-course/CourseHeader";
import CourseSidebar from "@/components/instructed-course/CourseSidebar";
import { useParams } from "next/dist/client/components/navigation";
import { serverApi } from "@/lib/server-api";
import { NotFound } from "@/components/auth/NotFound";

interface LayoutProps {
    children: ReactNode;
    params: Promise<{
        id: string;
    }>;
}

export default async function CourseLayout({
    children, params
}: LayoutProps) {

    const { id: courseId } = await params

    const { course } = await serverApi(`/course/${courseId}`)

    if (!course) return <NotFound />

    return (

        <div className="flex flex-1 overflow-hidden">

            {/* Sidebar */}
            <CourseSidebar course={course} />

            {/* Content */}
            <main className="flex-1 overflow-y-auto bg-slate-50 py-6 px-2 md:px-6 min-h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-auto">
                {children}
            </main>

        </div>

    );
}