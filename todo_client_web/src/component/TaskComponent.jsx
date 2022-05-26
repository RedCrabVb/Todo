import React from 'react'
import {routeTask} from "../utils/ScreenNames"
import {Link} from 'react-router-dom'

export const TaskComponent = ({task}) => {

    return (
        <div>
            <Link className="btn btn-primary mb-3 customButtons" to={`${routeTask}/${task.id}`}>{task.specific}</Link>
        </div>
    )
};