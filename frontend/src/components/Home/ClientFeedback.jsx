import React from "react";
import WrapperMin from "../ReusableComponents/WrapperMin/WrapperMin";
import img1 from "../../assets/images/testimonial.jpg";
import HeadingOne from "../ReusableComponents/HeadingOne";

const ClientFeedback = () => {
  return (
    <section className=" bg-[#EDF2FF] break-words  relative pb-28">
      {" "}
      <div className="hidden lg:block absolute h-[650px] w-[650px] bg-[#053D9A] rounded-[20%] rotate-45 transform -translate-x-[55%] top-1/2 -translate-y-1/2"></div>
      <WrapperMin>
        <HeadingOne className="text-center mb-16">
          Our Client Feedback
        </HeadingOne>
        <div className=" max-w-[600px] text-center mx-auto ">
          <img
            src={img1}
            className="mx-auto h-[150px] w-[150px] rounded-[50%]  border-8 border-[#053D9A] mb-6"
            alt=""
          />
          <h1 className="text-[#012054] text-3xl mb-4 font-bold">James</h1>
          <p className="text-[#012054] lg:text-2xl font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quo
            aspernatur nulla placeat, illo alias.
          </p>
        </div>
      </WrapperMin>
      <>
        <img
          src={img1}
          className="absolute top-[35%] right-[10%] mx-auto h-[100px] w-[100px] rounded-[50%] shadow-md shadow-[#5BECC0]"
          alt=""
        />

        <img
          src={img1}
          className="absolute top-[35%] left-[20%] mx-auto h-[100px] w-[100px] rounded-[50%] shadow-md shadow-[#5BECC0]"
          alt=""
        />

        <img
          src={img1}
          className="absolute top-[70%] left-[5%]  mx-auto h-[80px] w-[80px] rounded-[50%] shadow-md shadow-[#5BECC0]"
          alt=""
        />

        <img
          src={img1}
          className="absolute top-[80%] right-[15%] mx-auto h-[100px] w-[100px] rounded-[50%] shadow-md shadow-[#5BECC0]"
          alt=""
        />

        <img
          src={img1}
          className="absolute top-[90%] left-[25%]  mx-auto h-[100px] w-[100px] rounded-[50%]  shadow-md shadow-[#5BECC0]"
          alt=""
        />
      </>
    </section>
  );
};

export default ClientFeedback;
