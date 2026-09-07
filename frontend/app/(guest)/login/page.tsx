"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GuestRoute from "@/components/auth/GuestRoute";


export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData);

        setErrorMessage("");

        try {
            const response = await api.post(
                "/auth/login",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            console.log("login successful:", response.data);

            const { user } = response.data;

            login(user)

            console.log(
                "Registration successful:",
                response.data
            );


            // Clear form
            setFormData({
                email: "",
                password: "",
            });


            // Redirect
            router.push("/");

        }
        catch (error: any) {
            console.dir(error);

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

            alert("Login failed")

            const message =
                err.response?.data?.error?.message ??
                err.response?.data?.message ??
                err.message ??
                "Login failed";

            console.error("Login failed:", message);

            setErrorMessage(message);
        }
    };

    return (

        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Login to continue your learning journey
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
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
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
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


                    {/* Forgot password */}
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>


                {/* Register */}
                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </main>

    );
}