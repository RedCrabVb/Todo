import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom'

import {Home} from './pages/Homepage'
import {Note} from './pages/NotePage'
import {Notfoundpage} from './pages/Notfoundpage'
import {LogIn} from './pages/Login'
import {Task} from './pages/TaskPage'
import {NoteEdit} from './pages/NoteEditPage'

import { routeHome, routeNote, routeLogin, routeRegistration, routePathTask, routeEditNote } from "./utils/ScreenNames"
import { Registration } from './pages/RegistrationPage';

function App() {
    return (
        <>
            <Routes>
                <Route path={routeHome} element={<Home/>}></Route>
                <Route path={routeNote}>
                    <Route path={'*'} element={<NoteEdit/>}></Route>
                    <Route path={'all'} element={<Note/>}></Route>

                </Route>
                <Route path={routeLogin} element={<LogIn/>}></Route>
                
                <Route path={routePathTask} element={<Task/>}></Route>
                <Route path={routeRegistration} element={<Registration/>}></Route>
                <Route path="*" element={<Notfoundpage/>}/>
            </Routes>
        </>
    );
}

export default App;
