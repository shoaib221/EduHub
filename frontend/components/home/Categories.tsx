import Link from "next/link";
import {
    Code2,
    BriefcaseBusiness,
    Palette,
    Database,
    BrainCircuit,
    ChartColumn,
    Camera,
    Languages,
} from "lucide-react";

const categories = [
    {
        title: "Programming",
        courses: 120,
        icon: Code2,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Business",
        courses: 65,
        icon: BriefcaseBusiness,
        color: "bg-green-100 text-green-600",
    },
    {
        title: "Design",
        courses: 48,
        icon: Palette,
        color: "bg-pink-100 text-pink-600",
    },
    {
        title: "Marketing",
        courses: 41,
        icon: ChartColumn,
        color: "bg-cyan-100 text-cyan-600",
    },
    {
        title: "Photography",
        courses: 26,
        icon: Camera,
        color: "bg-red-100 text-red-600",
    },
    {
        title: "Languages",
        courses: 36,
        icon: Languages,
        color: "bg-yellow-100 text-yellow-600",
    },
];

export default function Categories() {
    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 text-center">
                    <p className="font-semibold text-(--color3)">
                        Browse Categories
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-slate-900">
                        Find Your Learning Path
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                        Discover courses across a wide range of subjects and
                        start learning the skills that matter most to you.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <Link
                                key={category.title}
                                href={`/courses?category=${encodeURIComponent(
                                    category.title
                                )}`}
                                className="card-1 group"
                            >
                                <div
                                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color}`}
                                >
                                    <Icon size={32} />
                                </div>

                                <h3 className="mt-6 text-xl font-semibold text-slate-900 transition group-hover:text-(--color3)">
                                    {category.title}
                                </h3>

                                <p className="mt-2 text-slate-500">
                                    {category.courses} Courses
                                </p>

                                <div className="mt-6 flex items-center text-sm font-medium text-(--color3) opacity-0 transition group-hover:opacity-100">
                                    Explore →
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}