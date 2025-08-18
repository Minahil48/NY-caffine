import React from "react";
import Image from "next/image";
interface ProductCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  points: string;
}

const RewardCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  subtitle,
  points,
}) => {
  return (
    <div className="bg-white border-1 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-[300px]">
      <Image
        src={imageSrc}
        alt={title}
        width={280}
        height={100}
        className=" object-cover rounded-t-xl p-2"
      />
      <div className="p-4 flex flex-col">
        <h3 className="text-md text-gray-800 mb-3">{title}</h3>
        <p className="text-sm text-gray-500 min-h-10 mb-3">{subtitle}</p>
        <ul className="text-sm text-gray-800">
          <li>
            <span className="text-gray-500 mr-2">•</span>
            {points}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RewardCard;
