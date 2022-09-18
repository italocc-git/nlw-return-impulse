
import { useAuth } from '../../hooks/useAuth';
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import * as zod from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import FeedbackSignInImage from '../../assets/feedback-sign-in.svg'
import { FacebookLogo , GoogleLogo } from "phosphor-react";
export function SignIn(){
    
    const navigate = useNavigate()
    const {signInWithEmail, signInWithGoogle , loading , signInWithFacebook , forgotEmailOrPassword} = useAuth();
    
    const authenticationValidationSchema = zod.object({
        email: zod.string().email('Digite um e-mail válido'),
        password: zod.string().min(6 , {message : 'Mínimo 6 caracteres'})
    })

    type authenticationFormData = zod.infer<typeof authenticationValidationSchema>

    const authForm = useForm<authenticationFormData>({
        resolver: zodResolver(authenticationValidationSchema),
        
    })

    const {handleSubmit , reset , register, watch , formState} = authForm

    const email = watch('email')
    const password = watch('password')
    const isSubmitDisabled = !email || !password

    const {errors} = formState
    function handleDefaultLogin(data : authenticationFormData){
        /* HERE I will continue */
      
        signInWithEmail(data)
        reset() 
    }

    function handleLoginGoogle() {

        signInWithGoogle()
        navigate('/dashboard')
    }
    function handleLoginFacebook() {
        signInWithFacebook()
        navigate('/dashboard')
    }

    function handleResetPassword(){
        forgotEmailOrPassword(email)
        reset() 
    }

    

    const inputClass = 'text-gray-600 bg-zinc-300 border border-brand-300 p-4 rounded-lg w-full flex items-center focus:outline-none focus:border-brand-300 focus:ring-1 focus:brand-500'

    return (
        <div className='min-h-screen flex items-stretch '>
            <div className='flex sm:hidden md:hidden lg:inline-flex bg-brand-500 items-center justify-center w-[780px]'>
                <img className='w-full' src={FeedbackSignInImage} alt='feedback Icon' />
            </div>
            <div className=" bg-brand-500 flex flex-col justify-center items-center w-full min-w-[700px]">
                <div className='flex items-center'>
                    <div className="min-w-[525px]  p-12 bg-[#fff0f5] border border-gray-500 rounded">
                            <div className='flex '>
                                <strong className="text-2xl mb-6 block font-semibold">
                                    Login de Acesso
                                </strong>
                                {/* <ChatTeardropDots size={30}/> */}
                            </div>
                        <form onSubmit={handleSubmit(handleDefaultLogin)} className="flex flex-col gap-3 w-full  mb-7 ">
                            <input id='email' className={inputClass} placeholder='Digite o seu e-mail' {...register('email' )} />
                            {errors.email && <span className='text-red-500 text-xs '>{errors.email.message}</span>}
                            <input id='password' type='password' className={inputClass} placeholder='Digite a sua senha' {...register('password')} />
                            {errors.password && <span className='text-red-500 text-xs '>{errors.password.message}</span>}
                            <button disabled={isSubmitDisabled} type='submit' className='bg-brand-500 text-white h-14 rounded-lg py-4 w-full font-medium hover:bg-brand-300 transition-colors disabled:opacity-50' >Entrar</button>
                            <a hidden={!email} onClick={() => handleResetPassword()} className='cursor-pointer underline underline-offset-2 text-slate-700 hover:text-slate-400 transition-colors disabled:opacity-50'>Esqueci minha senha</a>
                        </form>  
                            
                        <div className="flex gap-4 w-full mt-4">
                        <button disabled={loading} onClick={handleLoginGoogle} className='flex items-center justify-between gap-4 bg-red-700 px-5 h-14 rounded hover:bg-red-800 transition-colors disabled:opacity-50'>
                            <GoogleLogo size={32} color="#FFF" weight="bold" />
                            <span className="text-2-l block text-white font-bold text-sm">
                                Login com o Google 
                            </span>
                        </button>
                        <button disabled={loading} onClick={handleLoginFacebook}  className='flex items-center justify-between gap-4 bg-blue-700 px-5 h-14 rounded hover:bg-blue-800 transition-colors disabled:opacity-50'>
                            <FacebookLogo color="#fff" size={32} weight="bold"/>
                            <span className="text-2-l block text-white font-bold text-sm">
                                Login com o Facebook
                            </span>
                        </button>
                        </div>
                        
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}