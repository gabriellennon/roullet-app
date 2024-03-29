import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
  import React, { useCallback, useEffect, useState } from 'react'
  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm } from "react-hook-form"
  import * as z from "zod"
  import { Button } from '../components/ui/button'
  import { SwitchConfig } from '../components/SwitchConfig'
  import { Label } from '../components/ui/label'
  import { Textarea } from '../components/ui/textarea'
  import { ColorPicker } from '../components/ColorPicker'
  import { roulletConfigSchema } from '../utils/schema'
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
  import toast, { Toaster } from 'react-hot-toast';
  import { Input } from '../components/ui/input'
  import { HeaderSheet } from '../components/HeaderSheet'
  import { SpinWheel } from '../components/SpinWheel'
  import { formatArrayForTextArea, transformArrayToString } from '../utils/utils'
  import { Badge } from '../components/ui/badge'
import { addConfigRoullet, getConfigRoullet } from "@/services/configRoullet.service"
import { useUserInfo } from "@/hooks/useUserInfo"
import { ResponseConfigUserData } from "@/utils/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons"
  
  const INITIAL_VALUES = {
    backgroundColorGeral: '#00875F',
    backgroundColorRoullet: '#202024',
    titleRoullet: 'Gire a roleta',
    subtitleRoullet: 'E garanta o seu prêmio!',
    names: ['$10','$0','$100','$150','$800','$40','$300','$10']
  }

export const Home = () => {
  const { userInfo, isLogged, setIsLogged } = useUserInfo();
    const [isLoading, setIsLoading] = useState(false);
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
  
    async function onSubmit(values: z.infer<typeof roulletConfigSchema>) {
      if(values.names!.length < 8){
        toast.error("Opa! 🤔 Os nomes do itens na roleta estão abaixo de 8, por favor adicione até estar os 8.")
      } else {
        setIsLoading(true)
        const userInfoLocal = localStorage.getItem('@mySpin-UserInfo');
        if(userInfoLocal){
          addConfigRoullet({ idUser: userInfo!.uid, body: values }).then(() => {
            toast.success('Configuração salva com sucesso!')
          }).catch((error) => {
            console.log(error)
          }).finally(() => {
            setIsLoading(false)
          })
        } else {
          toast.success('Configuração salva com sucesso!');
          localStorage.setItem('@mySpin-ConfigTem', JSON.stringify(values));
          setIsLoading(false);
        }
      }
    
    }
  
    function transformArray(e: React.ChangeEvent<HTMLTextAreaElement>) {
      const currentValue = e.target.value;
      const namesArray = currentValue.split('\n');
      const valueToSave = namesArray.length === 1 && !namesArray[0].length ? null : transformArrayToString(namesArray);
      form.setValue('names', valueToSave);
      return valueToSave;
    }

    const setPostConfigRoullet = useCallback(() => {
      setIsLoading(true);
      getConfigRoullet({ idUser: userInfo!.uid })
        .then((response) => {
          const resp: ResponseConfigUserData = response;
          if (resp.body) {
            form.reset(resp.body);
          }
          setIsLogged(true);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [form, setIsLogged, setIsLoading, userInfo]);    

    function restoreDefaultConfigs(){
      form.reset(INITIAL_VALUES);
      if(isLogged && userInfo) {
        setPostConfigRoullet()
      } else {
        localStorage.setItem('@mySpin-ConfigTem', JSON.stringify(INITIAL_VALUES));
      }
    }

    useEffect(() => {
      setIsLoading(true);
      const userInfoLocal = localStorage.getItem('@mySpin-UserInfo');

      if(userInfo?.uid && userInfoLocal){
        setPostConfigRoullet()
      } else {
        const tempConfig = localStorage.getItem('@mySpin-ConfigTem')
        if(tempConfig){
          form.reset(JSON.parse(tempConfig));
        }
        setIsLoading(false);
      }
    },[userInfo, form, setIsLogged, setPostConfigRoullet])

    useEffect(() => {
      const bgGeralElement = document.getElementById('bgGeral');
      const bgRoulletElement = document.getElementById('bgRoullet');
      if (bgGeralElement && bgRoulletElement) {
        bgGeralElement.style.backgroundColor = form.getValues().backgroundColorGeral;
        bgRoulletElement.style.backgroundColor = form.getValues().backgroundColorRoullet;
      }
    }, [form]);
  
    return (
      // Verificar o pq está ficando branco quando eu atualizo a cor
      <main 
        // className={`bg-[${form.getValues().backgroundColorGeral}] min-h-screen flex flex-1 items-end justify-center flex-col px-12`}
        className='bg-[#00875F] min-h-screen flex flex-1 items-end justify-center flex-col px-12'
        id="bgGeral"
      >
        <Form {...form}>
          <Sheet>
            <HeaderSheet />
            <div 
              // className={`bg-[${form.getValues().backgroundColorRoullet}] flex flex-1 flex-col items-center justify-center w-full max-w-[1340px] h-[calc(100vh - 10rem)] mt-4 mb-20 mx-auto rounded-lg`}
              className='bg-[#202024] flex flex-1 flex-col items-center justify-center w-full max-w-[1340px] h-[calc(100vh - 10rem)] mt-4 mb-20 mx-auto rounded-lg'
              id="bgRoullet"
            >
              <div className='mb-8 text-center'>
                {isLoading ? (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Skeleton className="h-8 w-[350px] bg-slate-700" />
                    <Skeleton className="h-6 w-[200px] bg-slate-700" />
                  </div>
                ): (
                  <>
                    <h1 className='font-bold text-4xl text-[#E1E1E6] uppercase'>{form.getValues().titleRoullet}</h1>
                    {!!form.getValues().subtitleRoullet.length && (
                      <p className='text-lg text-[#E1E1E6]'>{form.getValues().subtitleRoullet}</p>
                    )}
                  </>  
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
                <Button onClick={restoreDefaultConfigs} variant="outline">
                  <ReloadIcon className="mr-2 h-4 w-4" /> Redefinir Configurações
                </Button>
                {!isLogged && (
                  <Alert className="bg-yellow-100">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertDescription>
                      Você não está logado, caso feche o site os dados não ficarão salvos. 
                    </AlertDescription>
                  </Alert>                  
                )}
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