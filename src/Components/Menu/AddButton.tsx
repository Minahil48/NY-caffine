import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

function AddButton({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex px-4 py-2 rounded-lg cursor-pointer bg-primary text-white items-center justify-center hover:bg-gray-300 hover:text-black transition-all"
    >
      {label}
    </button>
  );
}

export default AddButton;
