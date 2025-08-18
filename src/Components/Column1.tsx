import Image from "next/image";
import React from "react";

function Column1() {
  return (
    <div
      className="bg-no-repeat hidden bg-cover md:flex flex-col gap-5 justify-end items-start p-10 pb-25 relative rounded-l-lg min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(101, 90, 0, 0.2), rgba(101, 67, 33, 0.2)), url('/Bg.svg')",
      }}
    >
      <Image
        src="/logo.svg"
        width={1000}
        height={1000}
        loading="lazy"
        alt="Logo"
        className="h-20 absolute top-10 left-10 w-auto"
      />
      <h1 className="text-white text-5xl font-bold max-w-md leading-snug rounded-md">
        All Your Cravings <br /> In One Place
      </h1>
      <p className="text-white text-2xl rounded-md">
        NY Caffeine - More Than Just Coffee
      </p>
    </div>
  );
}

export default Column1;
