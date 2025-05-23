"use client";
import { NewProjectModal } from '@/components/projects/NewProjectModal';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import Servers from '@/components/Servers';
import { useServer } from '@/contexts/ServerContext';
import NewServerModal from '@/components/Servers/NewServerModal';

interface IndicatorStyle {
  width: number;
  height: number;
  transform: string;
  x?: number;
}

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'servers'>('projects');
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    width: 0,
    height: 0,
    transform: '',
  });
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const session = data?.session; 
  const { isAddServerModalOpen, setIsAddServerModalOpen } = useServer();
  
  // Create refs for the tab elements
  const projectsTabRef = useRef<HTMLSpanElement>(null);
  const serversTabRef = useRef<HTMLSpanElement>(null);

  // Update indicator position whenever active tab changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeTabRef = activeTab === 'projects' ? projectsTabRef : serversTabRef;
      if (activeTabRef.current) {
        const tabElement = activeTabRef.current;
        const rect = tabElement.getBoundingClientRect();
        
        setIndicatorStyle({
          width: rect.width,
          height: rect.height,
          transform: `translateX(${tabElement.offsetLeft}px)`,
          x: tabElement.offsetLeft
        });
      }
    };
    
    // Initial update
    updateIndicator();
    
    // Also update on window resize to ensure correct positioning
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/signin");
    }
  }, [session, isPending, router]);

  if (isPending || !session) return null;

  return (
    <div className="h-full w-full max-w-[1600px] mx-auto py-4">
      <div className="py-5 flex items-center gap-5 relative">
        {/* Animated background indicator */}
        <motion.div 
          className="absolute bg-lavendar rounded-xl z-0"
          initial={false}
          animate={{
            width: indicatorStyle.width,
            height: indicatorStyle.height,
            x: indicatorStyle.x || 0
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        
        {/* Tab buttons */}
        <span
          ref={projectsTabRef}
          className={`cursor-pointer py-1 px-4 relative z-10 ${activeTab === 'projects' ? 'text-dark' : 'text-gray-600'}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </span>
        <span
          ref={serversTabRef}
          className={`cursor-pointer py-1 px-4 relative z-10 ${activeTab === 'servers' ? 'text-dark' : 'text-gray-600'}`}
          onClick={() => setActiveTab('servers')}
        >
          Servers
        </span>
      </div>

      {activeTab === 'projects' && (
        <div className='h-full w-full'>
          <div className="flex items-start justify-end mb-8">
            <Button onClick={() => setIsModalOpen(true)}>
              <IoAddOutline size={18} />
              New Project
            </Button>
          </div>
          <div className="flex h-[60%] items-center justify-center">
            <h1 className="text-lg text-dark">No projects yet</h1>
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
        <div className='h-full w-full'>
          <Servers />
          {
            isAddServerModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm w-full h-full flex items-center justify-center z-50"
                onClick={() => setIsAddServerModalOpen(false)}
              >
                <div
                  className="w-[40%] h-full flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <NewServerModal onClose={() => setIsAddServerModalOpen(false)} />
                </div>
              </motion.div>
            )
          }
        </div>
      )}
    </div>
  );
};

export default Page;