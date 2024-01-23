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
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from './components/ui/button'
import { SwitchConfig } from './components/SwitchConfig'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { ColorPicker } from './components/ColorPicker'
import { roulletConfigSchema } from './utils/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from './components/ui/input'

const INITIAL_VALUES = {
  backgroundColorGeral: '#00875F',
  backgroundColorRoullet: '#202024',
  titleRoullet: 'Gire a roleta',
  subtitleRoullet: 'E garanta o seu prêmio!',
  names: []
}

function App() {
  const [isShowConfig, setIsShowConfig] = useState({
    titleroullet: true,
    subtitleroullet: true
  });

  const handleCheckSwitch = (idSwitch: string) => {
    switch (idSwitch) {
      case 'titleroullet':
        return setIsShowConfig({...isShowConfig, titleroullet: !isShowConfig.titleroullet})
      case 'subtitleroullet':
        return setIsShowConfig({...isShowConfig, subtitleroullet: !isShowConfig.subtitleroullet})
      default:
        break;
    }
  }

  const form = useForm<z.infer<typeof roulletConfigSchema>>({
    resolver: zodResolver(roulletConfigSchema),
    defaultValues: INITIAL_VALUES,
  })

  function onSubmit(values: z.infer<typeof roulletConfigSchema>) {
    console.log(values)
  }

  return (
    <main className='bg-[#00875F] min-h-screen flex flex-1 items-end justify-center flex-col px-12'>
      <Form {...form}>
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
              <h1 className='font-bold text-4xl text-[#E1E1E6] uppercase'>{form.getValues().titleRoullet}</h1>
              {!!form.getValues().subtitleRoullet.length && (
                <p className='text-lg text-[#E1E1E6]'>{form.getValues().subtitleRoullet}</p>
              )}
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
            <div className="grid gap-5 py-4 px-2 mt-4">
              <p className='font-semibold text-lg text-[#2E2E2E]'>Conteúdo</p>
              <SwitchConfig id="titleroullet" title='Título' isChecked={isShowConfig.titleroullet} handleCheck={handleCheckSwitch} />
              {isShowConfig.titleroullet && (
                  <FormField
                    control={form.control}
                    name="titleRoullet"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Digite o título da roleta' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              )}
              <SwitchConfig id="subtitleroullet" title='Subtítulo' isChecked={isShowConfig.subtitleroullet} handleCheck={handleCheckSwitch} />
              {isShowConfig.subtitleroullet && (
                  <FormField
                    control={form.control}
                    name="subtitleRoullet"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Digite o sub-título da roleta' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              )}
              <div>
                <Label htmlFor="titleroullet" className="text-right text-base">
                  Nome dos itens ou pessoas na roleta
                </Label>
                <div className="grid w-full gap-1.5 mt-2">
                  <Textarea placeholder="Digite aqui os nomes dos itens separado por linha" />
                  <p className="text-sm text-muted-foreground text-[#50555A]">
                    Digite 1 item ou pessoa por linha.
                  </p>
                </div>
              </div>
            </div>
            <div  className="grid gap-5 py-4 px-2 mt-4">
              <p className='font-semibold text-lg text-[#2E2E2E]'>Tema e cores</p>
              <FormField
                control={form.control}
                name="backgroundColorGeral"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ColorPicker 
                        key="background-geral"
                        title="Cor de fundo" 
                        activeColor={field.value}  
                        handleSetColor={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="backgroundColorRoullet"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ColorPicker 
                        key="background-roullet"
                        title="Cor de fundo da roleta" 
                        activeColor={field.value}  
                        handleSetColor={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter className='mt-7'>
              <SheetClose asChild>
                <Button onClick={form.handleSubmit(onSubmit)}>Salvar alterações</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Form>
    </main>
  )
}

export default App
