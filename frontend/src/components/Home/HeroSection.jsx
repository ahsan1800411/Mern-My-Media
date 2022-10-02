import React from "react";
import mainImage from "../../assets/images/Hero-Section-Img.svg";
import pattern from "../../assets/images/Pattren.svg";
import Button from "../ReusableComponents/Button/Button";
import Header from "../ReusableComponents/Header/Header";
import WrapperMax from "../ReusableComponents/WrapperMax/WrapperMax";

const HeroSection = () => {
  return (
    <section className="h-screen bg-gradient-to-tl from-[#053D9A] to-[#012054]">
      <div
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "100% 70%",
        }}
        className="h-screen bg-right-bottom bg-no-repeat"
      >
        <WrapperMax>
          <Header />
          <div className={`flex flex-col lg:mt-20 lg:flex-row `}>
            <div className="order-2 flex flex-1 flex-col justify-center px-5 lg:order-none">
              <h1 className="my-6 font-bold text-white text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl lg:leading-snug">
                Lorem ipsum is simply dummy text of the printing
              </h1>
              <p className="text-lg text-white">
                Lorem Insum has been the industry's standard dummy text.
              </p>
              <Button color="#5BECC0">pos</Button>
            </div>
            <div className="flex-1 ">
              <img
                className="w-3/4 lg:w-full mt-8 mx-auto"
                src={mainImage}
                alt="My Happy SVG"
              />
            </div>
          </div>
        </WrapperMax>
      </div>
    </section>
  );
};

export default HeroSection;
