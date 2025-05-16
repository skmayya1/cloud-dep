import { Toast } from '@/lib/Toast';
import { BranchResponse, RepoResponse } from '@/Types/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Button from '../Button';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../Input';
import { useDeployment } from '@/contexts/DeploymentContext';
interface NewProjectModalProps {
  onClose: () => void;
}
export const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [ReposData, setReposData] = useState<RepoResponse[] | null>(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setisOpen] = useState<number | null>(null)
  const [branches, setBranches] = useState<BranchResponse[] | null>(null)
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(branches?.[0]?.name || null);
  const { setDeployPresets, deployPreset } = useDeployment();
  useEffect(() => {
    if (branches) {
      setSelectedBranch(branches?.[0]?.name || null);
    }
  }, [branches]);
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
  useEffect(() => {
    if (isOpen) {
      fetchBranches(isOpen);
    }
  }, [isOpen]);
  const fetchBranches = async (repoid: number) => {
    setIsLoadingBranches(true);
    try {
      const repo = ReposData?.find(repo => repo.id === repoid);
      if (!repo) return;
      const res = await axios.get(`/api/repos/branches?repoName=${repo.name}&owner=${repo.owner.login}`);
      const branches = await res.data;
      setBranches(branches);
    } catch (error) {
      Toast('Failed to fetch branches', 'error');
    } finally {
      setIsLoadingBranches(false);
    }
  }
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
  const filteredRepos = ReposData
    ?.filter(repo =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);
  const SkeletonItem = () => (
    <div className='flex items-center justify-between border-b border-[#4D4D4D] p-3 py-5 w-full animate-pulse'>
      <div className="flex gap-4 items-center max-w-[80%] w-fit">
        <div className="h-4 w-32 bg-lavendar rounded"></div>
        <div className="h-3 w-16 bg-lavendar rounded"></div>
      </div>
      <div className="h-8 w-20 bg-lavendar rounded-md"></div>
    </div>
  );
  const BranchesSkeletonItem = () => (
    <div className="w-full flex items-center justify-start gap-2 flex-wrap px-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="h-7 w-24 py-1 bg-lavendar rounded-md"></div>
      ))}
    </div>
  );
  return (
    <div className='w-full max-h-[85vh] min-h-[570px] rounded-xl border bg-platinum border-[#4D4D4D] p-8 flex justify-center shadow-xl relative'>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 transition-colors"
      >
        <IoClose size={24} />
      </button>
      <div className="grid grid-cols-1 gap-6 items-center justify-center h-full w-full">
        <div className="space-y-1.5">
          <h1 className='text-2xl font-semibold text-darker'>Import Project</h1>
          <p className='text-sm text-darker'>Select a repository to deploy</p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <IoSearchOutline size={18} className='text-darker' />
          </div>
          <Input
          name='projectName'
          className='pl-10 pr-4'
          type='text'
          placeholder='Search for a repository'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
        
        <div className="h-full max-h-[60vh] w-full overflow-y-auto rounded-lg border border-[#4D4D4D] divide-y divide-[#4D4D4D]">
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
              <div key={repo.id} className='flex flex-col items-center'>
                <div className="flex items-center justify-between p-3 py-4 w-full group transition-colors">
                  <div className="flex gap-4 items-center max-w-[80%] w-fit">
                    <p className='text-sm text-darker'>{repo.name}</p>
                    <div className="font-normal text-xs text-darker">
                      {timeAgo(repo.updated_at)}
                    </div>
                  </div>
                  <Button onClick={() => {
                    setisOpen(isOpen === repo.id ? null : repo.id);
                    if (isOpen !== repo.id) {
                      setBranches(null);
                    }
                  }}>
                    {isOpen === repo.id ? 'Close' : 'Import'}
                  </Button>
                </div>
                <AnimatePresence>
                  {isOpen === repo.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0.8 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0.8 }}
                      transition={{ 
                        height: { 
                          duration: 0.3, 
                          ease: "easeInOut" 
                        },
                        opacity: { 
                          duration: 0.2 
                        }
                      }}
                      className="w-full overflow-hidden"
                    >
                      <div className="flex flex-col items-start w-full justify-start border-t border-zinc-300">
                        <div className="w-full px-4 pt-3 pb-2">
                          <p className='text-sm text-dark'>Branches</p>
                        </div>
                        
                        {isLoadingBranches ? (
                          <div className="w-full ">
                            <BranchesSkeletonItem />
                            <div className="w-full flex items-center justify-end border-t border-zinc-300 mt-3 py-2 px-4">
                              <div className="h-8 w-20 bg-lavendar rounded-md"></div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="w-full flex items-center justify-start gap-2 flex-wrap px-4">
                              {branches?.map((branch, index) => (
                                <p 
                                  key={index} 
                                  onClick={() => setSelectedBranch(branch.name)} 
                                  className={`text-sm rounded-md px-2 py-1 cursor-pointer ${selectedBranch === branch.name ? 'bg-lavendar text-darker' : 'bg-platinum text-dark'}`}
                                >
                                  {branch.name}
                                </p>
                              ))}
                            </div>
                            <div className="w-full flex items-center justify-end border-t border-zinc-300 mt-3 pt-3 px-4 pb-2">
                              <Button 
                                className='' 
                                onClick={() => {
                                  if (selectedBranch) {
                                    localStorage.setItem('Repo', JSON.stringify({
                                      Repo: {
                                        ...repo,
                                        branch: selectedBranch
                                      }
                                    }));
                                    router.push(`/dashboard/new?repo=${repo.name}&branch=${selectedBranch}`)
                                  }
                                }}
                                dark
                              >
                                deploy
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}