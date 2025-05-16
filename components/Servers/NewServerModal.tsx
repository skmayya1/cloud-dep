import React from 'react'
import { IoClose } from 'react-icons/io5';
import Input from '../Input';
import { useServer } from '@/contexts/ServerContext';
import Button from '../Button';
import { Toast } from '@/lib/Toast';

interface NewServerModalProps {
    onClose: () => void;
}

const RenderIcon = () => {
    return (
        <svg
            fill="currentColor"
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black dark:text-white"
        >
            <path
                d="m17.1491 1.50583c-2.6812-.1262-4.9358 1.81264-5.3205 4.36717-.0152.11854-.0381.23327-.0571.34799-.5979 3.18169-3.38195 5.59091-6.7258 5.59091-1.19206 0-2.31175-.3059-3.28672-.8413-.11807-.065-.25898.0191-.25898.1529v.6846 10.3137h10.2677v-7.7324c0-1.4226 1.1501-2.5775 2.5669-2.5775h2.5669c2.9059 0 5.2443-2.42069 5.13-5.36528-.1028-2.65013-2.2431-4.8146-4.8824-4.94079z"
            />
        </svg>
    );
}

const NewServerModal: React.FC<NewServerModalProps> = ({
    onClose
}) => {
    const { NewServer, handleChange } = useServer();
    return (
        <div className='w-full h-fit  rounded-xl border bg-platinum border-[#4D4D4D] p-3 py-14 flex justify-center shadow-xl relative'>
            <button
                onClick={onClose}
                className="absolute right-7 top-4 transition-colors"
            >
                <IoClose size={24} />
            </button>
            <div className="w-full h-full flex flex-col items-center justify-start px-4 gap-6">
                <h1 className='flex self-start w-full border-t border-zinc-300 py-2  text-lg'>Add server</h1>
                <div className="w-full h-fit flex flex-col items-start gap-6 justify-start ">
                    <p className='text-sm text-zinc-600 select-none'>Select Provider</p>
                    <div className="flex gap-5 px-5">
                        <div className="bg-black text-white flex gap-3 rounded-lg p-5 border-4 border-blue">
                            <RenderIcon />
                            Render
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col items-start gap-6 justify-start ">
                    <Input
                        name='name'
                        placeholder='render-01'
                        type='text'
                        value={NewServer.name}
                        label='label / nickname'
                        onChange={handleChange}
                    />
                    <div className="w-full flex flex-col gap-2">
                    <Input
                        name='ApiKey'
                        placeholder='API Key'
                        type='text'
                        value={NewServer.ApiKey}
                        label='API Key'
                        onChange={handleChange}
                    />
                    <p className='text-xs text-zinc-600'>*will be encrypted</p>
                    </div>
                </div>
                <Button
                 dark
                 onClick={() => {
                    if (NewServer.ApiKey && NewServer.name) {
                        Toast('Adding server...', 'loading')
                        onClose()
                    } else {
                        NewServer.ApiKey && NewServer.name ? '' :  Toast('Please fill all fields', 'error')
                    }
                 }}
                 className='w-full h-fit items-center justify-center py-4 font-semibold'
                >
                    Add
                </Button>
            </div>


        </div>
    )
}

export default NewServerModal