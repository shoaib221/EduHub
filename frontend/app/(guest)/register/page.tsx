"use client";

import Link from "next/link";
import { useState } from "react";

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    GraduationCap,
} from "lucide-react";
import api from "@/lib/axios";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GuestRoute from "@/components/auth/GuestRoute";



export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);

        setErrorMessage("")

        try {
            const response = await api.post(
                "/auth/register",
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    user_role: formData.role,
                }
            );

            console.log("Registration successful:", response.data);

            const { user } = response.data;

            login(user);

            console.log(
                "Registration successful:",
                response.data
            );

            // Clear form
            setFormData({
                username: "",
                email: "",
                password: "",
                role: "student",
            });

            // Redirect
            router.push("/");

        }
        catch (error: unknown) {
            const err = error as {
                response?: {
                    data?: {
                        error?: {
                            message?: string;
                        };
                        message?: string;
                    };
                };
                message?: string;
            };

            alert("Request failed")

            const message =
                err.response?.data?.error?.message ??
                err.response?.data?.message ??
                err.message ??
                "Registration failed";

            console.error("Registration failed:", message);

            setErrorMessage(message);
        }
    };

    return (
        <GuestRoute>
            <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-4 py-10">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-(--color3)">
                            <GraduationCap />
                        </div>

                        <h1 className="heading-1">
                            Create Account
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Join our learning community
                        </p>
                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Username */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Username
                            </label>

                            <div className="flex items-center rounded-lg border border-slate-300 px-3">
                                <User
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    className="w-full px-3 py-3 text-black placeholder:text-slate-400 outline-none"
                                    required
                                />


                            </div>
                        </div>


                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Email
                            </label>

                            <div className="flex items-center rounded-lg border border-slate-300 px-3">
                                <Mail
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    className="w-full px-3 py-3 text-black placeholder:text-slate-400 outline-none"
                                    required
                                />
                            </div>
                        </div>


                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Password
                            </label>

                            <div className="flex items-center rounded-lg border border-slate-300 px-3">
                                <Lock
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create password"
                                    className="w-full px-3 py-3 text-black placeholder:text-slate-400 outline-none"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="text-slate-500"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="text-red-700 text-center" >
                            {errorMessage}
                        </div>


                        {/* Role */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Register As
                            </label>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none"
                            >
                                <option value="student">
                                    Student
                                </option>

                                <option value="instructor">
                                    Instructor
                                </option>
                            </select>
                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full button-1"
                        >
                            Create Account
                        </button>

                    </form>


                    {/* Login */}
                    <p className="mt-6 text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-(--color3) hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </main>
        </GuestRoute>
    );
}