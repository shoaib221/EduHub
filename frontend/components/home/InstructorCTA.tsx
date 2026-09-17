import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function InstructorCTA() {
    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="overflow-hidden rounded-3xl bg-(--color3)">
                    <div className="grid items-center gap-12 p-10 md:p-16 lg:grid-cols-2">
                        {/* Left */}
                        <div className="text-white">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                                <GraduationCap size={18} />
                                Become an Instructor
                            </div>

                            <h2 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
                                Share Your Knowledge.
                                <br />
                                Inspire Thousands.
                            </h2>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
                                Create engaging courses, connect with learners
                                around the world, monitor student progress, and
                                grow your teaching career on our learning
                                platform.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/register?role=instructor"
                                    className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                                >
                                    Start Teaching
                                    <ArrowRight size={18} />
                                </Link>

                                <Link
                                    href="/about"
                                    className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="grid grid-cols-2 gap-5">
                            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                                <h3 className="text-3xl font-bold text-white">
                                    50K+
                                </h3>

                                <p className="mt-2 text-blue-100">
                                    Active Students
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                                <h3 className="text-3xl font-bold text-white">
                                    500+
                                </h3>

                                <p className="mt-2 text-blue-100">
                                    Published Courses
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                                <h3 className="text-3xl font-bold text-white">
                                    100+
                                </h3>

                                <p className="mt-2 text-blue-100">
                                    Expert Instructors
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                                <h3 className="text-3xl font-bold text-white">
                                    4.9★
                                </h3>

                                <p className="mt-2 text-blue-100">
                                    Average Course Rating
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}