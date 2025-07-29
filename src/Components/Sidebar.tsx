"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Orders, Menu, Employees, Customers, Location, Rewards, Signout } from "@/assets/common-icons";

const Sidebar = () => {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarLinks = [
    {
      icon: Home,
      link: "/Dashboard",
      label: "Home",
    },
    {
      icon: Orders,
      link: "/orders",
      label: "Orders",
    },
    {
      icon: Menu,
      link: "/menu",
      label: "Menu",
    },
    {
      icon: Employees,
      link: "/employees",
      label: "Employees",
    },
    {
      icon: Customers,
      link: "/customers",
      label: "Customers",
    },
    {
      icon: Location,
      link: "/location",
      label: "Location",
    },
    {
      icon: Rewards,
      link: "/rewards",
      label: "Rewards",
    },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md shadow-md"
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <span className="text-xl font-bold">☰</span>
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-56 bg-white text-black p-6 text-sm tracking-wide shadow-md z-40 transform transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex flex-col justify-between`}
      >
        <div className="flex flex-col gap-12">
          <div className="flex items-center justify-center">
            <Image src="/logo.svg" alt="Logo" width={60} height={40} />
          </div>

          <div className="flex flex-col gap-2">
            {sidebarLinks.map(({ icon, link, label }) => (
              <Link
                key={label}
                href={link}
                className={`group flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary transition-all ${
                  pathname === link ? "bg-primary text-white bh-primary" : ""
                }`}
              >
                <span className="group-hover:text-white">{icon}</span>
                <span className="group-hover:text-white">{label}</span>
              </Link>
            ))}
          </div>
          <div className="ml-2 hover:text-white hover:bg-primary p-2 cursor-pointer rounded-md"><a href="/" className="flex gap-2">{Signout} Signout</a></div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
