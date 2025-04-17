import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { GrProjects } from "react-icons/gr";


const BreadCrumbs = () => {
    const pathname = usePathname(); 
    const path = pathname.split('/').filter(Boolean);
    const router = useRouter();
    return (
    <div className='flex items-center gap-2'>
        <GrProjects className='text-zinc-500' size={13} />
        {path.map((p, index) => (   
            <div key={index} className='flex items-center gap-2'>
                <div 
                 onClick={()=>{
                    if(index !== path.length - 1){
                        router.push(`/${p}`);
                    }
                 }}
                className={`text-xs uppercase cursor-pointer ${index !== path.length - 1 ? 'text-zinc-500' : 'text-dark'}`}>{p}</div>
                {index !== path.length - 1 && <IoChevronForwardOutline className='text-zinc-500' />}
            </div>
        ))}
    </div>
  )
}

export default BreadCrumbs