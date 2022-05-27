import React from 'react'
import { routeTask } from "../utils/ScreenNames"
import { Link, useNavigate } from 'react-router-dom'

export const TaskComponent = ({ task, setCurrentTask }) => {

    return (
        <>
        <div onClick={() => {setCurrentTask(task.id)}} className="btn btn-outline-secondary" style={{minHeigth: '75px', maxHeight: '100px', display: 'inline-grid'}}>
            {task.specific}
            <br/>
            {task.timeBound}
            <input type="checkbox"></input>
        </div>
        </>
    )
};