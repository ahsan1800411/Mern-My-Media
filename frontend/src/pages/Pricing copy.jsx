import React from "react";
import AboutHeader from "../components/AboutUs/AboutHeader";
import Footer from "../components/ReusableComponents/Footer/Footer";
import WrapperMax from "../components/ReusableComponents/WrapperMax/WrapperMax";
import PackageBox from "./../components/Pricing/PackageBox";

const Pricing = () => {
  return (
    <>
      <section className="bg-[#EDF2FF] pb-32">
        <AboutHeader />
        <WrapperMax>
          <div className="flex flex-col items-center lg:flex-row justify-center space-x-6 my-14">
            <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-8">
              Lorem ipsum has survived not only five
            </h1>
            <div className="flex space-x-4">
              <a
                href="#id"
                className={`inline-block w-44 text-center font-semibold py-4 leading-none border
      rounded-full text-white text-lg border-[#053D9A] hover:border-transparent
      hover:text-white bg-[#053D9A] mb-8`}
              >
                Monthly
              </a>
              <a
                href="#id"
                className={`inline-block w-44 text-center font-semibold py-4 leading-none border
      rounded-full text-white text-lg border-[#053D9A] hover:border-transparent
      hover:text-white bg-[#053D9A] mb-8`}
              >
                Yearly
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            <PackageBox
              price="10.5"
              packageName="Basic"
              packageColor="#012054"
              className="text-[#012054]"
            />
            <PackageBox
              price="15.3"
              packageName="Standard"
              packageColor="#5BECC0"
              btnColor="#012054"
              className=" text-white"
            />
            <PackageBox
              price="23.7"
              packageName="PRO"
              packageColor="#012054"
              btnColor="#5BECC0"
              className="border-none text-white"
            />
          </div>
        </WrapperMax>
      </section>
      <Footer />
    </>
  );
};

export default Pricing;
