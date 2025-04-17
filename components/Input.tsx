import React from 'react'

interface InputProps{
    label?: string;
    name: string;
    type: string;
    placeholder: string;
    value: string | undefined;
    className?: string;
    width?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({label, name, type, placeholder, value, className, width, onChange}: InputProps) => {
  return <div className={`w-full flex justify-center flex-col gap-1 ${width}`}>
    <label htmlFor={name} className='text-sm text-zinc-600 select-none'>{label}</label>
    <input 
    type={type} 
    name={name} 
    id={name} 
    placeholder={placeholder} value={value} 
    className={`w-full h-full px-4 py-2.5 text-sm outline-none border border-[#4D4D4D] bg-platinum rounded-lg text-dark placeholder:text-[#6B6B6B] transition-all focus:border-[#878787] focus:ring-1 focus:ring-[#878787] ${className}`}
    onChange={onChange}
    />  
  </div>
}

export default Input