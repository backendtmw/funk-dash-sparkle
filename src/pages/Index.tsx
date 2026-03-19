import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import QuoteForm from "@/components/QuoteForm";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import OurServices from "@/components/OurServices";
import Guarantee from "@/components/Guarantee";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <TopBar />
    <HeroSection />
    <QuoteForm />
    <WhyChooseUs />
    <HowItWorks />
    <OurServices />
    <Guarantee />
    <Footer />
  </div>
);

export default Index;
