import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Categories from "@/components/home/Categories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import InstructorCTA from "@/components/home/InstructorCTA";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
    return (
        <>

            <Hero />

            <FeaturedCourses />

            <Categories />

            <WhyChooseUs />

            <InstructorCTA />

            <Testimonials />

        </>
    );
}