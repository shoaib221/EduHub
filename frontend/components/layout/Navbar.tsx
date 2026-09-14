"use client";

import Link from "next/link";
import { Menu, Search, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
    const { user } = useAuth()


    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight text-blue-600"
                >
                    LMS
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/courses"
                        className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        Courses
                    </Link>

                    {user && <Link
                        href="/dashboard"
                        className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        Dashboard
                    </Link>}

                    <Link
                        href="/about"
                        className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        About
                    </Link>

                    <Link
                        href="/contact"
                        className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Search
                <div className="hidden lg:flex">
                    <div className="flex items-center rounded-lg border border-slate-300 px-3">
                        <Search size={18} className="text-slate-400" />

                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="w-64 border-none bg-transparent px-3 py-2 text-sm outline-none"
                        />
                    </div>
                </div> */}

                {/* Right Side */}
                <div className="hidden items-center gap-3 md:flex">


                    {user ?
                        <Link
                            href="/profile"
                        >
                            <button className="rounded-full border p-2 transition hover:bg-slate-100">
                                <User size={18} />
                            </button>
                        </Link> :
                        <Link
                            href="/login"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                            Login
                        </Link>
                    }


                </div>

                {/* Mobile Menu */}
                <button className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden">
                    <Menu size={24} />
                </button>
            </div>
        </header>
    );
}