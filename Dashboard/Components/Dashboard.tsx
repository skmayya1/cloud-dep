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

      <div className="w-[70%] h-[70%] rounded-lg  flex items-start justify-around">
      <Repos />
      </div>
    </div>
  )
}

export default Dashboard 