"use client"

import { settings } from '@/assets/common-icons';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {
    const pathname = usePathname();

    const headingsAndSubheadings = [
        {
            url: "/",
            heading: "Dashboard",
            subheading: "Lets check your statistics today",
        },
        {
            url: "/orders",
            heading: "Orders",
            subheading: "Track all your orders from here",
        },
         {
            url: "/orders/[orderId]",
            heading: "Orders",
            subheading: "View your order details here",
        },
         {
            url: "/menu",
            heading: "Menu",
            subheading: "Manage your menu from here",
        },
        {
            url: "/menu/new-item",
            heading: "Menu",
            subheading: "Manage your menu from here",
        },
        {
            url: "/menu/categories",
            heading: "Menu",
            subheading: "Manage your menu from here",
        },
         {
            url: "/employees",
            heading: "Employees",
            subheading: "Manage your workfrorce from here",
        },
         {
            url: "/customers",
            heading: "Customers",
            subheading: "Manage your customers from here",
        },
         {
            url: "/customers/customer-details",
            heading: "Customer Detail",
            subheading: "Manage your customer detail from here",
        },
         {
            url: "/customers/customer-order-details/1",
            heading: "Customer Detail",
            subheading: "Manage your customer detail from here",
        },
         {
            url: "/location",
            heading: "Locations",
            subheading: "Manage your store branches from here",
        },
        {
            url: "/rewards",
            heading: "Rewards",
            subheading: "Manage your rewards from here",
        }

    ]

    const currentHeadings = headingsAndSubheadings.find((item) => {
        return item.url === pathname
    });
    const heading = currentHeadings?.heading;
    const subheading = currentHeadings?.subheading;

    return (
        <div className="flex w-full items-center justify-between px-6 py-4 bg-none lg:bg-white lg:shadow">
            <div className="flex flex-col gap-1 w-full pr-10 lg:pr-0">
                <span className="text-lg lg:text-2xl">{heading}</span>
                <span className="text-xs lg:text-sm text-gray-500">{subheading}</span>
            </div>
            <div className="flex items-center gap-3 px-6">
                <div className="rounded-xl cursor-pointer"><Link href="/settings">{settings}</Link></div>
                <Image
                    src="/profile.svg"
                    alt="Profile image"
                    width={40}
                    height={40}
                    priority
                />
            </div>
        </div>
    );
}

export default Header;


