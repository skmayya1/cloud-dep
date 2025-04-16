"use client";
import { NewProjectModal } from '@/components/NewProjectModal';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className='h-screen w-full p-8'> 
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-[#FCFCFC] hover:bg-white text-[#1C1C1C] rounded-md transition-all hover:shadow-lg"
          >
            <IoAddOutline size={18} />
            New Project
          </button>
        </div>

        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm w-full h-full flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div className='w-[40%] h-full flex items-center justify-center' onClick={(e) => e.stopPropagation()}>
              <NewProjectModal onClose={() => setIsModalOpen(false)} />
            </div>
          </motion.div>
        )}
    </div>
  )
}

export default Page