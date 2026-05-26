import './App.css';
import {TaskProps, Todolist} from './Todolist/Todolist.tsx';
import {useState} from 'react';
import {getFilteredTasks} from './utils.ts';
import {v1, v4} from 'uuid';

export type FilterValues = 'All' | 'Completed' | 'Active'


export const App = () => {

    const todolistTitle = 'What to read';
    const [tasks, setTasks] = useState<TaskProps[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValues>('All');

    const deleteTask = (taskId: TaskProps['id']) => {
        const filteredTasks: TaskProps[] = tasks.filter(task => task.id !== taskId);
        setTasks(filteredTasks);
    };


    // let filteredTasks:TaskProps[] = tasks
    //
    // if(filter === 'Active') {
    //     filteredTasks=tasks.filter(task => !task.isDone)
    // }
    // if(filter === 'Completed') {
    //     filteredTasks=tasks.filter(task => task.isDone)
    // }


    const changeFilter = (filter: FilterValues) => {
        setFilter(filter);
    };

    const createTask = (title: string) => {
        const newTask: TaskProps = {
            id: v4(),
            title: title,
            isDone: false
        };
        const newTasks: TaskProps[] = [newTask, ...tasks];
        setTasks(newTasks);
    };

    const changeTaskStatus = (taskId: TaskProps['id'], status: TaskProps['isDone']) => {
        // const task = tasks.find(task => task.id === taskId);
        // if (task) {
        //     task.isDone = status;
        //     setTasks([...tasks]);
        // }
        const newState = tasks.map(task=>task.id === taskId?{...task, isDone:status}:task);
        setTasks(newState);
    };

    return (
        <div className="app">
            <Todolist title={todolistTitle}
                // tasks={filteredTasks}
                      tasks={getFilteredTasks(tasks, filter)}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
};

