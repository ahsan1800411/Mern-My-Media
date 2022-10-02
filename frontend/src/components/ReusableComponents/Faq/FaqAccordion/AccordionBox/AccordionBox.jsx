import React from "react";

const AccordionBox = ({
  title,
  headingId,
  collapseId,
  children,
  visibility = "",
}) => {
  return (
    // <div className="overflow-hidden">
    //   <label className="">
    //     <input
    //       className="peer absolute opacity-0"
    //       type="checkbox"
    //       name=""
    //       id=""
    //     />
    //     <p className="inline-block cursor-pointer items-center text-lg font-semibold text-[#012054] transition md:w-11/12 lg:text-xl">
    //       Richard McClintock, a Latin professor at Hampden-Sydney?
    //     </p>
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="float-right inline-block h-6 w-6 cursor-pointer peer-checked:rotate-45"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //       stroke-width="2"
    //     >
    //       <path
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //         d="M12 4v16m8-8H4"
    //       />
    //     </svg>

    //     <div className="max-h-0 transition-all duration-500 peer-checked:max-h-screen">
    //       <p className="p-5">
    //         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
    //         expedita eius culpa sint consequatur est iste possimus cupiditate,
    //         voluptatem facilis repudiandae, minus consequuntur ducimus quod nam
    //         minima maiores repellendus.
    //       </p>
    //     </div>
    //   </label>
    // </div>

    <div className="accordion-item ">
      <h2 className="accordion-header mb-3" id={`${headingId}`}>
        {/* sm:text-lg md:w-11/12 md:text-base lg:text-lg xl:text-xl */}
        <button
          className="accordion-button relative flex w-full items-center py-4 pr-4 pl-1 text-left text-base font-semibold text-gray-800 transition focus:outline-none sm:text-lg md:text-base lg:text-lg xl:text-xl"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded="false"
          aria-controls={`${collapseId}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={`${collapseId}`}
        className={`collapse accordion-collapse border-0 ${visibility}`}
        aria-labelledby={`${headingId}`}
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body py-4 px-5">{children}</div>
      </div>
    </div>
  );
};

export default AccordionBox;
