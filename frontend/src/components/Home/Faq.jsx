import React from "react";
import FrequentQues from "./../ReusableComponents/Faq/FrequentQues/FrequentQues";
import FaqAccordion from "./../ReusableComponents/Faq/FaqAccordion/FaqAccordion";
import WrapperMax from "../ReusableComponents/WrapperMax/WrapperMax";

const Faq = () => {
  return (
    <section className="bg-[#EDF2FF] pt-16 pb-20 lg:pt-24">
      <WrapperMax>
        <div className="items-center py-10 lg:flex">
          <FrequentQues />
          <FaqAccordion />
        </div>
      </WrapperMax>
    </section>
  );
};

export default Faq;
