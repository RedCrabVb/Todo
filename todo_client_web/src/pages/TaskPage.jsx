import React, { useEffect, useState } from "react"
import { smartTask } from '../utils/Api'
import { getItem } from '../utils/OperationItem'
import { useNavigate, Link } from "react-router-dom"
import { ErrorView } from '../component/ErrorView'
import { TaskComponent } from '../component/TaskComponent'
import { Header } from "./Header"
import { routeTask } from '../utils/ScreenNames'
import { SMART_TASK } from "../utils/Storage"

export const Task = () => {
    const [taskAll, setTaskAll] = useState([])
    const [error, setError] = useState({ enable: false, text: '' })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true)
            getItem(setTaskAll, setError, smartTask, SMART_TASK)
            console.log(JSON.stringify(taskAll))
        }
    })

    return (
        <div>
            <Header />
            <ErrorView text={error.text} enable={error.enable} />
            <Link className="btn btn-primary mb-3 customButtons" to={`${routeTask}/-1`}>Создать задачу</Link>
            <br></br>
            <div className="containerItem m-3">
                <h1>Задачи</h1>
                {
                    taskAll.map(task => <TaskComponent task={task} key={task.id} />)
                }
            </div>
        </div>
    )
}