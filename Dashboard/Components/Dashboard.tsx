import { authClient } from '@/lib/auth-client';
import { Repos } from '@/Repos/Components/Repos';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Dashboard = () => {

        const router = useRouter();
        const { data, isPending } = authClient.useSession();
        const session = data?.session;
  
        useEffect(() => {
          if (!session && !isPending) {
            router.push('/auth/signin');
          }
        }, [session, isPending, router]);
        
  return (
    <div className='h-full w-full flex items-center text-zinc-300 justify-evenly'>

      <div className="w-[80%] h-[70%] rounded-lg  flex items-start justify-around">
        <Repos />
        <div className='w-[50%] h-full rounded-lg border border-zinc-800 p-8 bg-[#111111] flex justify-center'>
          <div className="w-full h-[10%]  items-center p-5 grid grid-cols-1 gap-5">
            <h1 className='text-xl font-bold tracking-wider'>Projects</h1>
            <div className="w-full h-full  px-10 py-20 items-center flex justify-center">
              <p className='font-thin text-zinc-600'>Nothing to show here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 