import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ProgressContextType {
    matchPerSlider: number[];
    overallMatch: number;
    setProgressData: (match: number[], overall: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function useProgressContext() {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgressContext must be used within a ProgressProvider');
    }
    return context;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
    const [matchPerSlider, setMatchPerSlider] = useState<number[]>([]);
    const [overallMatch, setOverallMatch] = useState<number>(0);

    const setProgressData = (match: number[], overall: number) => {
        setMatchPerSlider(match);
        setOverallMatch(overall);
    };

    return (
        <ProgressContext.Provider value={{ matchPerSlider, overallMatch, setProgressData }}>
            {children}
        </ProgressContext.Provider>
    );
}
