import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../editable-span/EditableSpan";
import {Delete} from "@mui/icons-material";
import s from './Task.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo( (props: TaskPropsType) => {

    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId),
        [props.removeTask, props.task.id, props.todolistId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }, [])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.changeTaskTitle, props.task.id,props.todolistId])



    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}

        />
        <span className={s.editableSpan}>
            <EditableSpan title={props.task.title} changeTitle={onTitleChangeHandler} />
        </span>

        <IconButton onClick={onClickHandler} size={'small'}>
            <Delete style={{color: '#ff7043', marginLeft: '5px'}} />
        </IconButton>
    </div>

})