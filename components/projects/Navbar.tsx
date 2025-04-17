"use client"
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import {  usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import BreadCrumbs from './BreadCrumbs';


const Navbar = () => {
    const { data, isPending } = authClient.useSession();
    const session = data?.session;
    if (isPending || !session) return null;


    return (
        <div className='h-full w-full max-w-[1600px] mx-auto border-b border-zinc-300 flex items-center justify-center'>
            <div className="flex items-center justify-between w-full h-full">
                <div className="text-md tracking-wide font-semibold h-full flex items-center gap-4">
                    <p className='text-dark pr-5 h-full border-r border-zinc-300 flex items-center'>CloudDepo</p>
                    <div className="text-sm text-dark font-medium">
                        <BreadCrumbs />
                    </div>
                </div>


                <div className="flex items-center gap-4 h-full border-l border-zinc-300 pl-5">
                    <p className='text-xs text-dark font-semibold'>
                        {data.user.name}
                    </p>
                    <div className="h-8 w-8 rounded-full flex items-center justify-center overflow-hidden object-cover border border-zinc-300">
                        <Image src={data.user.image as string} alt="user" width={32} height={32} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar