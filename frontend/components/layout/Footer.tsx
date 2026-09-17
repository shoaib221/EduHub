
import Link from "next/link";
import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import {
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="border-t bg-slate-900 text-slate-300">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Logo />

                        <p className="mt-5 text-sm leading-7 text-slate-400">
                            Learn from industry experts, build practical skills, and
                            accelerate your career through interactive online courses.
                        </p>

                        <div className="mt-6 flex gap-4">
                            <Link
                                href="#"
                                className="rounded-full bg-slate-800 p-2 transition hover:bg-blue-600"
                            >
                                <FaFacebookF size={18} />
                            </Link>

                            <Link
                                href="#"
                                className="rounded-full bg-slate-800 p-2 transition hover:bg-sky-500"
                            >
                                <FaXTwitter size={18} />
                            </Link>

                            <Link
                                href="#"
                                className="rounded-full bg-slate-800 p-2 transition hover:bg-pink-600"
                            >
                                <FaInstagram size={18} />
                            </Link>

                            <Link
                                href="#"
                                className="rounded-full bg-slate-800 p-2 transition hover:bg-blue-700"
                            >
                                <FaLinkedinIn size={18} />
                            </Link>

                            <Link
                                href="#"
                                className="rounded-full bg-slate-800 p-2 transition hover:bg-slate-700"
                            >
                                <FaGithub size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-(--color1)">
                            Explore
                        </h3>

                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/courses" className="hover:text-white">
                                    Courses
                                </Link>
                            </li>

                            <li>
                                <Link href="/categories" className="hover:text-white">
                                    Categories
                                </Link>
                            </li>

                            <li>
                                <Link href="/instructors" className="hover:text-white">
                                    Instructors
                                </Link>
                            </li>

                            <li>
                                <Link href="/blogs" className="hover:text-white">
                                    Blog
                                </Link>
                            </li>

                            <li>
                                <Link href="/about" className="hover:text-white">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-(--color1)">
                            Support
                        </h3>

                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/help" className="hover:text-white">
                                    Help Center
                                </Link>
                            </li>

                            <li>
                                <Link href="/faq" className="hover:text-white">
                                    FAQ
                                </Link>
                            </li>

                            <li>
                                <Link href="/privacy" className="hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link href="/terms" className="hover:text-white">
                                    Terms & Conditions
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact" className="hover:text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-(--color1)">
                            Contact
                        </h3>

                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={18}
                                    className="mt-1 text-blue-400"
                                />
                                <span>Dhaka, Bangladesh</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-blue-400" />
                                <span>+880 1XXXXXXXXX</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-blue-400" />
                                <span>support@lms.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} LMS. All rights reserved.
                </div>
            </div>
        </footer>
    );
}