import Hero from "@/components/sections/Hero";
import ContactGrid from "@/components/sections/ContactGrid";
import ServicesSection from "@/components/sections/ServicesSection";
import BookingForm from "@/components/sections/BookingForm";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Hero />
      <ContactGrid />
      <ServicesSection />
      <BookingForm />
      <Testimonials />
      <Footer />
    </main>
  );
}
