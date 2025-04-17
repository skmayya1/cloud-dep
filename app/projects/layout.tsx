import Navbar from '@/components/projects/Navbar'
import { DeploymentProvider } from '@/contexts/DeploymentContext'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DeploymentProvider>
    <div className='max-h-screen h-screen w-full px-5 overflow-hidden'>
       <div className="h-[7%] w-full">
        <Navbar/>
       </div>
       <div className="h-[93%] w-full">
       {children}
       </div>
    </div>
    </DeploymentProvider>
  )
}

export default layout