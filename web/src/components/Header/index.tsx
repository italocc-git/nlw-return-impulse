import { useAuth } from "../../hooks/useAuth"
import {GoogleLogo} from 'phosphor-react'
import { useNavigate } from "react-router-dom"
export function Header(){
    const {user, logoutUser} = useAuth()
    const navigate = useNavigate()
    const logout = () => {
        logoutUser()
        navigate('/')
    }
    return(
        <div className="w-full flex justify-between text-white font-serif px-4 py-2 h-[5vh] bg-transparent border-b-2 ">
            <h1 className="flex items-center">Dashboard</h1>
            <div className="flex gap-2 items-center">
                <span>{user?.name}</span>
                <img src={user?.avatar} alt='user-avatar' className="h-full rounded-full " />
               
            </div>
            <button onClick={logout} className="flex gap-3 items-center">
                <span>{user?.email}</span>
                <span className="bg-red-500 p-2 rounded-xl font-medium">Sair</span>
            </button>
        </div>
    )
}