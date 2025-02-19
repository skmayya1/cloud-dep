"use client";
import { Toast } from "@/lib/Toast";
import { RepoResponse } from "@/Types/api";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Page = () => {
  const searchParams = useSearchParams();
    const repoUrl = searchParams.get("s");

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
        if(!repoUrl) fetchData();
    }
    , [repoUrl]);
  return (
    <div className=''>
          
    </div>
  )
}

