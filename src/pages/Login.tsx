import { UserAuthForm } from "@/components/UserAuthForm"
import { Link } from "react-router-dom"
import spinImage from '../assets/spin.png'

export const Login = () => {
    return (
        <div 
            className="min-h-screen flex flex-col md:flex-row justify-between md:p-2"
        >
            <div className="w-[55%] hidden md:block">
                <img 
                    src={spinImage} 
                    alt="Imagem de duas pessoas animadas tocando as maos comemorando" 
                    className="object-cover w-full h-full rounded-2xl"
                />
            </div>
            <div 
                className="flex flex-col justify-center w-full md:w-[40%] px-3 bg-[#0C2A58] md:bg-white h-screen"
            >
                <div className="flex flex-col gap-1 mb-2">
                    <h1
                        className="text-xl text-white md:text-slate-900 font-semibold"
                    >
                        Entre na sua conta
                    </h1>
                    <p className="text-white md:text-slate-900">
                        Digite seu e-mail e senha para entrar
                    </p>
                </div>
                <UserAuthForm />
                <div className="text-center mt-3">
                    <Link 
                        to="/register"
                        className="text-sm underline text-slate-900"
                    >
                        Ainda não tenho conta
                    </Link>
                </div>
            </div>
        </div>
    )
}