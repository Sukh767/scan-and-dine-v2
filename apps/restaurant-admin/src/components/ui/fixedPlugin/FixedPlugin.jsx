import React from "react";

import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { useTheme } from "@/context/ThemeContext";

export default function FixedPlugin(props) {
  const { ...rest } = props;
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      className="border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] bg-gradient-to-br from-brandLinear to-blueSecondary p-0"
      onClick={toggleDarkMode}
      {...rest}
    >
      <div className="cursor-pointer text-gray-600">
        {darkMode ? (
          <RiSunFill className="h-4 w-4 text-white" />
        ) : (
          <RiMoonFill className="h-4 w-4 text-white" />
        )}
      </div>
    </button>
  );
}
