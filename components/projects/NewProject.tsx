import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { FaGithub } from "react-icons/fa6";
import { CgGitFork } from "react-icons/cg";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

import Button from '../Button';
import { RepoResponse } from '@/Types/api';
import { useDeployment } from '@/contexts/DeploymentContext';
import DeploymentConfigModal from './DeploymentConfigModal';

interface BuildPreset {
  Preset: "NextJS" | "Custom";
}

interface DeployPreset {
  name: string;
  Repo: RepoResponse;
  BuildPreset: BuildPreset;
  RootDirectory: string;
  OutputDirectory: string;
  EnvironmentVariables: {
    key: string;
    value: string;
  }[];  
}
export interface ConfigModalProps{
  type: "Build" |"Environment"
}

const NewProject = () => {
  const [buildPresets, setBuildPresets] = useState<BuildPreset | null>({
    Preset: "NextJS"  
  });
  const [buildPresetsOpen, setBuildPresetsOpen] = useState(false);
  const [EditableDeployPreset, setEditableDeployPreset] = useState(buildPresets?.Preset!=="NextJS");
  const [ConfigModalOpen, setConfigModalOpen] = useState<ConfigModalProps | null>(null);

  const {   setDeployPresets ,deployPreset , Deploy

  } = useDeployment();



  const handleBuildPresets = (preset: BuildPreset) => {
    setBuildPresets(preset);
  }

  useEffect(() => {
    setEditableDeployPreset(buildPresets?.Preset!=="NextJS");
  }, [buildPresets]);

  return (
    <div className='w-full h-full flex max-w-[1000px] gap-10 items-center justify-center relative'>
      <h1 className='text-2xl w-full font-semibold text-darker border-b border-zinc-300 pb-3 absolute top-4 left-0'>
        New Project
      </h1>
      <form  className='w-[50%] h-full flex flex-col items-center justify-center py-10 space-y-3'>
        <div className="w-full flex py-4 px-2 border border-zinc-300 rounded-lg  shadow-inner bg-lavendar  gap-3">
          <div className='flex items-center gap-2'>
            <FaGithub size={18} />
            <div className="flex gap-0.5 font-semibold text-sm">
              <p>{deployPreset?.Repo?.owner.login}</p>
              <p>/</p>
              <p>{deployPreset?.Repo?.name}</p>
            </div>
          </div>
          <div className='flex items-center'>
            <CgGitFork size={17} color='gray' />
            <h1 className='text-sm font-medium text-zinc-600'>{deployPreset?.Repo?.branch || deployPreset?.Repo.default_branch}</h1>
          </div>
        </div>
        <Input
            label='Project Name'
            name='projectName'
            type='text'
            placeholder='Enter project name'
            value={deployPreset?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
              if (deployPreset) {
                setDeployPresets({
                  ...deployPreset,
                  name:e.target.value
                });
              }
            }}
        />

          <div className="relative flex w-full h-fit items-center flex-col transition-all duration-300 ease-in-out gap-2 border border-zinc-400 rounded-lg px-4  py-3.5" onClick={() => setBuildPresetsOpen(!buildPresetsOpen)}>
            <div className="flex items-center gap-2 w-full justify-between">
              <p>Build Presets :</p>
              <div className="flex items-center gap-2">
                <div onClick={() => {{
                  if(deployPreset){
                    setDeployPresets({
                      ...deployPreset,
                      BuildPreset: { Preset: "NextJS" }
                    })                  
                  }
                }}} className={`py-1 cursor-pointer px-2 bg-lavendar rounded-md ${deployPreset?.BuildPreset?.Preset === "NextJS" ? "bg-lavendar" : "bg-transparent"}`}>
                  <p className='text-sm font-medium text-darker'>NextJS</p>
                </div>
                <div onClick={() => {
                  if(deployPreset){
                    setDeployPresets({
                      ...deployPreset,
                      BuildPreset: { Preset: "Custom" }
                    })                  
                  }
                }} className={`py-1 cursor-pointer px-2 bg-lavendar rounded-md ${deployPreset?.BuildPreset?.Preset === "Custom" ? "bg-lavendar" : "bg-transparent"}`}>
                  <p className='text-sm font-medium text-darker'>Custom</p>
                </div>
              </div>
            </div>
          </div>
          <Input
          label='Root Directory'
          name='rootDirectory'
          type='text'
          className='tracking-widest'
          placeholder='Enter root directory'
          value={deployPreset?.RootDirectory}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (deployPreset) {
              setDeployPresets({
                ...deployPreset,
                RootDirectory: e.target.value,
              });
            }
          }}
        />

          <div onClick={() => setConfigModalOpen(ConfigModalOpen?.type == "Build" ? null : {type: "Build"})} className="flex w-full items-center justify-between gap-2 border border-zinc-400 rounded-lg px-4 py-1.5">
            <p className='text-base py-2 font-medium text-darker self-start '>Build & Output</p>
            <BsArrowUpRightSquareFill size={18} color='#5AB1BB' />
          </div>
          <div onClick={() => setConfigModalOpen(ConfigModalOpen?.type == "Environment" ? null : {type: "Environment"})} className="flex w-full items-center justify-between gap-2 border border-zinc-400 rounded-lg px-4  py-1.5">
            <p className='text-base py-2 font-medium text-darker self-start '>Environment Variables</p>
            <BsArrowUpRightSquareFill size={18} color='#5AB1BB' />
        </div>
        <Button
          onClick={Deploy}
          className='w-full py-4 flex items-center justify-center text-base font-medium'
          dark
          >
          Deploy
        </Button>
      </form>
      {ConfigModalOpen && 
       <div className="w-[50%] h-[60%]">
        <DeploymentConfigModal type={ConfigModalOpen.type} />
       </div>
      }
    </div>
  )
}

export default NewProject