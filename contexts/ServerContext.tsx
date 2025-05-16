"use client";
import React, { createContext, useContext, useState } from "react";

interface Server {
  id: string;
  name: string;
  ip: string;
  status: "online" | "offline";
  specs?: {
    cpu?: string;
    ram?: string;
    storage?: string;
  };
}

interface NewServer {
    name: string;
    ApiKey:string;  
} 

// Define the context type
interface ServerContextType {
  isAddServerModalOpen: boolean;
  setIsAddServerModalOpen: (isOpen: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  NewServer: NewServer;
}

// Create the context
const ServerContext = createContext<ServerContextType | undefined>(undefined);

// Create the context provider
export function ServerProvider({ children }: { children: React.ReactNode }) {
  const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false);
  const [NewServer, setNewServer] = useState<NewServer>({
    name: "",
    ApiKey: "",
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewServer((prev) => ({
        ...prev,
        [name]: value,
        }));
    };



  return (
    <ServerContext.Provider
      value={{
        isAddServerModalOpen,
        setIsAddServerModalOpen,
        handleChange,
        NewServer,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
}

// Custom hook to use the context
export function useServer() {
  const context = useContext(ServerContext);
  if (context === undefined) {
    throw new Error("useServer must be used within a ServerProvider");
  }
  return context;
}