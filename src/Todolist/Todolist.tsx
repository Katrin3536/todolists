import {Button} from '../Button.tsx';
import {FilterValues} from '../App.tsx';

export type TaskProps = {
    id: number,
    title: string,
    isDone: boolean,
}

type Props = {
    title: string,
    tasks: TaskProps[],
    deleteTask: (taskId: number) => void,
    changeFilter:(filter:FilterValues)=>void
}


export const Todolist = ({title, tasks, deleteTask,changeFilter}: Props) => {

    const mappedTasks = tasks.length === 0 ? (<p>" No tasks"</p>) :
        (<ul>{tasks.map((t) => {
                return (<li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button title={'x'} onClick={() => {deleteTask(t.id)}}/>
                        </li>)
                    })}
        </ul>
        );

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <Button title={'+'}/>
            </div>
            {mappedTasks}
            <div>
                <Button title="All" onClick={()=>changeFilter('All')}/>
                <Button title="Active" onClick={()=>changeFilter('Active')}/>
                <Button title="Completed" onClick={()=>changeFilter('Completed')}/>
            </div>

        </div>
    );

};