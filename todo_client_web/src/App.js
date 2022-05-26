import './App.css';
import { Routes, Route, Link } from 'react-router-dom'

import { Home } from './pages/HomePage'
import { Note } from './pages/NotePage'
import { Task } from './pages/TaskPage'
import { Notfoundpage } from './pages/NotFoundPage'
import { LogIn } from './pages/Login'
import { NoteEdit } from './pages/NoteEditPage'
import { TaskEdit } from './pages/TaskEditPage'

import { routeHome, routeNote, routeLogin, routeRegistration, routeTask } from "./utils/ScreenNames"
import { Registration } from './pages/RegistrationPage';

function App() {
    return (
        <>
            <Routes>
                <Route path={routeHome} element={<Home />}></Route>
                <Route path={routeLogin} element={<LogIn />}></Route>
                <Route path={routeRegistration} element={<Registration />}></Route>

                <Route path={routeNote}>
                    <Route path={'*'} element={<NoteEdit />}></Route>
                    <Route path={'all'} element={<Note />}></Route>
                </Route>

                <Route path={routeTask}>
                    <Route path={'*'} element={<TaskEdit />}></Route>
                    <Route path={'all'} element={<Task />}></Route>
                </Route>

                <Route path="*" element={<Notfoundpage />} />
            </Routes>
        </>
    )
}

export default App;
