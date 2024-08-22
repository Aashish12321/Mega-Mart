import React, { useState } from "react";

const FloatingInput = ({ label, data }) => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full relative text-white">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full min-w-xl outline-none h-10 pl-2 bg-stone-700 rounded-lg border-2 border-zinc-400`}
        placeholder=" "
      />
      <span
        className={`select-none absolute top-0 left-2.5 transition-transform duration-200 ease-in-out transform ${
          value
            ? "-translate-y-4 px-1 rounded-md text-md bg-stone-700"
            : "translate-y-2 text-sm"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default FloatingInput;
