import React, { useEffect, useState } from "react"
import { saveSmartTask, smartTask as smartTaskApi } from "../utils/Api"
import { deleteItem, saveItem } from "../utils/OperationItem"
import { SMART_TASK } from "../utils/Storage"
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorView } from '../component/ErrorView'


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
    return id == '-1' ? defualt : JSON.parse(item).filter(n => n.id == id)[0]
}

export const TaskEdit = ({ idItem, funcLoadItem, setCurrentTask = () => {} }) => {
    const navigate = useNavigate()

    const [task, setTask] = useState(getItemCurrent(idItem, SMART_TASK, new SmartTask()))

    const [errors, setErrors] = React.useState({})

    useEffect(() => {
        if (idItem != task.id) setTask(getItemCurrent(idItem, SMART_TASK, new SmartTask()))
    })


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
            <div className="m-3">
                <ErrorView text={errors.text} enable={errors.enable} />
                {elementInput(task.specific, (specific) => { setTask({ ...task, specific }) }, 'S')}
                {elementInput(task.measurable, (measurable) => setTask({...task, measurable}), 'M')}
                {elementInput(task.achievable, (achievable) => setTask({...task, achievable}), 'A')}
                {elementInput(task.relevant, (relevant) => setTask({...task, relevant}), 'R')}
                {elementInput(task.timeBound, (timeBound) => setTask({...task, timeBound}), 'T')}
            </div>

            <button className="btn btn-secondary mb-3 customButtons" onClick={() => {
                saveItem(task, (id) => setTask({ ...task, id }), saveSmartTask, funcLoadItem)
            }}>Сохранить</button>
            <button className="btn btn-danger mb-3 customButtons" onClick={() => {
                deleteItem(task.id, smartTaskApi, () => {
                    console.log(setCurrentTask)
                    setCurrentTask(undefined) 
                    funcLoadItem() 
                })
            }}>Удалить</button>
        </>
    )
}
