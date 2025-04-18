"use client";
import { RepoResponse } from "@/Types/api";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  commands:{
    build: string;
    install: string;
  }
  output: string;
}

interface DeploymentContextType {
  selectedRepo: RepoResponse | null;
  setSelectedRepo: (repo: RepoResponse | null) => void;
  deployPreset: DeployPreset | null;
  setDeployPresets: (preset: DeployPreset | null) => void;
  buildPreset: BuildPreset;
  setBuildPreset: (preset: BuildPreset) => void;
  isEditablePreset: boolean;
  setIsEditablePreset: (isEditable: boolean) => void;
  Deploy: () => void;
}

const DeploymentContext = createContext<DeploymentContextType | undefined>(undefined);

export function DeploymentProvider({ children }: { children: React.ReactNode }) {
  const [selectedRepo, setSelectedRepo] = useState<RepoResponse | null>(null);
  const [deployPreset, setDeployPreset] = useState<DeployPreset | null>(null);
  const [buildPreset, setBuildPreset] = useState<BuildPreset>({ Preset: "NextJS" });
  const [isEditablePreset, setIsEditablePreset] = useState(false);
  
  const Deploy = () =>{
    console.log(deployPreset);
  } 

  useEffect(() => {
    const repo = localStorage.getItem('Repo');
    if (repo) {
      setDeployPreset({
        name: '',
        Repo: JSON.parse(repo).Repo,
        BuildPreset: { Preset: "NextJS" },
        RootDirectory: "./",
        OutputDirectory: "",
        EnvironmentVariables: [{
          key:"",
          value:""
        }],
        commands: NextJSBuildPreset,
        output: ".next"
      });
    }
  }, []);

  const setDeployPresets = (preset: DeployPreset | null) => {
    setDeployPreset(preset);
  }

  const NextJSBuildPreset: DeployPreset = {
    RootDirectory: "./",
    OutputDirectory: ".next",
    EnvironmentVariables: [],
    commands: {
      build: "npm run build",
      install: "npm install"
    },
    output: ".next"
    
  }
  return (
    <DeploymentContext.Provider
      value={{
        selectedRepo,
        setSelectedRepo,
        deployPreset,
        setDeployPresets,
        buildPreset,
        setBuildPreset,
        isEditablePreset,
        setIsEditablePreset,
        Deploy
      }}
    >
      {children}
    </DeploymentContext.Provider>
  );
}

export function useDeployment() {
  const context = useContext(DeploymentContext);
  if (context === undefined) {
    throw new Error("useDeployment must be used within a DeploymentProvider");
  }
  return context;
}
