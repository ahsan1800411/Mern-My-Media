import React from "react";
import Description from "../components/AboutUs/Description/Description";
import Team from "./../components/AboutUs/Team/Team";
import Footer from "./../components/ReusableComponents/Footer/Footer";

const AboutUs = () => {
  return (
    <section>
      <Description />
      <Team />
      <Footer />
    </section>
  );
};

export default AboutUs;
