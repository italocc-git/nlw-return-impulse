import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import noPhoto from '../../assets/user-no-photo.png'
export function Header(){
    const {user, logoutUser} = useAuth()
    const navigate = useNavigate()
    const logout = () => {
        logoutUser()
        navigate('/')
    }
    return(
        <div className="w-full flex justify-between text-white font-serif px-4 py-2 h-[5vh] bg-transparent border-b-2 ">
            {user && (
             <>
                <h1 className="flex items-center">Dashboard</h1>
                <div className="flex gap-2 items-center">
                    <span className="sm:hidden md:hidden lg:inline">{user.name || ''}</span>
                    
                    <img src={user.avatar || noPhoto} alt='user-avatar' className="h-full rounded-full " />
                
                </div>
                <div className="flex gap-3 items-center">
                    <span className="sm:hidden md:inline ">{user.email}</span>
                    <button onClick={logout} >
                        <span className="bg-red-500 p-2 rounded-xl font-medium hover:bg-red-400 transition-colors">Sair</span>
                    </button> 
                </div>
                 
             </>
            )}
        </div>
    )
}