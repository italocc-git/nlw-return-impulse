import googleIconImg from '../assets/google-icon.svg'
import facebookIcon from '../assets/facebook-logo.png'
import { useAuth } from '../hooks/useAuth';
import {useNavigate} from 'react-router-dom'
import { ChatTeardropDots } from "phosphor-react";
export function Home(){
    const navigate = useNavigate()
    const { signInWithGoogle , loading} = useAuth();
    
    function handleLoginGoogle() {

        signInWithGoogle()
        navigate('/dashboard')
    }
    function handleLoginFacebook() {
        console.log('Em desenvolvimento ...')
    }

    return (
        <div className="min-h-screen bg-brand-500 flex justify-center items-center">
            <div className="min-w-[425px] p-12 bg-[#fff0f5] border border-gray-500 rounded">
                    <div className='flex justify-evenly'>
                        <strong className="text-2xl mb-6 block font-semibold">
                            Give me your Feedback  
                        </strong>
                        <ChatTeardropDots size={30}/>
                    </div>
                    
                    <strong className="text-sm mb-6 block font-semibold">
                        Login de Acesso
                    </strong>
                <div className="flex flex-col gap-4 w-full">
                <button disabled={loading} onClick={handleLoginGoogle} className='flex items-center justify-evenly gap-4 bg-red-700 px-5 h-14 rounded hover:bg-red-800 transition-colors disabled:opacity-50'>
                    <img src={googleIconImg} alt="google-icon" />
                    <span className="text-2-l block text-white fond-bold text-sm">
                         Login com o Google 
                    </span>
                </button>
                <button disabled={loading} onClick={handleLoginFacebook}  className='flex items-center justify-evenly gap-4 bg-blue-700 px-5 h-14 rounded hover:bg-blue-800 transition-colors disabled:opacity-50'>
                    <img src={facebookIcon} alt="google-icon" width="24" height="24" />
                    <span className="text-2-l block text-white fond-bold text-sm">
                         Login com o Facebook
                    </span>
                </button>
                </div>
            </div>
        </div>
    )
}