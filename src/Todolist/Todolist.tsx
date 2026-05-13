import {Button} from "../Button.tsx";

export type TaskProps={
    id: number,
    title: string,
    isDone: boolean,
}

type Props = {
    title: string,
    tasks: TaskProps[],
}


export const Todolist=({title,tasks}:Props)=>{


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <Button title={"+"}/>
            </div>
            {tasks.length === 0 ? (<p>" No tasks"</p>) :
                (<ul>{tasks.map((t)=>{
                return <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span></li>
            })}
            </ul>)}
            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>
            </div>
        </div>
    )

}