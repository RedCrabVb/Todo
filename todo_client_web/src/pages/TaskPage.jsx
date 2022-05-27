import React, { useEffect, useState } from "react"
import { smartTask } from '../utils/Api'
import { getItem } from '../utils/OperationItem'
import { useNavigate, Link } from "react-router-dom"
import { ErrorView } from '../component/ErrorView'
import { TaskComponent } from '../component/TaskComponent'
import { Header } from "./commons/Header"
import { routeTask } from '../utils/ScreenNames'
import { SMART_TASK } from "../utils/Storage"
import { TaskEdit } from './TaskEditPage'
import { styleBlockItem, styleContainerItem, styleItems} from './commons/css/item'

export const Task = () => {
    const [taskAll, setTaskAll] = useState([])
    const [currentTask, setCurrentTask] = useState(undefined)
    const [error, setError] = useState({ enable: false, text: '' })

    const [isLoadingItem, setIsLoading] = useState(false)


    function funcLoadItem() {
        getItem(setTaskAll, setError, smartTask, SMART_TASK)
    }

    useEffect(() => {
        if (!isLoadingItem) {
            setIsLoading(true)
            funcLoadItem()
        }
    })



    return (
        <>
            <Header />
            <ErrorView text={error.text} enable={error.enable} />
            <br></br>
            <div className="container" style={styleContainerItem}>
                <div className="row" >
                    <div className="col-2 m-1" style={styleItems}>
                        <button style={{height: '60px'}} className="btn btn-outline-primary mb-3 customButtons" onClick={() => { setCurrentTask(-1) }} >+ cоздать задачу</button>
                        <div style={styleBlockItem}>
                            {
                                taskAll.reverse()
                                .map(task => <TaskComponent
                                     setAllTask={setTaskAll}
                                     taskAll={taskAll}
                                     setCurrentTask={setCurrentTask} task={task} key={task.id} />)
                            }
                        </div>

                    </div>
                    <div className="col-6 m-1" style={{width: '70%'}}>
                        {currentTask != undefined ? <TaskEdit idItem={currentTask} funcLoadItem={funcLoadItem} setCurrentTask={setCurrentTask} /> : <></>}
                    </div>
                </div>
            </div>
        </>
    )
}