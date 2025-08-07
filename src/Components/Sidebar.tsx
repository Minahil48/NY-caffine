"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Orders,
  Menu,
  Employees,
  Customers,
  Location,
  Rewards,
  Signout,
  iconDown,
} from "@/assets/common-icons";

// It is assumed the above assets are available at the specified paths.
// For a fully self-contained example, these would be defined here as SVG or other components.

const Sidebar = () => {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const sidebarLinks = [
    {
      icon: Home,
      link: "/dashboard",
      label: "Dashboard",
    },
    {
      icon: Orders,
      link: "/orders",
      label: "Orders",
    },
    {
      icon: Menu,
      link: "/menu-page",
      label: "Menu",
      children: [
        { label: "All Items", link: "/menu-page/new-item" },
        { label: "Categories", link: "/menu-page/categories" },
      ],
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

  useEffect(() => {
    const matchedParent = sidebarLinks.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.link))
    );
    if (matchedParent) {
      setOpenMenu(matchedParent.label);
    }
  }, [pathname, sidebarLinks]);

  const handleToggleSubmenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary rounded-md shadow-md"
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
            <Image src="/logo.svg" alt="Logo" width={80} height={80} />
          </div>

          <div className="flex flex-col gap-2">
            {sidebarLinks.map(({ icon, link, label, children }) => {
              const isActive =
                pathname === link ||
                (children && children.some((child) => pathname.startsWith(child.link)));

              return (
                <div key={label}>
                  <Link
                    href={link}
                    className={`group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
                      isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-primary hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="group-hover:text-white">{icon}</span>
                      <span className="group-hover:text-white">{label}</span>
                    </div>
                    {children && (
                      <span
                        className={`transition-transform duration-300 ${
                          openMenu === label ? "rotate-180" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleSubmenu(label);
                        }}
                      >
                        {iconDown}
                      </span>
                    )}
                  </Link>

                  {children && openMenu === label && (
                    <div className="ml-8 mt-1 flex flex-col gap-1">
                      {children.map((child) => {
                        const childActive = pathname === child.link;
                        return (
                          <Link
                            key={child.label}
                            href={child.link}
                            className={`block px-2 py-1 rounded-md transition-all text-sm ${
                              childActive
                                ? "text-primary font-medium"
                                : "text-gray-600 hover:text-primary"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pl-2 hover:text-white hover:bg-primary p-2 cursor-pointer rounded-md">
            <a href="/" className="flex gap-2 items-center">
              {Signout} Signout
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
