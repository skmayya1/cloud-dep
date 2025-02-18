"use client";
import { authClient } from '@/lib/auth-client';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const Page = () => {
  const router = useRouter();
    const { data, isPending } = authClient.useSession();
    const session = data?.session;
    
    useEffect(() => {
    if (!isPending && session) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending || (session && session)) return null;

  return (
      <div className='h-screen w-full'>
          <button onClick={async () => {
              toast.promise(
                  async () => { 
                  await authClient.signIn.social({
                    provider: "github",
                })}
                , {
                    loading: "Authenticating...",
                    success: "Signed in successfully",
                    error: "Something went wrong"
                 })
          }}>
              Sign In With Github 
          </button>
    </div>
  ) 
}

export default Page