import Hero from "@/components/home/Hero";

import ServiceGrid from "@/components/services/ServiceGrid";
import Process from "@/components/services/Process";
import Features from "@/components/services/Features";
import Industries from "@/components/services/Industries";
import FAQ from "@/components/services/FAQ";
import CTA from "@/components/services/CTA";

export default function ServicesPage() {
  return (
    <>
      <Hero
        // title="Our Services"
        // subtitle="Reliable logistics solutions tailored to businesses worldwide. From transportation to warehousing, we deliver excellence at every stage of your supply chain."
        // image="/images/hero.jpg"
        heading="OUR LOGISTICS SERVICES"
  title="Comprehensive Logistics Solutions"
  subtitle="From freight forwarding and customs clearance to warehousing and supply chain management, we provide end-to-end logistics services tailored to your business needs."
  image="/images/services-hero.jpg"
      />

      <ServiceGrid />

      <Process />

      <Features />

      <Industries />

      <FAQ />

      <CTA />
    </>
  );
}