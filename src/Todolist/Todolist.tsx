import {FilterValues, TodolistType} from '../app/App.tsx';
import {ChangeEvent} from 'react';
import {CreateItemForm} from '../CreateItemForm.tsx';
import {EditableSpan} from '../EditableSpan.tsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from './Todolist.styles.ts';

export type Task = {
    id: string,
    title: string,
    isDone: boolean,
}

type Props = {
    tasks: Task[],
    deleteTask: (payload: { todolistId: string, taskId: string }) => void,
    changeFilter: (payload: { todolistId: string, filter: FilterValues }) => void,
    createTask: (payload: { todolistId: string, title: string }) => void,
    changeTaskStatus: (payload: { todolistId: string, taskId: string, status: boolean }) => void,
    todolist: TodolistType,
    deleteTodolist: (todolistId: string) => void,
    changeTaskTitle: (payload: { todolistId: string, taskId: Task['id'], title: string }) => void,
    changeTodolistTitle: (payload: { todolistId: string, title: string }) => void,
}


export const Todolist = (
    {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle,
    }: Props) => {


    const mappedTasks = tasks.length === 0 ? (<p>" No tasks"</p>) :
        (<List>{tasks.map((t) => {
                const deleteTaskHandler = () => {
                    deleteTask({todolistId: id, taskId: t.id});
                };
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus({todolistId: id, taskId: t.id, status: e.currentTarget.checked});
                };
                const changeTaskTitleHandler = (title: string) => {
                    changeTaskTitle({todolistId: id, taskId: t.id, title: title});
                };
                return (<ListItem key={t.id} sx={getListItemSx(t.isDone)}>
                    <div>
                        <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        {/*<input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>*/}
                        <EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
                    </div>
                    <IconButton onClick={deleteTaskHandler}>
                        <DeleteIcon/>
                    </IconButton>
                    {/*<Button title={'x'} onClick={deleteTaskHandler}/>*/}
                </ListItem>);
            })}
            </List>
        );

    const createTaskHandler = (title: string) => {
        createTask({todolistId: id, title: title});
    };

    const removeTodolistHandler = () => {
        deleteTodolist(id);
    };

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({todolistId: id, title: title});
    };

    return (
        <div>
            <div className={'container'}>
                <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>

                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>

            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {mappedTasks}
            <Box sx={containerSx}>
                <Button variant={filter === 'All' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilter({todolistId: id, filter: 'All'})}>
                    All
                </Button>
                <Button variant={filter === 'Active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilter({todolistId: id, filter: 'Active'})}>
                    Active
                </Button>
                <Button variant={filter === 'Completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilter({todolistId: id, filter: 'Completed'})}>
                    Completed
                </Button>
                {/*<Button className={filter === 'All' ? 'active-filter' : ''} title="All"*/}
                {/*        onClick={() => changeFilter({todolistId:id, filter:'All'})}/>*/}
                {/*<Button className={filter === 'Active' ? 'active-filter' : ''} title="Active"*/}
                {/*        onClick={() => changeFilter({todolistId:id, filter:'Active'})}/>*/}
                {/*<Button className={filter === 'Completed' ? 'active-filter' : ''} title="Completed"*/}
                {/*        onClick={() => changeFilter({todolistId:id, filter:'Completed'})}/>*/}
            </Box>

        </div>
    );

};