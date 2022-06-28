import {Routes, Route} from 'react-router-dom'
import {Home} from './pages/Home'
import {Widget} from './components/Widget'

export function Router(){
    return(
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='dashboard' element={<Widget />}/>
        </Routes>
    )
}