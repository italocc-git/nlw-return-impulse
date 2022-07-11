import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {Home} from './pages/Home'
import {Widget} from './components/Widget'
import { useAuth } from './hooks/useAuth'

export function Router(){
    /* const {user} = useAuth()
    const navigate = useNavigate()
    React.useEffect(() => {
        if(user && user.id){
            navigate('/dashboard')
        }else {
            navigate('/')
        }
    },[user]) */

    return(
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/dashboard' element={<Widget />}/>
        </Routes>
    )
}