import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
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
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type ProfileDrawerProps = {
    children: React.ReactNode;
}

export const ProfileDrawer = ({ children }: ProfileDrawerProps) => {
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);

    const handleNavigateTo = () => {
        navigate('/login');
    }

    useEffect(() => {
        const userInfo = localStorage.getItem('@mySpin-UserInfo');
        setShowButton(userInfo ? false : true);
    },[])

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
            {!showButton && (
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                    </div>
                </div>
            )}
            <SheetFooter>
                <SheetClose asChild>
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
                        <Button type="submit">Save changes</Button>
                    )}
                </SheetClose>
            </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}