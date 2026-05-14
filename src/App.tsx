import './App.css';
import {TaskProps, Todolist} from './Todolist/Todolist.tsx';
import {useState} from 'react';

export type FilterValues= 'All' | 'Completed' | 'Active'


export const App = () => {
    const [tasks, setTasks] = useState<TaskProps[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValues>('All')

    const deleteTask = (taskId: number) => {
        const filteredTasks=tasks.filter(task => task.id !== taskId);
        setTasks(filteredTasks)
    };


    let filteredTasks = tasks

    if(filter === 'Active') {
        filteredTasks=tasks.filter(task => !task.isDone)
    }
    if(filter === 'Completed') {
        filteredTasks=tasks.filter(task => task.isDone)
    }

    const changeFilter =(filter:FilterValues)=>{
        setFilter(filter)
    }

    return (
        <div className="app">
            <Todolist title={'What to read'}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
};

