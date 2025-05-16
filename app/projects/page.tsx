"use client";
import { NewProjectModal } from '@/components/projects/NewProjectModal';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import Servers from '@/components/Servers';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'servers'>('projects'); // State for toggling
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const session = data?.session;

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/signin");
    }
  }, [session, isPending, router]);

  if (isPending || !session) return null;

  return (
    <div className="h-full w-full max-w-[1600px] mx-auto py-4">
      <div className="py-5 flex items-center gap-5">
        <span
          className={`cursor-pointer py-1 px-4 ${activeTab === 'projects' ? ' rounded-xl bg-lavendar' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </span>
        <span
          className={`cursor-pointer py-1 px-4 ${activeTab === 'servers' ? ' rounded-xl bg-lavendar' : ''}`}
          onClick={() => setActiveTab('servers')}
        >
          Servers
        </span>
      </div>

      {activeTab === 'projects' && (
        <div>
          <div className="flex min-h-[45%] items-start justify-between mb-8">
            <h1 className="text-2xl font-semibold">Projects</h1>
            <Button onClick={() => setIsModalOpen(true)}>
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
              <div
                className="w-[40%] h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <NewProjectModal onClose={() => setIsModalOpen(false)} />
              </div>
            </motion.div>
          )}
        </div>
      )}

      {activeTab === 'servers' && (
        <div>
          <h1 className="text-2xl font-semibold">Servers</h1>
          <Servers />
        </div>
      )}
    </div>
  );
};

export default Page;