import { Settings, User } from 'lucide-react'
import './App.css'
import SpinWheel from './components/SpinWheel'
import { ButtonIcon } from './components/ButtonIcon'
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
import { Button } from './components/ui/button'
import { Label } from './components/ui/label'
import { Switch } from './components/ui/switch'

function App() {

  return (
    <main className='bg-[#00875F] min-h-screen flex flex-1 items-end justify-center flex-col px-12'>
      <Sheet>
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
        <div 
          className='bg-[#202024] flex flex-1 flex-col items-center justify-center w-full max-w-[1340px] h-[calc(100vh - 10rem)] mt-4 mb-20 mx-auto rounded-lg'
        >
          <div className='mb-8 text-center'>
            <h1 className='font-bold text-4xl text-[#E1E1E6] uppercase'>Gire a roleta</h1>
            <p className='text-lg text-[#E1E1E6]'>E garanta o seu prêmio!</p>
          </div>
          <SpinWheel />
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Configure sua roleta!</SheetTitle>
            <SheetDescription>
              Personalize sua roleta, os títulos, prêmios e muito mais!
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 px-2 mt-4">
            <p className='font-semibold text-lg text-[#2E2E2E]'>Conteúdo</p>
            <div className="flex justify-between items-center">
              <Label htmlFor="titleroullet" className="text-right text-base">
                Título
              </Label>
              <Switch id="titleroullet" className="col-span-3"  />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  )
}

export default App
