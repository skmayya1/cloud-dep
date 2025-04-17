import Navbar from '@/components/projects/Navbar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-h-screen w-full px-5'>
        <Navbar/>
        {children}
    </div>
  )
}

export default layout