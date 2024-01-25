import './App.css'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import React, { useState } from 'react'
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
import toast, { Toaster } from 'react-hot-toast';
import { Input } from './components/ui/input'
import { HeaderSheet } from './components/HeaderSheet'
import { SpinWheel } from './components/SpinWheel'
import { formatArrayForTextArea, transformArrayToString } from './utils/utils'
import { Badge } from './components/ui/badge'

const INITIAL_VALUES = {
  backgroundColorGeral: '#00875F',
  backgroundColorRoullet: '#202024',
  titleRoullet: 'Gire a roleta',
  subtitleRoullet: 'E garanta o seu prêmio!',
  names: ['10','0','100','150','800','40','300','10']
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
    // ANtes de salvar verificar text area usando essa funcao
    // console.log(currentValue.includes('\n' || ' '));
    if(values.names!.length < 8){
      toast.error("Opa! 🤔 Os nomes do itens na roleta estão abaixo de 8, por favor adicione até estar os 8.")
    }
    console.log(values)
  }

  // function transformArray(e: React.KeyboardEvent<HTMLTextAreaElement>){
  //   const backspaceNoPressed = e.key !== "Backspace";
  //   const currentValue = e.currentTarget.value;
  //   const namesArray: string[] = [];

  //   if(backspaceNoPressed) {
  //     const lengthNoSpaces = currentValue.replace(/ /g,"").length;
  //     if ( lengthNoSpaces !== 0 && lengthNoSpaces % 4 === 0) {
  //       namesArray.push(...namesArray, currentValue)
  //       form.setValue('names', transformArrayToString(namesArray))
  //     }
  //   }
  // }

  function transformArray(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const currentValue = e.target.value;
    const namesArray = currentValue.split('\n');
    const valueToSave = namesArray.length === 1 && !namesArray[0].length ? null : transformArrayToString(namesArray);
    form.setValue('names', valueToSave);
    return valueToSave;
  }

  return (
    <main className='bg-[#00875F] min-h-screen flex flex-1 items-end justify-center flex-col px-12'>
      <Form {...form}>
        <Sheet>
          <HeaderSheet />
          <div 
            className='bg-[#202024] flex flex-1 flex-col items-center justify-center w-full max-w-[1340px] h-[calc(100vh - 10rem)] mt-4 mb-20 mx-auto rounded-lg'
          >
            <div className='mb-8 text-center'>
              <h1 className='font-bold text-4xl text-[#E1E1E6] uppercase'>{form.getValues().titleRoullet}</h1>
              {!!form.getValues().subtitleRoullet.length && (
                <p className='text-lg text-[#E1E1E6]'>{form.getValues().subtitleRoullet}</p>
              )}
            </div>
            <SpinWheel valuesRoullet={form.getValues().names} />
          </div>
          <SheetContent className='overflow-x-auto'>
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
                <Label htmlFor="titleroullet" className="text-left text-base">
                  Nome dos itens ou pessoas na roleta
                </Label>
                <div className="grid w-full gap-1.5 mt-2">
                  <FormField
                    control={form.control}
                    name="names"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Digite aqui os nomes dos itens separado por linha" 
                            value={formatArrayForTextArea(field.value)}
                            onChange={(e) => {
                              const transformedValue = transformArray(e)
                              field.onChange(transformedValue);
                            }}
                            className='resize-none'
                            rows={8}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-sm text-muted-foreground text-[#50555A] mt-1">
                    Digite 1 item ou pessoa por linha. Máximo: 8
                  </p>
                  <div className='text-left'>
                    <Badge variant="secondary">Quantidade atual: {form.getValues().names?.length}</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div  className="grid gap-5 py-4 px-2">
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
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </Form>
    </main>
  )
}

export default App
