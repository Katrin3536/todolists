import {Button} from '../Button.tsx';
import {FilterValues, TodolistType} from '../App.tsx';
import {ChangeEvent} from 'react';
import {CreateItemForm} from '../CreateItemForm.tsx';
import {EditableSpan} from '../EditableSpan.tsx';

export type Task = {
    id: string,
    title: string,
    isDone: boolean,
}

type Props = {
    tasks: Task[],
    deleteTask: (payload:{todolistId: string, taskId: Task['id']}) => void,
    changeFilter: (payload:{todolistId: string, filter: FilterValues}) => void,
    createTask: (payload:{todolistId: string, title: string}) => void,
    changeTaskStatus: (payload:{todolistId: string, taskId: Task['id'], status: Task['isDone']}) => void,
    todolist: TodolistType,
    deleteTodolist: (todolistId: string) => void,
    changeTaskTitle: (payload:{todolistId: string, taskId: Task['id'],title: string}) => void,
    changeTodolistTitle: (payload:{todolistId: string, title: string}) => void,
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
        (<ul>{tasks.map((t) => {
                const deleteTaskHandler = () => {
                    deleteTask({todolistId:id,taskId:t.id});
                };
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus({todolistId:id, taskId:t.id,status: e.currentTarget.checked});
                };
                const changeTaskTitleHandler = (title:string) => {
                    changeTaskTitle({todolistId:id, taskId:t.id, title:title});
                }
                return (<li key={t.id} className={t.isDone ? 'is-done' : 'task'}>
                    <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                    <EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
                    <Button title={'x'} onClick={deleteTaskHandler}/>
                </li>);
            })}
            </ul>
        );

    const createTaskHandler = (title:string) => {
        createTask({todolistId:id, title:title});
    }

    const removeTodolistHandler=()=>{
        deleteTodolist(id);
    }

    const changeTodolistTitleHandler = (title:string) => {
        changeTodolistTitle({todolistId:id, title:title});
    }

    return (
        <div>
            <div className={'container'}>
                <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
                <Button title={'+'} onClick={removeTodolistHandler}/>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {mappedTasks}
            <div>
                <Button className={filter === 'All' ? 'active-filter' : ''} title="All"
                        onClick={() => changeFilter({todolistId:id, filter:'All'})}/>
                <Button className={filter === 'Active' ? 'active-filter' : ''} title="Active"
                        onClick={() => changeFilter({todolistId:id, filter:'Active'})}/>
                <Button className={filter === 'Completed' ? 'active-filter' : ''} title="Completed"
                        onClick={() => changeFilter({todolistId:id, filter:'Completed'})}/>
            </div>

        </div>
    );

};