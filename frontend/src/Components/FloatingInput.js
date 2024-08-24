import React, { useState } from "react";

const FloatingInput = ({
  label,
  type,
  user,
  name,
  handleDataChange,
  disabled,
  required
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={`w-full relative rounded-lg text-white ${
        focus && "shadow-md shadow-stone-400"
      }`}
    >
      <input
        type={type || "text"}
        value={user}
        name={name}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={handleDataChange}
        className={`w-full no-spinner ${
          disabled ? "text-gray-300" : "bg-transparent"
        } min-w-xl outline-none h-10 pl-2 rounded-lg border-2 border-zinc-400`}
        placeholder=" "
        disabled={disabled}
        required={required}
      />
      <span
        className={`select-none ${
          name === "dob" ?? "hidden"
        } absolute top-0 left-2.5 transition-transform duration-300 ease-in-out transform ${
          focus || user
            ? "-translate-y-4 px-1 rounded-md text-md font-semibold bg-stone-700"
            : "translate-y-2.5 text-sm"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default FloatingInput;
