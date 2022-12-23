// import React, {ChangeEvent, useCallback} from "react";
// import s from './Todolist.module.css'
// import {FilterValuesType, TaskType} from "./App";
// import {AddItemForm} from "./AddItemForm";
// import {EditableSpan} from "./EditableSpan";
// import {Button, Checkbox, IconButton, ListItem} from "@material-ui/core";
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//
// export type TodolistPropsType = {
//
//     title: string
//     todoListId: string
//     tasks: TaskType[]
//     filter: FilterValuesType
//
//     addTask: (title: string, todoListId: string) => void
//     changeFilter: (value: FilterValuesType, todolistId: string) => void
//     removeTask: (taskId: string, todoListId: string) => void
//     removeTodolist: (todoListId: string) => void
//     changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
//     changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
//
//     changeTodolistTitle: (title: string, todoListId: string) => void
// }
//
// export const Todolist = (props: TodolistPropsType) => {
//
//     const getTaskListItem = (t: TaskType) => {
//         const removeTaskHandler = () => props.removeTask(t.id, props.todoListId)
//         const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
//             props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
//         const changeTaskTitle = (nextTitle: string) => {
//             props.changeTaskTitle(t.id, nextTitle, props.todoListId)
//         }
//         return <ListItem
//             key={t.id}
//             className={t.isDone ? s.Done : ""}
//         >
//
//             <Checkbox
//                 defaultChecked
//                 color="default"
//                 style={{color: 'blue', padding: '3px'}}
//                 size={'small'}
//                 inputProps={{'aria-label': 'checkbox with default color'}}
//                 onChange={onChangeHandler}
//                 checked={t.isDone}
//             />
//             <EditableSpan changeTitle={changeTaskTitle} title={t.title}/>
//
//
//             <IconButton onClick={removeTaskHandler}
//                         size={'small'}>
//                 <DeleteForeverIcon style={{color: 'red'}}>
//                 </DeleteForeverIcon>
//             </IconButton>
//         </ListItem>
//     }
//     const tasksList = props.tasks.length
//         ? <ul>{props.tasks.map(getTaskListItem)}</ul>
//         : <span>Your taskslist is empty</span>
//     const handlerCreator = (filter: FilterValuesType) => {
//         return () => props.changeFilter(filter, props.todoListId)
//     }
//     const changeTitle = (nextTitle: string) => props.changeTodolistTitle(nextTitle, props.todoListId)
//     const removeTodolist = () => props.removeTodolist(props.todoListId)
//     const addNewTask = useCallback((title: string) => props.addTask(title, props.todoListId), [])
//
//     const btnStl = {marginRight: '4px', color: 'white'}
//
//     return (
//         <div>
//             <div className={s.titleList}>
//                 <EditableSpan title={props.title} changeTitle={changeTitle}/>
//
//                 <IconButton className={s.iconButton}>
//                     <DeleteForeverIcon onClick={removeTodolist} fontSize={'small'}></DeleteForeverIcon>
//                 </IconButton>
//             </div>
//             <AddItemForm placeholder={'Add new task'} addItem={addNewTask}/>
//             {tasksList}
//             <div>
//                 <Button style={btnStl}
//                         variant="contained"
//                         color={props.filter === 'all' ? "secondary" : "primary"}
//                         size="small"
//                         disableElevation
//                         onClick={handlerCreator('all')}>All
//                 </Button>
//                 <Button style={btnStl}
//                         variant="contained"
//                         color={props.filter === 'active' ? "secondary" : "primary"}
//                         size="small"
//                         disableElevation
//                         onClick={handlerCreator('active')}>Active
//                 </Button>
//                 <Button style={btnStl}
//                         variant="contained"
//                         color={props.filter === 'completed' ? "secondary" : "primary"}
//                         size="small"
//                         disableElevation
//                         onClick={handlerCreator('completed')}>Completed
//                 </Button>
//             </div>
//         </div>
//     )
// }