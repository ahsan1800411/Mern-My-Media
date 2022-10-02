import React from "react";
import HeadingOne from "../ReusableComponents/HeadingOne";
import sourceVideo from "../../assets/images/Group 157.svg";
import outputVideo from "../../assets/images/Group 158.svg";
import WrapperMin from "../ReusableComponents/WrapperMin/WrapperMin";
import loadingImg from "../../assets/images/Loading.svg";
import HeadingThree from "../ReusableComponents/HeadingThree";

const TryPoshDubbing = () => {
  return (
    <section className="bg-[#EDF2FF]">
      <WrapperMin>
        <HeadingOne className="mb-14 text-center">pos</HeadingOne>
        <div className="lg:flex gap-x-6">
          <div className="mb-16 lg:mb-0">
            <h1 className="font-bold text-[#333333] text-2xl mb-6">
              Source video
            </h1>
            <img src={sourceVideo} className="mx-auto" alt="Source Video" />
          </div>
          <div>
            <h1 className="font-bold text-[#333333] text-2xl mb-6">
              Output video
            </h1>

            <img src={outputVideo} className="mx-auto" alt="Output Video" />

            <div className="flex items-center">
              <div>
                <img src={loadingImg} className="w-3/4 my-2" alt="" srcset="" />
                <p className="text-sm font-semibold">Please Wait (45%)</p>
              </div>
              <a
                href="#id"
                className={`inline-block w-52 text-center font-medium py-4 leading-none border
      rounded-full text-[#053D9A] text-lg border-[#053D9A]`}
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </WrapperMin>
    </section>
  );
};

export default TryPoshDubbing;
