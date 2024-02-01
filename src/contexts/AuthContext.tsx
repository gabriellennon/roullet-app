import { TUserInfo } from "@/utils/types";
import { ReactNode, createContext, useState } from "react";

interface AuthContextProviderProps {
    children: ReactNode;
}

type AuthContextProviderType = {
    userInfo: TUserInfo | null;
    setUserInfo: (userInfo: TUserInfo | null) => void;
    setLogoutUser: () => void;
};

export const AuthContext = createContext<AuthContextProviderType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [userInfo, setUserInfo] = useState<TUserInfo | null>(null);

    const setLogoutUser = () => {
        setUserInfo(null);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo, setLogoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}
