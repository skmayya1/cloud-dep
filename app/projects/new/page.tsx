"use client"
import NewProject from '@/components/projects/NewProject';
import React from 'react'

const page = () => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <NewProject
       RepoDetails={
        {
          branch:"master",
          name:"atsend",
          owner:"Skmayya",
          url:"Test",
          updated_at: new Date().toISOString()
        }
      }
      />
    </div>
  )
}

export default page

//New Project Page
//Importing from github
//name
//presets nextjs and custom
//root dir
//build settings
//environmenrt
//Deploy button
