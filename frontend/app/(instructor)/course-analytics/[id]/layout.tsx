"use client"

import { ReactNode } from "react";

import CourseHeader from "@/components/instructed-course/CourseHeader";
import CourseSidebar from "@/components/instructed-course/CourseSidebar";
import { useParams } from "next/dist/client/components/navigation";

interface LayoutProps {
    children: ReactNode;
}

export default function CourseLayout({
    children,
}: LayoutProps) {
    const { id: courseId } = useParams<{ id: string }>();


    return (
        <div className="flex flex-col overflow-auto bg-slate-100">

            {/* Top Header */}
            <CourseHeader />

            {/* Main */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <CourseSidebar courseId={courseId} />

                {/* Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}