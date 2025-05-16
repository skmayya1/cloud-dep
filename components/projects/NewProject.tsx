import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { FaGithub } from "react-icons/fa6";
import { CgGitFork } from "react-icons/cg";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isAnimating, setIsAnimating] = useState(false);

  const {   setDeployPresets ,deployPreset , Deploy
  } = useDeployment();

  useEffect(() => {
    setEditableDeployPreset(buildPresets?.Preset!=="NextJS");
  }, [buildPresets]);

  const modalVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };

  const handleConfigModalToggle = (type: "Build" | "Environment") => {
    if (ConfigModalOpen?.type === type) {
      setConfigModalOpen(null);
    } else {
      setConfigModalOpen(null);
      setTimeout(() => {
        setConfigModalOpen({ type });
      }, 300);
    }
  };

  return (
    <div className='w-full h-full flex max-w-[1000px] gap-10 items-center justify-center relative'>
      <h1 className='text-2xl w-full font-semibold text-darker border-b border-zinc-300 pb-3 absolute top-4 left-0'>
        New Project
      </h1>
      <div  className='w-[50%] h-full flex flex-col items-center justify-center py-10 space-y-3'>
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
            <h1 className='text-sm font-medium text-zinc-600'>{deployPreset?.Repo?.branch || deployPreset?.Repo?.default_branch}</h1>
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
         
          <div onClick={() => handleConfigModalToggle("Build")} 
               className="flex w-full items-center justify-between gap-2 border border-zinc-400 rounded-lg px-4 py-1.5">
            <p className='text-base py-2 font-medium text-darker self-start'>Build & Output</p>
            <motion.div 
              animate={{ rotate: ConfigModalOpen?.type === "Build" ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <IoMdArrowDropdown size={18} />
            </motion.div>
          </div>

          <AnimatePresence>
            {ConfigModalOpen?.type === "Build" && (
              <motion.div 
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full h-fit flex items-center justify-center overflow-hidden"
              >
                <DeploymentConfigModal type={ConfigModalOpen.type} />
              </motion.div>
            )}
          </AnimatePresence>

          <div onClick={() => handleConfigModalToggle("Environment")} 
               className="flex w-full items-center justify-between gap-2 border border-zinc-400 rounded-lg px-4 py-1.5">
            <p className='text-base py-2 font-medium text-darker self-start'>Environment Variables</p>
            <motion.div 
              animate={{ rotate: ConfigModalOpen?.type === "Environment" ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <IoMdArrowDropdown size={18} />
            </motion.div>
          </div>

          <AnimatePresence>
            {ConfigModalOpen?.type === "Environment" && (
              <motion.div 
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full h-fit flex items-center justify-center overflow-hidden"
              >
                <DeploymentConfigModal type={ConfigModalOpen.type} />
              </motion.div>
            )}
          </AnimatePresence>

        <Button
          onClick={Deploy}
          className='w-full py-4 flex items-center justify-center text-base font-medium'
          dark
          >
          Deploy
        </Button>
      </div>

    </div>
  )
}

export default NewProject