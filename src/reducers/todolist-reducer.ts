import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'

export type RemoveTodolistAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}
export type AddTodolistAT = {
    type: typeof ADD_TODOLIST
    title: string
    todoListId: string
}
export type ChangeTodolistFilterAT = {
    type: typeof CHANGE_TODOLIST_FILTER,
    filter: FilterValuesType,
    id: string
}
export type ChangeTodolistTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE,
    id: string,
    title: string
}
export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT
const InitialState: Array<TodoListType> = []

export const todolistReducer = (state = InitialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':

            return [{id: action.todoListId, title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)

        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(t=>t.id===action.id ? {...t, title:action.title}:t)

        }
        default:
            return state
    }
}

export const removeTodolistAC = (todoListId: string): RemoveTodolistAT => ({type: REMOVE_TODOLIST, id: todoListId})
export const addTodolistAC = (title: string): AddTodolistAT => ({type: ADD_TODOLIST, title, todoListId: v1()})
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterAT =>
    ({type: CHANGE_TODOLIST_FILTER, filter, id: id})
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT =>
    ({type: CHANGE_TODOLIST_TITLE, id: id, title: title})