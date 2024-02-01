import { Settings, User } from "lucide-react"
import { Button } from "./ui/button"
import { SheetTrigger } from "./ui/sheet"
import { ProfileDrawer } from "./ProfileDrawer"

export const HeaderSheet = () => {

    return (
        <div className='bg-[#202024] rounded-3xl px-[18px] py-[10px] flex items-center justify-center gap-4 mt-4'>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className='transition ease-in-out delay-150 bg-transparent border-none hover:bg-transparent hover:opacity-75'>
                    <Settings color='#E1E1E6'/>
                </Button>
            </SheetTrigger>
            {/* @TO-DO: fazer validacao se já estiver logado ir para tela de meu perfil */}
            <ProfileDrawer children={
                <Button 
                    title='profile' 
                    className="bg-transparent m-0 p-0 hover:bg-transparent"
                >
                    <User color='#E1E1E6' />
                </Button>

            } />
        </div>
    )
}