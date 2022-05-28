import React, { useEffect, useState } from "react"
import { Item } from "../component/class/Item"
import { SmartTask } from "../component/class/SmartTask"
import { saveSmartTask, smartTask as smartTaskApi } from "../utils/Api"
import { deleteItem, saveItem } from "../utils/OperationItem"
import { SMART_TASK } from "../utils/Storage"




// function getItemCurrent(id: number, stor, defualt) {
//     const item = localStorage.getItem(stor)
//     return id == '-1' ? defualt : JSON.parse(item).filter(n => n.id == id)[0]
// }

function getItemCurrent<P extends  Item>(id: number, stor: string, defualt: P) {
    const item: string = localStorage.getItem(stor) || '{}'
    return id == -1 ? defualt : JSON.parse(item).filter((n: P) => n.id == id)[0]
}


export const TaskEdit = ({ idItem, funcLoadItem, setCurrentTask }: {idItem: number, funcLoadItem: () => void, setCurrentTask: (f: number | undefined) => void}) => {
    const [task, setTask] = useState(getItemCurrent(idItem, SMART_TASK, new SmartTask()))

    useEffect(() => {
        if (idItem != task.id) setTask(getItemCurrent(idItem, SMART_TASK, new SmartTask()))
    })


    function elementInput(value: string, setValue: (f: string) => void, name: string) {
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
                {/* <ErrorView text={errors.text} enable={errors.enable} /> */}
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
