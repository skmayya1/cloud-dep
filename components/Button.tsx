import React from 'react'

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  dark?: boolean;
  
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled, dark }) => {
    const buttonClass = dark ? "bg-dark text-platinum hover:bg-darker" : "bg-light text-darker hover:bg-light/50";
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 text-sm  rounded-lg ${buttonClass} ${className}`} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button