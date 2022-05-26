import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom'

import {Home} from './pages/Homepage'
import {Note} from './pages/Notepage'
import {Notfoundpage} from './pages/Notfoundpage'
import {LogIn} from './pages/Login'

import {routeHome, routeNote, routeLogin} from "./utils/ScreenNames"

function App() {
    return (
        <>
            <Routes>
                <Route path={routeHome} element={<Home/>}></Route>
                <Route path={routeNote} element={<Note/>}></Route>
                <Route path={routeLogin} element={<LogIn/>}></Route>
                <Route path="*" element={<Notfoundpage/>}/>
            </Routes>
        </>
    );
}

export default App;
