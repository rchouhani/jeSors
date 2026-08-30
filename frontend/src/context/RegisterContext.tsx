import React, { createContext, useContext, useState } from 'react';

type RegisterContextType = {
    progress: number;
    setProgress: (value: number) => void;
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
};

const RegisterContext = createContext<RegisterContextType | null>(null);

export const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
    const [progress, setProgress] = useState(0);
    const [isLogin, setIsLogin] = useState(true); // permet d'importer les variables là où en a besoin (exemple profile uneiquement si connecté)

    return (
        <RegisterContext.Provider value={{ progress, setProgress, isLogin, setIsLogin }}>
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = () => {
    const  context = useContext(RegisterContext);
    if (!context) throw new Error('useRegister must number used within a RegisterProvider');
    return context;
};