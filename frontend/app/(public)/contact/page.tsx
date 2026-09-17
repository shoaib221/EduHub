import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";


export default function ContactPage() {

    return (
        <main className="min-h-screen bg-slate-50">

            {/* Hero */}
            <section className="bg-(--color3) py-20">

                <div className="mx-auto max-w-7xl px-6 text-center">

                    <h1 className="text-5xl font-bold text-white">
                        Contact Us
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
                        Have questions about courses, enrollment, or your
                        learning journey? We are here to help.
                    </p>

                </div>

            </section>


            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-3">


                {/* Contact Info */}
                <div className="space-y-6">

                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color31) text-(--color3)">
                            <Mail />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-slate-900">
                            Email
                        </h3>

                        <p className="mt-2 text-slate-600">
                            support@lms.com
                        </p>

                    </div>



                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color31) text-(--color3)">
                            <Phone />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-slate-900">
                            Phone
                        </h3>

                        <p className="mt-2 text-slate-600">
                            +880 1234-567890
                        </p>

                    </div>



                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color31) text-(--color3)">
                            <MapPin />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-slate-900">
                            Location
                        </h3>

                        <p className="mt-2 text-slate-600">
                            Dhaka, Bangladesh
                        </p>

                    </div>

                </div>



                {/* Contact Form */}
                <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-2">

                    <h2 className="heading-2">
                        Send Us a Message
                    </h2>


                    <p className="mt-3 text-slate-600">
                        Fill out the form and our team will get back to you.
                    </p>


                    <form className="mt-8 space-y-5">

                        <div className="grid gap-5 md:grid-cols-2">

                            <input
                                type="text"
                                placeholder="Your Name"
                                className="rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600"
                            />


                            <input
                                type="email"
                                placeholder="Your Email"
                                className="rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600"
                            />

                        </div>



                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600"
                        />



                        <textarea
                            rows={5}
                            placeholder="Your Message"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600"
                        />



                        <button
                            type="submit"
                            className="button-1"
                        >
                            Send Message
                        </button>

                    </form>

                </div>

            </section>

        </main>
    );
}