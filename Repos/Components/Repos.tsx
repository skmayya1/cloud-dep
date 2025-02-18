import { Toast } from '@/lib/Toast';
import { RepoResponse } from '@/Types/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";


export const Repos = () => {
  const [ReposData, setReposData] = useState<RepoResponse[] | null>(null)
  
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
        }
        , []);
        
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

// Example usage
console.log(timeAgo("2025-01-14T17:45:45Z"));

  return (
    <div className='w-[40%] max-h-full h-fit rounded-lg border border-zinc-800 p-8 bg-[#111111] flex justify-center'>
      <div className="grid grid-cols-1 gap-5 items-center justify-center h-full w-full">
        <div className="">
          <h1 className='text-2xl tracking-widest font-semibold'>Import Project</h1>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-full flex items-center justify-between px-3 border border-zinc-800 rounded-lg shadow-sm shadow-zinc-900">
            <input
              className='w-full h-full p-3 outline-none border-0 bg-transparent placeholder:text-zinc-700'
              placeholder='Search for a repository'
              type="text" />
            <IoSearchOutline size={23} className='text-zinc-500'/>
          </div>
        </div>
        <div className="h-full w-full overflow-y-auto border border-zinc-800 rounded-lg shadow-sm shadow-zinc-800">
          {ReposData ?
            ReposData.map((repo) => (
              <div key={repo.id} className='flex items-center justify-between border-b border-zinc-800 p-3 py-5 w-full'>
                    <div className="flex gap-5 items-center max-w-[80%] w-fit">
                      <p className='text-base '>{repo.name}</p>
                      <div className="font-thin text-xs text-zinc-700">
                      {timeAgo(repo.updated_at)}
                    </div>
                   </div>
                <button className='text-sm bg-zinc-300 text-zinc-950 px-3 py-2 rounded-md'>Import</button>
              </div>
            ))
            
            : <div className='flex items-center justify-center h-full py-5'>Loading...</div>
        }
        </div>
      </div>
    </div>
  )
}

