"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    Camera,
    Mail,
    Phone,
    User,
    Save,
    X,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";


export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        bio: "",
    });

    useEffect(() => {
        if (!user) return;

        setFormData({
            username: user.username ?? "",
            email: user.email ?? "",
            firstName: "",
            lastName: "",
            phone: "",
            bio: "",
        });

    }, [user])

    const [profileImage, setProfileImage] = useState<string | null>(null);


    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setProfileImage(imageUrl);
    };


    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            // TODO:
            // Send formData to Strapi
            //
            // await api.put("/api/auth/me", formData);

            await new Promise((resolve) =>
                setTimeout(resolve, 800)
            );

            setMessage("Profile updated successfully.");
            setIsEditing(false);

        } catch {
            setMessage(
                "Failed to update profile. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = () => {
        setFormData({
            username: user?.username ?? "",
            email: user?.email ?? "",
            firstName: "",
            lastName: "",
            phone: "",
            bio: "",
        });

        setMessage("");
        setIsEditing(false);
    };


    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-slate-50 py-10">

                <div className="mx-auto max-w-5xl px-6">

                    {/* Header */}
                    <div className="mb-8">


                        <p className="mt-2 text-slate-500">
                            Manage your personal information and profile.
                        </p>
                    </div>


                    <form onSubmit={handleSubmit}>

                        {/* Profile Header */}
                        <section className="rounded-3xl bg-white p-8 shadow-sm">

                            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                                {/* Profile Photo */}
                                <div className="relative">

                                    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-5xl font-bold text-white">

                                        {profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            user?.username
                                                ?.charAt(0)
                                                .toUpperCase() || "U"
                                        )}

                                    </div>


                                    {isEditing && (
                                        <label
                                            htmlFor="profile-image"
                                            className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-700"
                                        >
                                            <Camera size={18} />

                                            <input
                                                id="profile-image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}

                                </div>


                                {/* User */}
                                <div>

                                    <h2 className="text-2xl font-bold text-slate-900">
                                        {user?.first_name || "Mr"} {user?.last_name}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {user?.user_role === 'student' ? <>Student</> : <>Instructor</>}
                                    </p>

                                </div>

                            </div>

                        </section>


                        {/* Personal Information */}
                        <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Personal Information
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Update your personal details.
                                    </p>
                                </div>


                                {!isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
                                    >
                                        Edit Profile
                                    </button>
                                )}

                            </div>


                            <div className="mt-8 grid gap-6 md:grid-cols-2">


                                {/* Username */}
                                <div>

                                    <label
                                        htmlFor="username"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Username
                                    </label>

                                    <div className="flex items-center rounded-xl border border-slate-300 bg-white">

                                        <User
                                            size={19}
                                            className="ml-4 text-slate-400"
                                        />

                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            value={formData.username}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full rounded-xl bg-transparent px-3 py-3 text-slate-900 outline-none disabled:bg-slate-50 disabled:text-slate-500"
                                        />

                                    </div>

                                </div>


                                {/* Email */}
                                <div>

                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Email
                                    </label>

                                    <div className="flex items-center rounded-xl border border-slate-300 bg-white">

                                        <Mail
                                            size={19}
                                            className="ml-4 text-slate-400"
                                        />

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full rounded-xl bg-transparent px-3 py-3 text-slate-900 outline-none disabled:bg-slate-50 disabled:text-slate-500"
                                        />

                                    </div>

                                </div>


                                {/* First Name */}
                                <div>

                                    <label
                                        htmlFor="firstName"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        First Name
                                    </label>

                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="Enter first name"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 disabled:bg-slate-50 disabled:text-slate-500"
                                    />

                                </div>


                                {/* Last Name */}
                                <div>

                                    <label
                                        htmlFor="lastName"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Last Name
                                    </label>

                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="Enter last name"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 disabled:bg-slate-50 disabled:text-slate-500"
                                    />

                                </div>


                                {/* Phone */}
                                <div>

                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Phone
                                    </label>

                                    <div className="flex items-center rounded-xl border border-slate-300 bg-white">

                                        <Phone
                                            size={19}
                                            className="ml-4 text-slate-400"
                                        />

                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="Enter phone number"
                                            className="w-full rounded-xl bg-transparent px-3 py-3 text-slate-900 outline-none placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500"
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* Bio */}
                            <div className="mt-6">

                                <label
                                    htmlFor="bio"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Bio
                                </label>

                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows={5}
                                    value={formData.bio}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Tell us a little about yourself..."
                                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 disabled:bg-slate-50 disabled:text-slate-500"
                                />

                            </div>


                            {/* Message */}
                            {message && (
                                <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                    {message}
                                </div>
                            )}


                            {/* Actions */}
                            {isEditing && (
                                <div className="mt-8 flex justify-end gap-3">

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        <Save size={18} />

                                        {loading
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </button>

                                </div>
                            )}

                        </section>

                    </form>


                    <button
                        onClick={logout}
                        className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
                    >
                        Logout
                    </button>

                </div>

            </main>
        </ProtectedRoute>
    );
}