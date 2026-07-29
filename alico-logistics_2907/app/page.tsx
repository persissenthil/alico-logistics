import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import About from "@/components/home/About";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Industries from "@/components/home/Industries";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Stats />
        <Industries />
        <Testimonials />
        <FAQ />
        <CTA />   
        <Footer />     
      </main>
    </>
  );
}