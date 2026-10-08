"use client";

import Link from "next/link";
import { Menu, Search, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Logo from "./Logo";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";


export default function Navbar() {
    const { user } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter();


    return (
        <header className="flex justify-between items-center py-2 px-8 fixed w-screen h-16 top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">

            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className={`flex flex-col md:flex-row gap-4 fixed  md:static inset-0 md:inset-auto bg-(--color1) md:bg-auto text-(--color2)
                w-screen h-screen md:w-auto md:h-auto ${sidebarOpen ? "translate-x-0" : "translate-x-full"}  md:translate-x-0
                transition-all`}>

                <button className="text-sm font-medium mt-4 text-slate-700 transition hover:text-(--color3) md:hidden"
                    onClick={() => setSidebarOpen(false)} >
                    Close
                </button>

                <div
                    onClick={() => { router.push("/courses"); setSidebarOpen(false) }}
                    className="text-center text-sm font-medium text-slate-700 transition hover:text-(--color3)"
                >
                    Courses
                </div>

                {user && <div
                    onClick={() => { router.push("/dashboard"); setSidebarOpen(false) }}

                    className="text-center text-sm font-medium text-slate-700 transition hover:text-(--color3)"
                >
                    Dashboard
                </div>}

                <div
                    onClick={() => { router.push("/about"); setSidebarOpen(false) }}
                    className="text-center text-sm font-medium text-slate-700 transition hover:text-(--color3)"
                >
                    About
                </div>

                <div
                    onClick={() => { router.push("/contact"); setSidebarOpen(false) }}
                    className="text-center text-sm font-medium text-slate-700 transition hover:text-(--color3)"
                >
                    Contact
                </div>
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
            <button className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden" onClick={() => setSidebarOpen(prev => !prev)} >
                {sidebarOpen ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </button>

        </header>
    );
}