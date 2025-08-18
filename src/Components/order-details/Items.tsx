import React from "react";
import Image from "next/image";

interface ItemsProps {
  total: string;
  imageSrc: string;
  altText: string;
  heading: string;
  Qty: number;
  Modifiers: string[];
}

const Items: React.FC<ItemsProps> = ({
  total,
  imageSrc,
  altText,
  heading,
  Qty,
  Modifiers,
}) => {
  const parsedTotal = parseFloat(total);

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-[#FBFBFB] rounded-2xl border border-gray-300 p-4">
      <div className="flex-shrink-0">
        <Image
          src={imageSrc}
          alt={altText}
          width={100}
          height={100}
          className="rounded-lg object-cover w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm sm:text-base">
          <h3 className="font-semibold">{heading}</h3>
          <span className="text-gray-800 font-medium">
            ${parsedTotal.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-gray-500">Qty: {Qty}</p>

        <div className="text-gray-500 text-sm flex flex-col sm:flex-row gap-1 whitespace-nowrap">
          <span className="font-medium">Modifiers:</span>
          <ul className="flex flex-wrap gap-1 text-sm text-gray-500">
            {Modifiers.map((mod, index) => (
              <li
                key={index}
                className="after:content-[','] last:after:content-none"
              >
                {mod}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Items;
