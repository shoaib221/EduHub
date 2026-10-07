"use client";

import api from "@/lib/axios";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await api.post(
                "/auth/forgot-password",
                { email, }
            );

            setMessage(
                "If an account exists with this email, a password reset link has been sent."
            );

            setEmail("");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-3xl font-bold">
                    Forgot Password
                </h1>

                <p className="mb-6 text-slate-600">
                    Enter your email address and we'll send you a password reset link.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@email.com"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                        />
                    </div>

                    {message && (
                        <div className="rounded-lg bg-green-100 p-3 text-green-700">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="rounded-lg bg-red-100 p-3 text-red-700">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

            </div>
        </main>
    );
}