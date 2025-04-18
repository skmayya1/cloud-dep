import React, { useState } from 'react'
import { ConfigModalProps } from './NewProject'
import Input from '../Input'
import { useDeployment } from '@/contexts/DeploymentContext'
import { FiPlus, FiEye, FiEyeOff } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const DeploymentConfigModal = ({ type }: ConfigModalProps) => {
    const { deployPreset, setDeployPresets } = useDeployment();
    const [showPasswords, setShowPasswords] = useState<{ [key: number]: boolean }>({});
    
    const togglePasswordVisibility = (index: number) => {
        setShowPasswords(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleAddEnvVariable = () => {
        if (deployPreset) {
            setDeployPresets({
                ...deployPreset,
                EnvironmentVariables: [
                    ...deployPreset.EnvironmentVariables,
                    { key: '', value: '' }
                ]
            });
        }
    };

    const handleRemoveEnvVariable = (index: number) => {
        if (deployPreset) {
            const newEnvVars = [...deployPreset.EnvironmentVariables];
            newEnvVars.splice(index, 1);
            setDeployPresets({
                ...deployPreset,
                EnvironmentVariables: newEnvVars
            });
        }
    };

    const handleEnvVariableChange = (index: number, field: 'key' | 'value', value: string) => {
        if (deployPreset) {
            const newEnvVars = [...deployPreset.EnvironmentVariables];
            newEnvVars[index] = {
                ...newEnvVars[index],
                [field]: value
            };
            setDeployPresets({
                ...deployPreset,
                EnvironmentVariables: newEnvVars
            });
        }
    };

    return (
        <div className='w-full h-fit flex items-center justify-center'>
            {type === "Build" && (
                <div className="w-full h-full flex flex-col items-center justify-end  space-y-4">
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
                <div className="w-full h-full flex flex-col items-center justify-end space-y-4">
                    <div className="w-full h-fit max-h-[200px] overflow-auto flex flex-col gap-4 pr-2 scrollbar-hide">
                        <style jsx global>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                            .scrollbar-hide {
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }
                        `}</style>
                        {deployPreset?.EnvironmentVariables.map((envVar, index) => (
                            <div key={index} className="w-full flex items-end gap-2">
                                <div className="flex-1">
                                    <Input
                                        name={`env-key-${index}`}
                                        type="text"
                                        label={index === 0 ? 'Key' : ''}
                                        placeholder="KEY"
                                        value={envVar.key}
                                        onChange={(e) => handleEnvVariableChange(index, 'key', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1 relative">
                                    <Input
                                        name={`env-value-${index}`}
                                        type={showPasswords[index] ? "text" : "password"}
                                        label={index === 0 ? 'Value' : ''}
                                        placeholder="VALUE"
                                        value={envVar.value}
                                        onChange={(e) => handleEnvVariableChange(index, 'value', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility(index)}
                                        className="absolute right-3 top-[70%] transform -translate-y-1/2 text-zinc-600 hover:text-zinc-800 transition-colors"
                                    >
                                        {showPasswords[index] ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleRemoveEnvVariable(index)}
                                    className="w-fit p-2 py-3 border border-zinc-400 rounded-md text-sm hover:bg-zinc-200 flex items-center transition-colors"
                                >
                                    <RiDeleteBinLine size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleAddEnvVariable}
                        className="w-fit py-2 px-4 border self-start border-zinc-400 rounded-lg text-sm hover:bg-zinc-200 flex items-center gap-2 transition-colors"
                    >
                        <FiPlus size={20} /> Add
                    </button>
                </div>
            )}
        </div>
    )
}

export default DeploymentConfigModal