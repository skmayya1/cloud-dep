"use client";
import Dashboard from '@/Dashboard/Components/Dashboard';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {
    //Session
    const router = useRouter();
    const { data, isPending } = authClient.useSession();
    const session = data?.session;
    useEffect(() => { 
        if(!isPending && !session) {
            router.push("/auth/signin")
        }
    }, [session, isPending, router]);
    if (isPending || !session) return null;
    

  return (
    <div className='h-screen w-full bg-black text-[#F7F7FF] '> 
        <Dashboard />
    </div>
  )
}

export default Page