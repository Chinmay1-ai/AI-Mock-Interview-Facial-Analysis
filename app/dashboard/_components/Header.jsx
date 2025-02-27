"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [path]); // ✅ Fixed: Now runs on path change

    return (
        <div className='flex p-2 items-center justify-between bg-secondary shadow-md'>
            <Image src={'/logo.svg'} width={160} height={100} alt='logo' />

            <ul className='hidden md:flex gap-6'>
                <li>
                    <Link href="/dashboard" 
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                        ${path === '/dashboard' && 'text-primary font-bold'}`}>
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link href="/dashboard/ContactUs"
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                        ${path === '/dashboard/ContactUs' && 'text-primary font-bold'}`}>
                        Contact Us
                    </Link>
                </li>

                <li>
                    <Link href="/dashboard/planData"
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                        ${path === '/dashboard/planData' && 'text-primary font-bold'}`}>
                        Upgrade
                    </Link>
                </li>

                <li>
                    <Link href="/dashboard/how"
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                        ${path === '/dashboard/how' && 'text-primary font-bold'}`}>
                        How it Works?
                    </Link>
                </li>
            </ul>

            <UserButton />
        </div>
    )
}

export default Header;
