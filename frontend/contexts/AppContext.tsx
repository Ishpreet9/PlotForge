import React, { useState } from 'react'
import { createContext } from 'react'

interface AppProviderProps{
  children: React.ReactNode;
}

interface AppContextType {
  backendUrl: string;
  storyEvents: string[],
  setStoryEvents: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const backendUrl: string = 'http://localhost:4000';
  const [storyEvents,setStoryEvents] = useState<string[]>([]);
  const values = { backendUrl, storyEvents, setStoryEvents };
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

