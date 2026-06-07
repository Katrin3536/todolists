import {Button} from '../Button.tsx';
import {FilterValues, TodolistType} from '../App.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

export type Task = {
    id: string,
    title: string,
    isDone: boolean,
}

type Props = {
    tasks: Task[],
    deleteTask: (todolistId: string, taskId: Task['id']) => void,
    changeFilter: (todolistId: string, filter: FilterValues) => void,
    createTask: (todolistId: string, title: string) => void,
    changeTaskStatus: (todolistId: string, taskId: Task['id'], status: Task['isDone']) => void,
    todolist: TodolistType
    deleteTodolist: (todolistId: string) => void,
}


export const Todolist = (
    {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist
    }: Props) => {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const mappedTasks = tasks.length === 0 ? (<p>" No tasks"</p>) :
        (<ul>{tasks.map((t) => {
                const deleteTaskHandler = () => {
                    deleteTask(id, t.id);
                };
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(id, t.id, e.currentTarget.checked);

                };
                return (<li key={t.id} className={t.isDone ? 'is-done' : 'task'}>
                    <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                    <span>{t.title}</span>
                    <Button title={'x'} onClick={deleteTaskHandler}/>
                </li>);
            })}
            </ul>
        );

    // const inputRef = useRef<HTMLInputElement>(null);

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim();
        if (trimmedTitle != '') {
            createTask(id, trimmedTitle);
            setTaskTitle('');
        } else {
            setError('Title is required');
        }
    };

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
        setError(null);
    };

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // if (e.key === 'Enter' && isTitleValid) {
        if (e.key === 'Enter') {
            createTaskHandler();
        }
    };

    // const isTitleValid = taskTitle.length>0 && taskTitle.length <10

    const deleteTodolistHandler=()=>{
        deleteTodolist(id);
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'+'} onClick={deleteTodolistHandler}/>
            </div>
            <div>
                {/*<Button title={'+'} onClick={()=>{*/}
                {/*    if(inputRef.current){*/}
                {/*        createTask(inputRef.current.value)*/}
                {/*        inputRef.current.value = ""*/}
                {/*    }}}/>*/}
                {/*<input ref={inputRef}/>*/}
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                {/*<Button title={'+'} onClick={createTaskHandler} disabled={!isTitleValid}/>*/}
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
                {/*{!error && taskTitle.length === 0 && <div>Enter task title</div>}*/}
                {/*{!error && isTitleValid &&  <div> Min title length 1 characters</div>}*/}
                {/*{!error && taskTitle.length > 10 && <div style={{color:"red"}}>Max title length 10 characters</div>}*/}
            </div>
            {mappedTasks}
            <div>
                <Button className={filter === 'All' ? 'active-filter' : ''} title="All"
                        onClick={() => changeFilter(id, 'All')}/>
                <Button className={filter === 'Active' ? 'active-filter' : ''} title="Active"
                        onClick={() => changeFilter(id, 'Active')}/>
                <Button className={filter === 'Completed' ? 'active-filter' : ''} title="Completed"
                        onClick={() => changeFilter(id, 'Completed')}/>
            </div>

        </div>
    );

};