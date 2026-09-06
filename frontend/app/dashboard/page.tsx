"use client";

import { useAuth } from "@/hooks/useAuth";
import StudentDashboard from "@/components/dashboard/student/index";
import InstructorDashboard from "@/components/dashboard/instructor/index";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <ProtectedRoute>
            {user?.user_role === "student" ?
                <StudentDashboard /> :
                <InstructorDashboard />
            }
        </ProtectedRoute>
    )
}