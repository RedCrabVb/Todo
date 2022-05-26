import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom'

import {Home} from './pages/Homepage'
import {Note} from './pages/Notepage'
import {Notfoundpage} from './pages/Notfoundpage'
import {LogIn} from './pages/Login'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/note" element={<Note/>}></Route>
                <Route path="/login" element={<LogIn/>}></Route>
                <Route path="*" element={<Notfoundpage/>}/>
            </Routes>
        </>
    );
}

export default App;
