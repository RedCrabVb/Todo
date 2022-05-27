import React from 'react'
import { routeTask } from "../utils/ScreenNames"
import { Link, useNavigate } from 'react-router-dom'
import {saveSmartTask, saveSmartTask as taskApi } from "../utils/Api"
import {saveItem} from '../utils/OperationItem'

export const TaskComponent = ({ task, setCurrentTask, taskAll, setAllTask}) => {
    function chnageCheckBox(value) {
        console.log(value)
        // task.completed = true

        task.completed = !task.completed
        let allTaskTmp = taskAll.filter(t => t.id != task.id)
        allTaskTmp.push(task)

        saveItem(task, (id) => {}, taskApi, () => {
            console.log("save item check box click")
            setAllTask(allTaskTmp)
        })
    }
    return (
        <>
        <div onClick={() => {setCurrentTask(task.id)}} 
        className="btn btn-outline-secondary" style={{minHeigth: '75px', maxHeight: '100px'}}>
            {task.specific}
            <br/>
            {task.timeBound}
            <input type="checkbox" checked={task.completed} onChange={chnageCheckBox}></input>
        </div>
        </>
    )
};