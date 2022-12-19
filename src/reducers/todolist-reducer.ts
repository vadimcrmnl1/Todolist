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
    title: string,
    id: string
}
export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT
const InitialState: Array<TodoListType> = []

export const todolistReducer = (state = InitialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':

            return [...state, {id: action.todoListId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return state
    }
}

export const RemoveTodolistAC = (todoListId: string): RemoveTodolistAT => ({type: REMOVE_TODOLIST, id: todoListId})
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: ADD_TODOLIST, title, todoListId: v1()})
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodolistFilterAT =>
    ({type: CHANGE_TODOLIST_FILTER, filter, id: todoListId})
export const ChangeTodolistTitleAC = (title: string, todoListId: string): ChangeTodolistTitleAT =>
    ({type: CHANGE_TODOLIST_TITLE, title, id: todoListId})