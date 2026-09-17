import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="bg-linear-to-br from-slate-50 to-blue-50">
            <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row lg:py-28">
                {/* Left */}
                <div className="flex-1 text-center lg:text-left">
                    <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-(--color3)">
                        Learn Without Limits
                    </span>

                    <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
                        Master New Skills
                        <span className="block text-(--color3)">
                            Anytime, Anywhere
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                        Explore high-quality courses taught by expert
                        instructors. Learn at your own pace, take quizzes,
                        track your progress, and earn certificates.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                        <Link
                            href="/courses"
                            className="button-1"
                        >
                            Explore Courses
                        </Link>

                        <Link
                            href="/register"
                            className="button-2"
                        >
                            Get Started
                        </Link>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start">
                        <div>
                            <p className="text-3xl font-bold text-slate-900">
                                500+
                            </p>
                            <p className="text-slate-500">
                                Courses
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold text-slate-900">
                                50K+
                            </p>
                            <p className="text-slate-500">
                                Students
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold text-slate-900">
                                100+
                            </p>
                            <p className="text-slate-500">
                                Instructors
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-1 justify-center">
                    <div className="relative h-105 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
                            alt="Students learning online"
                            width={900}
                            height={700}
                            className="h-full w-full object-cover"
                            priority
                        />

                        <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
                            <p className="text-sm text-slate-500">
                                Active Learners
                            </p>

                            <p className="text-2xl font-bold text-slate-900">
                                50,000+
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}