import React from "react";
import AboutHeader from "../../AboutUs/AboutHeader";
import Footer from "../Footer/Footer";

const ForgetResetTemp = ({ children }) => {
  return (
    <section className="bg-[#EDF2FF]">
      <AboutHeader />
      <div className="relative h-[87vh] bg-[#EDF2FF]">
        <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[900px] xl:w-[1250px]">
          <div className="flex flex-col lg:flex-row lg:rounded-2xl bg-white">
            {children}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </section>
  );
};

export default ForgetResetTemp;
