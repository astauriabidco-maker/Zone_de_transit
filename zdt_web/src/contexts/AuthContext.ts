// src/contexts/AuthContext.ts
import { createContext } from 'react';

export interface User {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
