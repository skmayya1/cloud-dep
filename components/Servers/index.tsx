import React from 'react'
import { IoAddOutline } from 'react-icons/io5'
import Button from '../Button'
import { useServer } from '@/contexts/ServerContext';

const Servers = () => {
  const { setIsAddServerModalOpen } = useServer();

  return (
      <div className='h-full w-full flex items-start justify-start gap-10'>
        <div className="flex  w-full items-start justify-end mb-8">
          <Button onClick={() => {setIsAddServerModalOpen(true) }} dark>
            <IoAddOutline size={18} />
            Add server
          </Button>
        </div>
      </div>
  )
}

export default Servers