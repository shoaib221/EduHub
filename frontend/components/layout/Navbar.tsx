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
        <header className="flex justify-between items-center py-2 px-8 fixed w-screen h-16 top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">

            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className={`flex flex-col md:flex-row gap-4 fixed  md:static 
                top-16 md:top-auto left-0 md:left-auto bg-(--color1) md:bg-auto text-(--color2)
                w-screen h-screen md:w-auto md:h-auto ${sidebarOpen ? "translate-x-0" : "translate-x-full"}  
                md:translate-x-0 transition-all z-50`}>

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

                {user ?

                    <div
                        onClick={() => { router.push("/profile"); setSidebarOpen(false) }}
                        className="text-center text-sm font-medium text-slate-700 transition hover:text-(--color3)"
                    >
                        Profile
                    </div>
                    :

                    <div
                        onClick={() => { router.push("/login"); setSidebarOpen(false) }}
                        className="text-center text-sm font-medium text-slate-700 transition hover:text-(--color3)"
                    >
                        Login
                    </div>

                }
            </nav>





            {/* Mobile Menu */}
            <button className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden" onClick={() => setSidebarOpen(prev => !prev)} >
                {sidebarOpen ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </button>

        </header>
    );
}