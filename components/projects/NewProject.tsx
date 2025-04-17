import React from 'react'
import Input from '../Input'
import { FaGithub } from "react-icons/fa6";
import { CgGitFork } from "react-icons/cg";
import { BsArrowUpRightSquareFill } from "react-icons/bs";

interface NewProjectProps {
  RepoDetails: {
    name: string;
    owner: string;
    branch: string;
    url: string;
    updated_at: string;
  }

}

const NewProject = ({ RepoDetails }: NewProjectProps) => {
  return (
    <div className='w-full h-full flex flex-col py-10 max-w-[1000px] items-center justify-center'>
      <h1 className='text-2xl w-full font-semibold text-darker border-b border-zinc-300 pb-3'>
        New Project
      </h1>
      <form className='w-[50%] h-full flex flex-col items-center justify-center py-10 space-y-3'>
        <div className="w-full flex py-4 px-2 border border-zinc-300 rounded-lg  shadow-inner bg-lavendar  gap-3">
          <div className='flex items-center gap-2'>
            <FaGithub size={18} />
            <div className="flex gap-0.5 font-semibold text-sm">
              <p>{RepoDetails.owner}</p>
              <p>/</p>
              <p>{RepoDetails.name}</p>
            </div>
          </div>
          <div className='flex items-center'>
            <CgGitFork size={17} color='gray' />
            <h1 className='text-sm font-medium text-zinc-600'>{RepoDetails.branch}</h1>
          </div>
        </div>
        <Input
          label='Project Name'
          name='projectName'
          type='text'
          placeholder='Enter project name'
          value={"dsd"}
          onChange={() => { }}
        />
        <Input
          label='Root Directory'
          name='rootDirectory'
          type='text'
          className='tracking-widest'
          placeholder='Enter root directory'
          value={"./"}
          onChange={() => { }}
        />

        <div className="w-full">
          <div className="flex w-full items-center justify-between gap-2 border border-zinc-400 rounded-lg px-2">
            <p className='text-base py-2 font-medium text-darker self-start '>Build & Output</p>
            <BsArrowUpRightSquareFill size={18} color='#5AB1BB' />
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewProject