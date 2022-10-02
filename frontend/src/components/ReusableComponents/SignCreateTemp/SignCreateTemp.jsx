import React from "react";
import AboutHeader from "../../AboutUs/AboutHeader";
import Footer from "../Footer/Footer";

const SignCreateTemp = ({ children }) => {
  return (
    <section className="bg-[#EDF2FF] lg:pb-0">
      {/* <section className="bg-[#EDF2FF] pb-48 sm:pb-64 lg:pb-0"> */}
      <AboutHeader />
      <div className="relative h-[90vh] bg-[#EDF2FF]">
        <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2  xl:w-[1250px]">
          <div className="flex flex-col lg:flex-row lg:border-2 lg:rounded-[60px] border-[#012054] bg-white">
            {children}
          </div>
        </div>
      </div>
      <Footer className="sm:pt-72 md:pt-72" />
    </section>
  );
};

export default SignCreateTemp;
