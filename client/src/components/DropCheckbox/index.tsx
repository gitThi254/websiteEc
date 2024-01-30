import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const DropCheckBox = ({ variation, title }: { variation: any; title: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <div className="flex items-center">
          <span>{title}</span>
          <div className="w-8">
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        </div>
      </div>
      <div
        className={`absolute bg-white top-[100%] w-[400px]  ${
          isOpen ? "grid" : "hidden"
        } grid-cols-4 z-50 shadow-lg gap-2 p-2 border-2`}
      >
        {variation.map((size: any) => (
          <div className="border-2 px-4 py-2 cursor-pointer" key={size.id}>
            <label htmlFor={size.value}>{size.title}</label>
            <input
              type="checkbox"
              id={size.value}
              name={size.value}
              value={size.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropCheckBox;
