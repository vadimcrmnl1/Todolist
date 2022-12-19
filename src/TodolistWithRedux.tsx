import React, {ChangeEvent} from "react";
import {TaskType, TodoListType} from "./App";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {AddItemForm} from "./AddItemForm";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";

type TodolistWithReduxPropsType = {
    todolist: TodoListType

}

export const TodolistWithRedux = ({todolist}: TodolistWithReduxPropsType) => {
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])


    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const dispatch = useDispatch()

    function changeTodolistTitle(title: string) {
        dispatch(ChangeTodolistTitleAC(id, title))
    }
    function removeTodolist() {
        dispatch(RemoveTodolistAC(id))
    }
    function addTask(title: string) {
        dispatch(addTaskAC(title, id))
    }
    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }
    const onAllClickHandler = () => {dispatch(ChangeTodolistFilterAC('all', id))}
    const onActiveClickHandler = () => {dispatch(ChangeTodolistFilterAC( 'active', id))}
    const onCompletedClickHandler = () => {dispatch(ChangeTodolistFilterAC( 'completed', id))}


    return (
        <div>
            <h3><EditableSpan title={title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} placeholder={'Type your text'}/>
            <div>
                {
                    tasks.map(t => {
                        const onClickHandler = () => removeTask(t.id, id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            changeStatus(t.id, newIsDoneValue, id);
                        }
                        const onTitleChangeHandler = (newValue: string) => {
                            changeTaskTitle(t.id, newValue, id);
                        }


                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                checked={t.isDone}
                                color="primary"
                                onChange={onChangeHandler}
                            />

                            <EditableSpan title={t.title} changeTitle={onTitleChangeHandler}/>
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}
                >All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    )
}