import React from "react";

const FloatingInput = ({ label, type, user, name, handleDataChange, disabled }) => {
  return (
    <div className={`w-full  relative text-white`}>
      <input
        type={type || "text"}
        value={user}
        name={name}
        onChange={handleDataChange}
        className={`w-full ${disabled ? "text-gray-300":"bg-stone-700"} min-w-xl outline-none h-10 pl-2 rounded-lg border-2 border-zinc-400`}
        placeholder=" "
        disabled={disabled}
      />
      <span
        className={`select-none ${name==="dob" ?? "hidden"} absolute top-0 left-2.5 transition-transform duration-300 ease-in-out transform ${
          user
            ? "-translate-y-4 px-1 rounded-md text-md font-semibold bg-stone-700"
            : "translate-y-2 text-sm"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default FloatingInput;
