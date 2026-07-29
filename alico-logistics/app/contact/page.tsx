import ContactHero from "@/components/contact/Hero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";
import FAQ from "@/components/contact/FAQ";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <ContactInfo />
      <ContactForm />
      <Map />
      <FAQ />
    </>
  );
}