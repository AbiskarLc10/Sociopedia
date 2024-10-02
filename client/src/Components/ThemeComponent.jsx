import React from "react";
import { useSelector } from "react-redux";
const ThemeComponent = ({ children }) => {
  const { mode } = useSelector((state) => state.theme);
  return (
    <div className={mode}>
      <div className="bg-white text-gray-700  dark:text-white dark:bg-[rgb(16,23,42)] min-h-screen ">
        {children}
      </div>
    </div>
  );
};

export default ThemeComponent;
