import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";

import QuoteForm from "@/components/quote/QuoteForm";
import Benefits from "@/components/quote/Benefits";
import FAQ from "@/components/quote/FAQ";
import CTA from "@/components/quote/CTA";

export default function QuotePage() {
  return (
    <>
      <Header />

      <main>
        <Hero
          heading="REQUEST YOUR FREIGHT QUOTE"
          title="Request a Quote"
          subtitle="Get a fast, accurate, and competitive freight quote tailored to your shipping requirements. Our logistics experts are ready to assist you worldwide."
          image="/images/quote-hero.jpg"
        />

        <QuoteForm />

        <Benefits />

        <FAQ />

        <CTA />
      </main>

      <Footer />
    </>
  );
}