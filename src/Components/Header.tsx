import { settings } from '@/assets/common-icons';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface HeaderProps {
    heading: string;
    subheading: string;
}

function Header({ heading, subheading }: HeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row w-full justify-between items-center lg:text-start text-center lg:items-start gap-4 sm:gap-0 p-4">
            <div className="flex flex-col gap-1">
                <div className="lg:text-3xl text-2xl text-black">{heading}</div>
                <div className="text-md text-gray-600">{subheading}</div>
            </div>
            <div className="flex items-center gap-3">
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
