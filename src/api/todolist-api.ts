import axios from "axios";

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TasksGetResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}
export type TasksPostResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6e9ef89c-7a08-41f5-b578-f795ea2f7a26'
    }
})

export const todolistApi = {
    getTodoLists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodoList(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
    },
    updateTodoList(id: string, title: string) {
        return instance.put<ResponseType<{ item: TodolistType }>>(`todo-lists/${id}`, {title})
    }
}

export const tasksApi = {
    getTasks(id: string) {
        return instance.get<TasksGetResponseType>(`todo-lists/${id}/tasks`)
    },
    createTasks(id: string, title: string) {
        return instance.post<TasksPostResponseType<{item: TaskType}>>(`todo-lists/${id}/tasks`, {title})
    },
    updateTasks(id: string, taskId: string, title: string) {
        return instance.put<TasksPostResponseType<{item: TaskType}>>(`todo-lists/${id}/tasks/${taskId}`, {title})
    },
    deleteTasks(id: string, taskId: string) {
        return instance.delete<TasksPostResponseType>(`todo-lists/${id}/tasks/${taskId}`)
    }
}