import React, { ReactNode } from "react";

interface ViewProps {
  value: string;
  icon?: ReactNode;
  href?: string;
}

function ViewButton({ value, icon, href }: ViewProps) {
  const className =
    "cursor-pointer flex gap-2 border-1 text-md border-gray-300 bg-secondary p-2 text-xs items-center justify-center rounded-full";

  if (href) {
    return (
      <a href={href} className={className}>
        {value}
        {icon}
      </a>
    );
  }

  return (
    <button className={className}>
      {value}
      {icon}
    </button>
  );
}

export default ViewButton;
