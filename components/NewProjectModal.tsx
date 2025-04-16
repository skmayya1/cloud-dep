import { Toast } from '@/lib/Toast';
import { RepoResponse } from '@/Types/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

interface NewProjectModalProps {
  onClose: () => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [ReposData, setReposData] = useState<RepoResponse[] | null>(null)
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    async function fetchData() { 
      const res = await axios.get('/api/repos');
      const repos = await res.data;
      if (repos.message) {
        Toast(repos.message, 'error');
      }
      setReposData(repos);
    }
    fetchData();
  }, []);
        
  function timeAgo(isoString: string): string {
    const now = new Date();
    const past = new Date(isoString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const units = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "min", seconds: 60 }
    ];

    for (const unit of units) {
        const interval = Math.floor(diffInSeconds / unit.seconds);
        if (interval >= 1) {
            return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
        }
    }
    return "just now";
  }

  const handleImport = (repo: RepoResponse) => { 
    router.push(`/deploy?s=${repo.html_url}`);
  }

  const filteredRepos = ReposData?.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SkeletonItem = () => (
    <div className='flex items-center justify-between border-b border-[#4D4D4D] p-3 py-5 w-full animate-pulse'>
      <div className="flex gap-5 items-center max-w-[80%] w-fit">
        <div className="h-4 w-32 bg-[#4D4D4D] rounded"></div>
        <div className="h-3 w-16 bg-[#4D4D4D] rounded"></div>
      </div>
      <div className="h-8 w-20 bg-[#4D4D4D] rounded-md"></div>
    </div>
  );

  return (
    <div className='w-full max-h-[85vh] min-h-[570px] rounded-xl border border-[#4D4D4D] p-8 flex justify-center shadow-xl relative'>
      <button
        onClick={onClose}
        className="absolute right-4 top-4  hover:text-[#FCFCFC] transition-colors"
      >
        <IoClose size={24} />
      </button>
      
      <div className="grid grid-cols-1 gap-6 items-center justify-center h-full w-full">
        <div className="space-y-1.5">
          <h1 className='text-2xl font-semibold text-[#FCFCFC]'>Import Project</h1>
          <p className='text-sm '>Select a repository to deploy</p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <IoSearchOutline size={20} className='text-[#6B6B6B]'/>
          </div>
          <input
            className='w-full pl-10 pr-4 py-2.5 text-sm outline-none border border-[#4D4D4D] bg-[#1C1C1C] rounded-lg text-[#FCFCFC] placeholder:text-[#6B6B6B] transition-all focus:border-[#878787] focus:ring-1 focus:ring-[#878787]'
            placeholder='Search repositories...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text" 
          />
        </div>

        <div className="h-full max-h-[60vh] w-full overflow-y-auto rounded-lg border border-[#4D4D4D] bg-[#1C1C1C] divide-y divide-[#4D4D4D]">
          {!ReposData ? (
            <>
              {[...Array(5)].map((_, i) => (
                <SkeletonItem key={i} />
              ))}
            </>
          ) : filteredRepos?.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-32 text-[#878787] text-sm'>
              <p>No repositories found</p>
            </div>
          ) : (
            filteredRepos?.map((repo) => (
              <div key={repo.id} className='flex items-center justify-between p-3 py-4 w-full group hover:bg-[#4D4D4D]/20 transition-colors'>
                <div className="flex gap-4 items-center max-w-[80%] w-fit">
                  <p className='text-sm text-[#FCFCFC]'>{repo.name}</p>
                  <div className="font-normal text-xs text-[#878787]">
                    {timeAgo(repo.updated_at)}
                  </div>
                </div>
                <button 
                  onClick={() => handleImport(repo)} 
                  className='text-sm bg-[#FCFCFC] hover:bg-white text-[#1C1C1C] px-4 py-1.5 rounded-md transition-all hover:shadow-lg hover:shadow-black/20'
                >
                  Import
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

