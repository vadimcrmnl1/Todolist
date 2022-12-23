import React, {useState} from 'react'
import './App.module.css'
import s from './Todolist.module.css'
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "REACT & TS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "COLA", isDone: true},
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "WATER", isDone: false},
        ]
    })


    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }
    const addTodoList = (title: string) => {
        const newTodoListId: string = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: 'all'
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        let filteredTasks = tasks
        if (filterValue === "active") {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === "completed") {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }

    const todoListsComponents = todoLists.length
        ? todoLists.map(tl => {
                const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
                return (
                    <>
                        <Grid item key={tl.id}>
                        <Paper style={{padding: '20px'}}
                        elevation={8}>
                            {/*<Todolist*/}
                            {/*    key={tl.id}*/}
                            {/*    todoListId={tl.id}*/}
                            {/*    title={tl.title}*/}
                            {/*    filter={tl.filter}*/}
                            {/*    tasks={filteredTasks}*/}

                            {/*    addTask={addTask}*/}
                            {/*    removeTask={removeTask}*/}
                            {/*    changeTaskTitle={changeTaskTitle}*/}
                            {/*    changeTaskStatus={changeTaskStatus}*/}

                            {/*    removeTodoList={removeTodoList}*/}
                            {/*    changeTodoListFilter={changeTodoListFilter}*/}
                            {/*    changeTodoListTitle={changeTodoListTitle}*/}
                            {/*/>*/}
                        </Paper>
                        </Grid>
                    </>
                )
            }
        )
        : <span className={s.emptyList}>Create your first todoList</span>


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{paddingTop: '30px'}}>
                <div className={s.titleList}><b>ADD TODOLIST</b></div>
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4} style={{paddingTop: '20px'}}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

