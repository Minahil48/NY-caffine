import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  value: string;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ value, type = "button", onClick, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`lg:w-[430px] w-auto text-white bg-primary hover:bg-[#bb815c] cursor-pointer rounded-lg text-xl px-5 py-3 text-center ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;
