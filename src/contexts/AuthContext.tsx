import { TUserInfo } from "@/utils/types";
import { ReactNode, createContext, useState } from "react";

interface AuthContextProviderProps {
    children: ReactNode;
}

type AuthContextProviderType = {
    userInfo: TUserInfo | null;
    setUserInfo: (userInfo: TUserInfo | null) => void;
};

export const AuthContext = createContext<AuthContextProviderType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [userInfo, setUserInfo] = useState<TUserInfo | null>(null);

    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}
