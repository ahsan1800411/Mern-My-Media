import React from "react";
import HeadingOne from "../../HeadingOne";

const FrequentQues = () => {
  return (
    <div className="flex-1 mb-8 lg:mb-0">
      <div className="flex flex-col justify-center space-y-8">
        <HeadingOne className="text-left">Frequently Asked Question</HeadingOne>
        <p className="text-lg text-[#012354] font-semibold">
          Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit. Est,
          laudantium.
        </p>
        <a
          href="#id"
          className={`inline-block w-56 text-center font-semibold py-5 leading-none border
      rounded-full text-white text-lg border-[#053D9A] hover:border-transparent
      hover:text-white bg-[#053D9A]`}
        >
          Let's get started
        </a>
      </div>
    </div>
  );
};

export default FrequentQues;
