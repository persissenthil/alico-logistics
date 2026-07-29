import Hero from "@/components/home/Hero";
import IndustriesGrid from "@/components/industries/IndustriesGrid";
import Process from "@/components/industries/Process";
import CTA from "@/components/industries/CTA";
import Features from "@/components/industries/Features";
export default function IndustriesPage() {
  return (
    <>
      <Hero
        heading="INDUSTRIES WE SERVE"
        title="Industries"
        subtitle="Delivering specialized logistics solutions tailored to the unique needs of businesses across every industry."
        image="/images/industries-hero.jpg"
      />

      <IndustriesGrid />
      <Process />
      <Features />
      <CTA />
    </>
  );
}