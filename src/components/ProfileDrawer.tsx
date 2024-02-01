import { Button } from "@/components/ui/button"
import UserPng from '../assets/user.png';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUserInfo } from "@/hooks/useUserInfo"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type ProfileDrawerProps = {
    children: React.ReactNode;
}

export const ProfileDrawer = ({ children }: ProfileDrawerProps) => {
    const { setUserInfo, userInfo, setLogoutUser } = useUserInfo();
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);

    const handleNavigateTo = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        setLogoutUser();
        setShowButton(true);
    }

    useEffect(() => {
        const userInfo = localStorage.getItem('@mySpin-UserInfo');

        setShowButton(userInfo ? false : true);
        if(userInfo){
            setUserInfo(JSON.parse(userInfo))
        }
    },[setUserInfo])

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    {showButton ? 'Entre na sua conta' : 'Seu Perfil'}
                </SheetTitle>
                {showButton && (
                    <SheetDescription>
                        Faça login ou crie sua conta e personalize sua roleta de prêmios da maneira que você quiser!
                    </SheetDescription>
                )}
            </SheetHeader>
            {!showButton && userInfo && (
                <div className="flex flex-col gap-4 py-4 items-center justify-center">
                    <img 
                        src={userInfo.photoURL ?? UserPng}
                        alt="Sua foto de perfil" 
                        className="rounded-full w-24 h-24 border border-[#50555A] p-[0.2px]"
                    />
                    <p className="text-center font-medium text-slate-900 text-lg">Olá, bem vindo de volta <br/><span className="font-semibold">{userInfo.displayName}</span>!</p>
                </div>
            )}
            <SheetFooter>
                <SheetClose asChild className="flex items-center justify-center w-full">
                    {showButton ? (
                        <div className="w-full pt-6">
                            <Button 
                                type="button"
                                className="bg-[#00875F]"
                                onClick={handleNavigateTo}
                            >
                                Entrar na minha conta
                            </Button>
                        </div>
                    ):(
                        <Button type="submit" onClick={handleLogout}>Sair</Button>
                    )}
                </SheetClose>
            </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}