"use client";
import { authClient } from '@/lib/auth-client';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaGithub } from "react-icons/fa";


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
      <div className='h-screen w-full bg-[#0a0a0a] text-white flex items-center justify-center'>
        <div className="h-[25%] w-[30%] flex items-center flex-col justify-center gap-10">
          <h1 className='text-3xl'>Sign In to Tannva</h1>
        <button
        className='border flex items-center justify-center gap-5 text-zinc-400 rounded-3xl border-[#353535] p-4  text-xl tracking-wide w-[90%] hover:bg-[#252525] transition-all duration-150 ease-in-out'
        onClick={async () => {
              toast.promise(
                  async () => { 
                  await authClient.signIn.social({
                    provider: "github",
                    callbackURL: "/dashboard"
                })}
                , {
                    loading: "Authenticating...",
                    success: "Signed in successfully",
                    error: "Something went wrong"
                 })
          }}>
            <FaGithub size={22}/>  Sign in with github 
          </button>
          <p className='text-xs ffonnt-thin text-zinc-600'>By continuing, you agree to Tannva's Terms of Service, Privacy Policy and Data Privacy Agreement</p>
        </div>
    </div>
  ) 
}

export default Page