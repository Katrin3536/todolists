import './App.css';
import {Task, Todolist} from '../Todolist/Todolist.tsx';
import { useState} from 'react';
import {getFilteredTasks} from '../utils.ts';
import {CreateItemForm} from '../CreateItemForm.tsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {NavButton} from '../NavButton.ts';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import {containerSx} from '../Todolist/Todolist.styles.ts';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC, deleteTodolistAC,
} from '../model/todolists-reducer.ts';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
} from '../model/tasks-reducer.ts';
import {useAppDispatch} from '../common/hooks/useAppDispatch.ts';
import {useAppSelector} from '../common/hooks/useAppSelector.ts';
import {selectTodolists} from '../model/todolists-selectors.ts';
import {selectTasks} from '../model/tasks-selectors.ts';

type ThemeMode = 'dark' | 'light'

export type FilterValues = 'All' | 'Completed' | 'Active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export type Tasks = Record<string, Task[]>

// const todolistId1 = v1();
// const todolistId2 = v1();

export const App = () => {


    // const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()
    // const [todolists, setTodolists] = useState<TodolistType[]>([
    //     {id: todolistId1, title: 'What to learn', filter: 'All'},
    //     {id: todolistId2, title: 'What to buy', filter: 'Active'},
    // ]);
    //
    // const [tasks, setTasks] = useState<Tasks>({
    //     [todolistId1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ],
    // });

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    });

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const deleteTask = (payload: { todolistId: string, taskId: string }) => {
        const {todolistId, taskId} = payload;
        dispatch(deleteTaskAC({todolistId, taskId}))
        // setTasks((prevState: Tasks) => ({
        //     ...prevState,
        //     [todolistId]: prevState[todolistId].filter(t => t.id !== taskId)
        // }));
    };


    // let filteredTasks:TaskProps[] = tasks
    //
    // if(filter === 'Active') {
    //     filteredTasks=tasks.filter(task => !task.isDone)
    // }
    // if(filter === 'Completed') {
    //     filteredTasks=tasks.filter(task => task.isDone)
    // }


    const changeFilter = (payload: { todolistId: string, filter: FilterValues }) => {
        const {todolistId, filter} = payload;
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
        // const newTodolists = (prevState: TodolistType[]) => prevState.map(tl => tl.id === todolistId ? {
        //     ...tl,
        //     filter: filter
        // } : tl);
        // setTodolists(newTodolists);
    };

    const createTask = (payload: { todolistId: string, title: string }) => {
        const {todolistId, title} = payload;
        // const newTask: Task = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // };
        // const newTasks = (prevState: Tasks) => ({...prevState, [todolistId]: [newTask, ...prevState[todolistId]]});
        // setTasks(newTasks);
        dispatch(createTaskAC({todolistId, title}))
    };

    const changeTaskStatus = (payload: { todolistId: string, taskId: string, status: boolean }) => {
        const {todolistId, taskId, status} = payload;
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone: status}))
        // setTasks((prevState: Tasks) => ({
        //     ...prevState,
        //     [todolistId]: prevState[todolistId].map(task => task.id === taskId ? {...task, isDone: status} : task)
        // }));
    };

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC({id:todolistId})
        dispatch(action)
        // setTodolists((prevState: TodolistType[]) => prevState.filter(tl => tl.id !== todolistId));
        // delete tasks[todolistId];
        // setTasks({...tasks});
    };

    const createTodolist = (title: string) => {

        // const newTodolist: TodolistType = {id: v1(), title, filter: 'All'};
        const action = createTodolistAC(title)
        dispatch(action)
        // setTasks({...tasks, [action.payload.id]: []})
        // setTodolists([newTodolist, ...todolists]);
        // setTasks({...tasks, [newTodolist.id]: []});
    };

    const changeTaskTitle = (payload: { todolistId: string, taskId: string, title: string }) => {
        const {todolistId, taskId, title} = payload;
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
        // setTasks((prevState: Tasks) => ({
        //     ...prevState,
        //     [todolistId]: prevState[todolistId].map(task => task.id === taskId ? {...task, title} : task)
        // }));
    };


    const changeTodolistTitle = (payload: { todolistId: string, title: string }) => {
        const {todolistId, title} = payload;
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
        // setTodolists((prevState: TodolistType[]) => prevState.map(tl => tl.id === todolistId ? {...tl, title} : tl));
    };

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div style={{marginLeft: 'auto', display: 'flex', gap: '10px'}}>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode} />
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container fixed maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(tl => {
                            return (
                                <Grid key={tl.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <Todolist
                                            todolist={tl}
                                            // tasks={filteredTasks}
                                            tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                                            deleteTask={deleteTask}
                                            changeFilter={changeFilter}
                                            createTask={createTask}
                                            changeTaskStatus={changeTaskStatus}
                                            deleteTodolist={deleteTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>);
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
};

