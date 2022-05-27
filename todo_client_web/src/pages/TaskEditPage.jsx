import React, { useState } from "react"
import { saveSmartTask, smartTask as smartTaskApi } from "../utils/Api"
import { note } from "../utils/ScreenNames"
import { deleteItem, saveItem } from "../utils/OperationItem"
import { SMART_TASK } from "../utils/Storage"
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorView } from '../component/ErrorView'
import { Header } from '../pages/Header'


class SmartTask {
    constructor(timeBound = new Date().toLocaleDateString("en-US"),
        specific = '', measurable = '',
        achievable = '', relevant = '', isCompleted = false, id = -1) {
        this.id = id;
        this.specific = specific;
        this.measurable = measurable;
        this.achievable = achievable;
        this.relevant = relevant;
        this.timeBound = timeBound;
        this.isCompleted = isCompleted;
    }
}


function getItemCurrent(id, stor, defualt) {
    const item = localStorage.getItem(stor)
    console.log(`${stor} save ${item}`)
    return id == '-1' ? defualt : JSON.parse(item).filter(n => n.id == id)[0]
}

export const TaskEdit = (p) => {
    const idTask = useParams()['*']
    const navigate = useNavigate()


    let task = getItemCurrent(idTask, SMART_TASK, new SmartTask())

    const [id, setId] = useState(task.id)
    const [specific, setSpecific] = useState(task.specific)
    const [measurable, setMeasurable] = useState(task.measurable)
    const [achievable, setAchievable] = useState(task.achievable)
    const [relevant, setRelevant] = useState(task.relevant)
    const [timeBound, setTimeBound] = useState(task.timeBound)

    const [errors, setErrors] = React.useState({})

    function elementInput(value, setValue, name) {
        return (
            <div className="mb-3">
                <label className="form-label">{name}</label>
                <input type="text" className="form-control"
                    value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        )
    }

    return (
        <>
            <Header />
            <h1>Task edit {id}</h1>

            <div className="m-3">
                <ErrorView text={errors.text} enable={errors.enable} />
                {elementInput(specific, setSpecific, 'S')}
                {elementInput(measurable, setMeasurable, 'S')}
                {elementInput(achievable, setAchievable, 'S')}
                {elementInput(relevant, setRelevant, 'S')}
                {elementInput(timeBound, setTimeBound, 'S')}
            </div>

            <button onClick={() => {
                let smtask = new SmartTask(timeBound, specific, measurable, relevant, achievable, false, id)
                saveItem(smtask, setId, saveSmartTask)
            }}>Сохранить</button>
            <button bcolor={'#d41b1b'} onClick={() => deleteItem(id, navigate, task, smartTaskApi)}>Удалить</button>
        </>
    )
}
