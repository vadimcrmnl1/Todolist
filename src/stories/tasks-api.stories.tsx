import React, {useEffect, useState} from 'react'
import {tasksApi, todolistApi} from "../api/todolist-api";

export default {
    title: 'API-TASKS'
}



export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '875d9d97-50a9-431b-ae10-28a271f76e8c'
        tasksApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '875d9d97-50a9-431b-ae10-28a271f76e8c'
        const taskTitle = 'Milk'
        tasksApi.createTasks(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        tasksApi.deleteTasks(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder='todolistId' value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder='taskId' value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <button onClick={deleteTask}>delete task</button>
    </div>
    </div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '875d9d97-50a9-431b-ae10-28a271f76e8c'
        const taskId = '36aacb06-2f62-4add-b2c3-4c15470d31cf'
        const title = 'First Task'
        tasksApi.updateTasks(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}