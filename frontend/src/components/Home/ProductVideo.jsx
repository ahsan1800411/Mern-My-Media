import React from "react";
import videoImg from "../../assets/images/product-video.svg";
import HeadingOne from "../ReusableComponents/HeadingOne";
import Wrapper from "../ReusableComponents/WrapperMin/WrapperMin";

const ProductVideo = () => {
  return (
    <section className="bg-[#EDF2FF]">
      <Wrapper className="text-center">
        <HeadingOne className="mb-4 lg:mb-8">Product videooooo</HeadingOne>

        <p className="mb-7 text-sm lg:text-base font-medium">
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. <br /> It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged.
        </p>
        <img src={videoImg} className="mx-auto w-[650px]" alt="Product Videooooo" />
      </Wrapper>
    </section>
  );
};

export default ProductVideo;
