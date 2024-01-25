import { Settings, User } from "lucide-react"
import { Button } from "./ui/button"
import { SheetTrigger } from "./ui/sheet"
import { ButtonIcon } from "./ButtonIcon"

export const HeaderSheet = () => {
    return (
        <div className='bg-[#202024] rounded-3xl px-[18px] py-[10px] flex items-center justify-center gap-4 mt-4'>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className='transition ease-in-out delay-150 bg-transparent border-none hover:bg-transparent hover:opacity-75'>
                    <Settings color='#E1E1E6'/>
                </Button>
            </SheetTrigger>
            <ButtonIcon title='profile'>
                <User color='#E1E1E6' />
            </ButtonIcon>
        </div>
    )
}