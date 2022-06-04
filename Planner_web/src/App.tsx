import './App.css';
import { Routes, Route, Link } from 'react-router-dom'

import { Home } from './pages/commons/HomePage'
import { NotePage } from './pages/NotePage'
import { Task } from './pages/TaskPage'
import { Notfoundpage } from './pages/commons/NotFoundPage'
import { LogIn } from './pages/commons/Login'

import { routeHome, routeNote, routeLogin, routeRegistration, routeTask } from "./utils/ScreenNames"
import { Registration } from './pages/commons/RegistrationPage';

function App() {
    return (
        <>
            <Routes>
                <Route path={routeHome} element={<Home />}></Route>
                <Route path={routeLogin} element={<LogIn />}></Route>
                <Route path={routeRegistration} element={<Registration />}></Route>

                <Route path={routeNote}>
                    <Route path={'all'} element={<NotePage />}></Route>
                </Route>

                <Route path={routeTask}>
                    <Route path={'all'} element={<Task />}></Route>
                </Route>

                <Route path="*" element={<Notfoundpage />} />
            </Routes>
        </>
    )
}

export default App;
