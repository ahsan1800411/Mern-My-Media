import React from "react";

const InputLabel = ({ label, id }) => {
  return (
    <label
      class="block capitalize tracking-wide md:text-lg text-[#012054] font-semibold mb-2"
      for={id}
    >
      {label}
    </label>
  );
};

export default InputLabel;
