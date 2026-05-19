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
    createTask: (title: string) => void
}


export const Todolist = ({title, tasks, deleteTask, changeFilter, createTask}: Props) => {

    const [taskTitle, setTaskTitle] = useState<string>('');

    const mappedTasks = tasks.length === 0 ? (<p>" No tasks"</p>) :
        (<ul>{tasks.map((t) => {
                const deleteTaskHandler = () => {
                    deleteTask(t.id);
                };
                return (<li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button title={'x'} onClick={deleteTaskHandler}/>
                </li>);
            })}
            </ul>
        );

    // const inputRef = useRef<HTMLInputElement>(null);

    const createTaskHandler = () => {
        createTask(taskTitle);
        setTaskTitle('');
    };

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler();
        }
    };

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
                <Button title={'+'} onClick={createTaskHandler}/>
                <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={createTaskOnEnterHandler}/>
            </div>
            {mappedTasks}
            <div>
                <Button title="All" onClick={() => changeFilter('All')}/>
                <Button title="Active" onClick={() => changeFilter('Active')}/>
                <Button title="Completed" onClick={() => changeFilter('Completed')}/>
            </div>

        </div>
    );

};