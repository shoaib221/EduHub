import CourseHeader from "@/components/course/CourseHeader";

import { serverApi } from "@/lib/server-api";
import { Course } from "@/types/course";
import { notFound } from "next/navigation";


interface PageProps {
    params: Promise<{
        id: string;
    }>;
}


export default async function DashboardPage({
    params,
}: PageProps) {

    const { id: courseId } = await params;

    if (!courseId) {
        notFound();
    }

    console.log(courseId)
    const { course }: { course: Course } = await serverApi(`/course/${courseId}`);

    if (!course) {
        notFound();
    }

    return (
        <CourseHeader
            course={course}
        />
    );
}