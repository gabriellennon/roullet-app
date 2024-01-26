import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

import GoogleIcon from '../assets/icongoogle.png';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="Digite sua senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              className="my-3"
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <div>Carregando</div>
            )}
            Entrar com E-mail
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground text-[#50555A] font-semibold">
            Ou entre com
          </span>
        </div>
      </div>
      <Button 
        variant="outline" 
        type="button" 
        disabled={isLoading}
        className="flex gap-3"
      >
        {isLoading ? (
          <div>icone carregando</div>
        ) : (
            <img 
              src={GoogleIcon} 
              alt="ícone de um G, logo da google" 
              className="w-4"
            />
        )}{" "}
        <p className="font-semibold text-[#50555A]">Entrar com Google</p>
      </Button>
    </div>
  )
}