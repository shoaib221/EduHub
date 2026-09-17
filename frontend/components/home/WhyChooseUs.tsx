import {
    Award,
    BookOpen,
    Clock3,
    GraduationCap,
    LaptopMinimal,
    Users,
} from "lucide-react";

const features = [
    {
        title: "Expert Instructors",
        description:
            "Learn from experienced professionals and industry experts who provide practical, real-world knowledge.",
        icon: GraduationCap,
    },
    {
        title: "High-Quality Courses",
        description:
            "Well-structured courses with videos, quizzes, assignments, and downloadable learning resources.",
        icon: BookOpen,
    },
    {
        title: "Learn Anytime",
        description:
            "Access your courses anytime, anywhere, and continue learning at your own pace on any device.",
        icon: Clock3,
    },
    {
        title: "Interactive Learning",
        description:
            "Participate in quizzes, track your progress, and reinforce your understanding through practical exercises.",
        icon: LaptopMinimal,
    },
    {
        title: "Community Support",
        description:
            "Join a growing learning community where students and instructors collaborate and share knowledge.",
        icon: Users,
    },
    {
        title: "Certificates",
        description:
            "Complete your courses and earn certificates to showcase your achievements and skills.",
        icon: Award,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="font-semibold text-(--color3)">
                        Why Choose Us
                    </span>

                    <h2 className="mt-3 text-4xl font-bold text-(--color2)">
                        Everything You Need to Learn Successfully
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Our platform is designed to make learning engaging,
                        accessible, and effective for students, instructors,
                        and organizations.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="card-1"
                            >
                                <div className="card-2">
                                    <Icon size={32} />
                                </div>

                                <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-600">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-20 rounded-3xl bg-(--color3) px-8 py-12 text-white">
                    <div className="grid gap-10 text-center md:grid-cols-4">
                        <div>
                            <h3 className="text-4xl font-bold">500+</h3>
                            <p className="mt-2 text-blue-100">
                                Courses Available
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold">50K+</h3>
                            <p className="mt-2 text-blue-100">
                                Active Students
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold">100+</h3>
                            <p className="mt-2 text-blue-100">
                                Expert Instructors
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold">95%</h3>
                            <p className="mt-2 text-blue-100">
                                Course Completion Rate
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}