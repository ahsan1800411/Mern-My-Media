import React from "react";
import AccordionBox from "./AccordionBox/AccordionBox";

const FaqAccordion = () => {
  return (
    // <div className="flex-1 divide-y-2 divide-solid divide-[#012054]">
    //   <AccordionBox />
    //   <AccordionBox />
    //   <AccordionBox />
    //   <AccordionBox />
    // </div>

    <div
      className="accordion accordion-flush flex-1 divide-y-2 divide-solid divide-[#012054]"
      id="accordionFlushExample"
    >
      <AccordionBox
        title="Richard McClintock, a Latin professor at Hampden-Sydney?"
        headingId="flush-headingOne"
        collapseId="flush-collapseOne"
      >
        Placeholder content for this accordion, which is intended to demonstrate
        the <code>.accordion-flush</code> className. This is the first item's
        accordion body.
      </AccordionBox>
      <AccordionBox
        title="Richard McClintock, a Latin professor at Hampden-Sydney?"
        headingId="flush-headingTwo"
        collapseId="flush-collapseTwo"
      >
        Placeholder content for this accordion, which is intended to demonstrate
        the <code>.accordion-flush</code> className. This is the first item's
        accordion body.
      </AccordionBox>
      <AccordionBox
        title="Richard McClintock, a Latin professor at Hampden-Sydney?"
        headingId="flush-headingThree"
        collapseId="flush-collapseThree"
      >
        Placeholder content for this accordion, which is intended to demonstrate
        the <code>.accordion-flush</code> className. This is the first item's
        accordion body.
      </AccordionBox>
      <AccordionBox
        title="Richard McClintock, a Latin professor at Hampden-Sydney?"
        headingId="flush-headingFour"
        collapseId="flush-collapseFour"
      >
        Placeholder content for this accordion, which is intended to demonstrate
        the <code>.accordion-flush</code> className. This is the first item's
        accordion body.
      </AccordionBox>
    </div>
  );
};

export default FaqAccordion;
