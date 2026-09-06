"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import ErrorProcessor from "@/lib/ErrorProcessor";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const stripeSessionId = searchParams.get("stripe_session_id");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function verifyPayment() {
            if (!stripeSessionId) {
                setError("Missing payment session.");
                setLoading(false);
                return;
            }

            try {
                await api.post("/payment/verify", {
                    stripeSessionId,
                });
            } catch (err: any) {
                setError(ErrorProcessor(err));
            }
            finally {
                setLoading(false);
            }
        }

        verifyPayment();
    }, [stripeSessionId]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-blue-600" />

                    <h2 className="text-2xl font-semibold">
                        Verifying your payment...
                    </h2>

                    <p className="mt-2 text-slate-600">
                        Please wait.
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow">
                    <h1 className="mb-4 text-3xl font-bold text-red-600">
                        Payment Verification Failed
                    </h1>

                    <p className="mb-8 text-slate-600">
                        {error}
                    </p>

                    <Link
                        href="/dashboard"
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow">

                <CheckCircle2 className="mx-auto mb-6 h-20 w-20 text-green-600" />

                <h1 className="mb-3 text-4xl font-bold">
                    Payment Successful!
                </h1>

                <p className="mb-8 text-slate-600">
                    Thank you for your purchase.
                    <br />
                    Your enrollment has been completed successfully.
                </p>

                <div className="flex justify-center gap-4">

                    <Link
                        href="/dashboard"
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
                    >
                        Go to Dashboard
                    </Link>

                    <Link
                        href="/courses"
                        className="rounded-xl border px-6 py-3 font-semibold"
                    >
                        Browse Courses
                    </Link>

                </div>

            </div>
        </main>
    );
}