

import "./globals.css";
import "@/styles/button.css"
import "@/styles/header.css"
import "@/styles/card.css"
import "@/styles/input.css"


import type { Metadata } from "next";
import AuthProvider from "@/providers/AuthProvider";
import AuthListener from "@/components/auth/AuthListener";
import Navbar from "@/components/layout/Navbar";


export const metadata: Metadata = {
	title: {
		default: "LMS",
		template: "%s | LMS",
	},
	description:
		"A modern Learning Management System built with Next.js and Strapi.",
	keywords: [
		"LMS",
		"Learning Management System",
		"Next.js",
		"Strapi",
		"Education",
		"Courses",
	],
};


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`min-h-screen bg-slate-50 antialiased`}>
				<AuthProvider>
					<AuthListener />
					<Navbar />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}

