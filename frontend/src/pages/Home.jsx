import React from "react";
import Footer from "../components/ReusableComponents/Footer/Footer";
import {
  ClientFeedback,
  HeroSection,
  TryPoshDubbing,
  ProductVideo,
  Faq,
  ProductFeatures,
  WhyPoshDubbing,
} from "../components/Home";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <ProductVideo />
      <TryPoshDubbing />
      <ProductFeatures />
      <WhyPoshDubbing />
      <ClientFeedback />
      <Faq />
      <Footer />
    </main>
  );
};

export default Home;
