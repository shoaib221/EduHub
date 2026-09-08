

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
        <div className="flex flex-col overflow-auto bg-slate-100">

            {/* Main */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <CourseSidebar course={course} />

                {/* Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}