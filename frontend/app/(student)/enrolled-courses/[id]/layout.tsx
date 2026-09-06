import { ReactNode } from "react";
import { notFound } from "next/navigation";

import CourseSidebar from "@/components/course/CourseSidebar";
import CourseHeader from "@/components/course/CourseHeader";
import { serverApi } from "@/lib/server-api";
import { fetchCourse } from "@/requestAPI/fetchCourse";
import { Course } from "@/types/course";
import ProtectedLayout from "@/components/server/ProtectedRoute";

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


    const { id: courseId } = await params;


    if (!courseId) {
        notFound();
    }


    const { course }: { course: Course } = await serverApi(`/course/${courseId}`);


    return (
        <ProtectedLayout>
            <div className="flex flex-col overflow-auto bg-slate-100">


                <div className="flex flex-1 overflow-hidden">


                    <CourseSidebar
                        course={course}
                    />


                    <main className="flex-1 overflow-y-auto bg-slate-50 p-6">

                        {children}

                    </main>


                </div>


            </div>
        </ProtectedLayout>
    );
}