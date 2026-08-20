import React, { createContext, useContext, useState } from 'react';

type RegisterContextType = {
    progress: number;
    setProgress: (value: number) => void;
};

const RegisterContext = createContext<RegisterContextType | null>(null);

export const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
    const [progress, setProgress] = useState(0);

    return (
        <RegisterContext.Provider value={{ progress, setProgress }}>
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = () => {
    const  context = useContext(RegisterContext);
    if (!context) throw new Error('useRegister must number used within a RegisterProvider');
    return context;
};