import React from 'react';
import './App.css';
import {TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {TodolistWithRedux} from "./TodolistWithRedux";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(ChangeTodolistFilterAC(value, todoListId))
    }

    function removeTodolist(id: string) {
        dispatch(RemoveTodolistAC(id))

    }

    function changeTodolistTitle(id: string, title: string) {
        dispatch(ChangeTodolistTitleAC(id, title))
    }

    function addTodolist(title: string) {
        dispatch(AddTodolistAC(title))

    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist} placeholder={'Type your text'}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>

                                    <TodolistWithRedux todolist={tl}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
