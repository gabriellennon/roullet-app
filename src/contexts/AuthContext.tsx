import { TUserInfo } from "@/utils/types";
import { ReactNode, createContext, useState } from "react";

interface AuthContextProviderProps {
    children: ReactNode;
}

type AuthContextProviderType = {
    userInfo: TUserInfo | null;
    isLogged: boolean;
    setUserInfo: (userInfo: TUserInfo | null) => void;
    setLogoutUser: () => void;
    setIsLogged: (islogged: boolean) => void;
};

export const AuthContext = createContext<AuthContextProviderType | null>(null);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [userInfo, setUserInfo] = useState<TUserInfo | null>(null);
    const [isLogged, setIsLogged] = useState(false);

    const setLogoutUser = () => {
        setUserInfo(null);
        setIsLogged(false);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ userInfo, isLogged, setUserInfo, setLogoutUser, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    )
}
