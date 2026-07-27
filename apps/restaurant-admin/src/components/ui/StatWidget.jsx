import React from "react";
import Card from "@/components/ui/card/Card";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

const StatWidget = ({
  icon,
  title,
  value,
  change,
  iconBg = "bg-lightPrimary dark:bg-navy-700",
  iconColor = "text-brand-500",
}) => {
  const positive = change >= 0;
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px] p-3">
      <div className="ml-[10px] flex h-[80px] w-auto w-full flex-row items-center justify-between">
        <div className="flex items-center">
          <div className={`rounded-full ${iconBg} p-3`}>
            <span className={`flex items-center text-xl ${iconColor}`}>
              {icon}
            </span>
          </div>
          <div className="ml-4 flex flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600">{title}</p>
            <h4 className="text-navy-700 text-xl font-bold dark:text-white">
              {value}
            </h4>
          </div>
        </div>
        <div
          className={`flex items-center rounded-full px-2 py-1 text-xs font-bold ${positive ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-red-100 text-red-600 dark:bg-red-900/30"}`}
        >
          {positive ? <MdArrowDropUp /> : <MdArrowDropDown />}
          {Math.abs(change)}%
        </div>
      </div>
    </Card>
  );
};

export default StatWidget;
