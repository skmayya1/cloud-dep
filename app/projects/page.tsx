"use client";
import { NewProjectModal } from '@/components/projects/NewProjectModal';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
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
    <div className='h-full w-full max-w-[1600px] mx-auto py-8'> 
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <Button onClick={() => setIsModalOpen(true)} >
            <IoAddOutline size={18} />
            New Project
          </Button>
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