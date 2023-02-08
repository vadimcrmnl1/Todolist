import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodoLists()
            .then((res) => {
            const result = res
                setState(result.data)

        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoName = 'How I Meet Your Mother'
        todolistApi.createTodoList(todoName)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')


    const deleteTodolist = () => {

            todolistApi.deleteTodoList(todolistId)
                .then((res) => {
                    setState(res.data)
                })
        }


    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder='todolistId' value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={deleteTodolist}>delete todolist</button>
    </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoName = 'REACT&REDUX&API'
        const todolistId = '8a2691ac-bdfd-49bc-b47e-a95006d62067'
        todolistApi.updateTodoList(todolistId, todoName)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

