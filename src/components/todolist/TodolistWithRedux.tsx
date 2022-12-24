import React, {useCallback} from "react";
import {TaskType, TodoListType} from "../../App";
import {EditableSpan} from "../editable-span/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {AddItemForm} from "../add-item-form/AddItemForm";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../../reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../reducers/tasks-reducer";
import {Task} from "../task/Task";
import s from './TodolistWithRedux.module.css'

type TodolistWithReduxPropsType = {
    todolist: TodoListType

}



export const TodolistWithRedux = React.memo(({ todolist}: TodolistWithReduxPropsType) => {
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])


    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    const dispatch = useDispatch()

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }, [])
    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [])
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [])
    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }, [])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }, [])

    const onAllClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC('all', id))
    }, [])
    const onActiveClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC('active', id))
    }, [])
    const onCompletedClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC('completed', id))
    }, [])


    return (
        <div className={s.Container}>
            <div className={s.editableSpan}><EditableSpan title={title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTask} title={'Task title'}/>
            <div>
                {
                    tasks.map(t => <Task key={t.id}
                                         todolistId={id}
                                         task={t}
                                         removeTask={removeTask}
                                         changeTaskStatus={changeTaskStatus}
                                         changeTaskTitle={changeTaskTitle}/>
                    )
                }
            </div>
            <div>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'warning'}

                >All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'success'}
                >Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    )
})