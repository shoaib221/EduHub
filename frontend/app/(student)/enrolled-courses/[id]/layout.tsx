import { ReactNode } from "react";
import { notFound } from "next/navigation";

import CourseSidebar from "@/components/course/CourseSidebar";
import CourseHeader from "@/components/course/CourseHeader";

import { fetchCourse } from "@/requestAPI/fetchCourse";
import { Course } from "@/types/course";
import ProtectedLayout from "@/components/server/ProtectedRoute";
import { CourseEnrollment } from "@/types/courseEnrollment";
import ErrorProcessor from "@/lib/ErrorProcessor";

interface LayoutProps {
    children: ReactNode;

    params: Promise<{
        id: string;
    }>;
}


export default async function CourseLayout({
    children,
    params,
}: LayoutProps) {



    return (

        <div className="flex min-h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)]">
            <CourseSidebar />


            <main className="grow overflow-auto bg-slate-50 p-6 mt-6 h-full min-h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)]">
                {children}
            </main>
        </div>

    );
}