import { HTMLAttributes, ReactNode } from "react";

type TButtonProps = {
    children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

export const ButtonIcon = ({ children }: TButtonProps) => {
    return (
        <button 
          className='transition ease-in-out delay-150 border-none bg-transparent hover:opacity-75'
        >
          {children}
        </button>
    )
}