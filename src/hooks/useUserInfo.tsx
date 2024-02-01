import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export const useUserInfo = () => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useUserInfo deve ser usado dentro de UserInfoProvider');
    }
  
    return context;
};