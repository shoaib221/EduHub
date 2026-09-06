import { serverApi } from "@/lib/server-api";
import { notFound } from "next/navigation";

export async function fetchCourse(courseId: any) {
    try {

        let courseData = await serverApi(
            `/courses/${courseId}`
        );

        return courseData;
    } catch (error) {

        console.error(error);

        notFound();
        return null;
    }

}