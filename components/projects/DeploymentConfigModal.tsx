import React from 'react'
import { ConfigModalProps } from './NewProject'
import Input from '../Input'
import { useDeployment } from '@/contexts/DeploymentContext'

const DeploymentConfigModal = ({ type }: ConfigModalProps) => {
    const { deployPreset, setDeployPresets } = useDeployment();
    return (
        <div className='w-full h-full border-l border-zinc-300 flex items-center justify-center px-10'>
            {type === "Build" && (
                <div className="w-full h-full flex flex-col items-center justify-start py-10 space-y-4">
                    <Input
                        name="Build"
                        type="text"
                        label='Build Command'
                        placeholder="npm run build"
                        value={deployPreset?.commands.build}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if(deployPreset){
                        setDeployPresets({
                            ...deployPreset,
                            commands:{
                                ...deployPreset?.commands,
                                build: e.target.value
                            }
                            })
                        }
                    }}
                />
                <Input
                        name="Install"
                        type="text"
                        label='Install Command'
                        placeholder="npm install"
                        value={deployPreset?.commands.install}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if(deployPreset){
                                setDeployPresets({
                                    ...deployPreset,
                                    commands:{
                                        ...deployPreset?.commands,
                                        install: e.target.value
                                    }
                                })
                            }
                        }}
                    />
                    <Input
                        name="Output"
                        type="text"
                        label='Output Directory'
                        placeholder="./dist"
                        value={deployPreset?.output}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if(deployPreset){
                                setDeployPresets({
                                    ...deployPreset,
                                    output: e.target.value
                                })
                            }
                        }}
                    />
                </div>
            )}
            {type === "Environment" && (
                <div className='w-full h-full flex flex-col items-center justify-center py-10 space-y-3'>
                    <h1>Environment</h1>
                </div>
            )}
        </div>
    )
}

export default DeploymentConfigModal