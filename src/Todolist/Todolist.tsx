import {Button} from '../Button.tsx';
import {FilterValues} from '../App.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TaskProps = {
    id: string,
    title: string,
    isDone: boolean,
}

type Props = {
    title: string,
    tasks: TaskProps[],
    deleteTask: (taskId: TaskProps['id']) => void,
    changeFilter: (filter: FilterValues) => void,
    createTask: (title: string) => void,
    changeTaskStatus: (taskId: TaskProps['id'], status: TaskProps['isDone']) => void,
    filter: FilterValues,
}


export const Todolist = (
    {
        title,
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        filter
    }: Props) => {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    const mappedTasks = tasks.length === 0 ? (<p>" No tasks"</p>) :
        (<ul>{tasks.map((t) => {
                const deleteTaskHandler = () => {
                    deleteTask(t.id);
                };
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newStatusValue = e.currentTarget.checked;
                    changeTaskStatus(t.id, newStatusValue);

                };
                return (<li key={t.id} className={t.isDone ? 'is-done' : ''}>
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
            createTask(trimmedTitle);
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

    return (
        <div>
            <h3>{title}</h3>
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
                {/*{taskTitle.length === 0 && <div>Enter task title</div>}*/}
                {/*{isTitleValid &&  <div> Min title length 1 characters</div>}*/}
                {/*{taskTitle.length > 10 && <div style={{color:"red"}}>Max title length 10 characters</div>}*/}
            </div>
            {mappedTasks}
            <div>
                <Button className={filter === 'All'?'active-filter':""} title="All" onClick={() => changeFilter('All')}/>
                <Button className={filter === 'Active'?'active-filter':""} title="Active" onClick={() => changeFilter('Active')}/>
                <Button className={filter === 'Completed'?'active-filter':""} title="Completed" onClick={() => changeFilter('Completed')}/>
            </div>

        </div>
    );

};