import './App.css';
import {Task, Todolist} from './Todolist/Todolist.tsx';
import {useState} from 'react';
import {getFilteredTasks} from './utils.ts';
import {v1} from 'uuid';

export type FilterValues = 'All' | 'Completed' | 'Active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export type Tasks = Record<string, Task[]>


export const App = () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]);
    const [tasks, setTasks] = useState<Tasks>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    const deleteTask = (todolistId: string, taskId: Task['id']) => {
        setTasks({...tasks, [todolistId]:tasks[todolistId].filter(t=>t.id!==taskId)});
    };


    // let filteredTasks:TaskProps[] = tasks
    //
    // if(filter === 'Active') {
    //     filteredTasks=tasks.filter(task => !task.isDone)
    // }
    // if(filter === 'Completed') {
    //     filteredTasks=tasks.filter(task => task.isDone)
    // }


    const changeFilter = (todolistId:string,filter: FilterValues) => {
        const newTodolist = todolists.map(tl=>tl.id===todolistId? {...tl, filter:filter}:tl);
        setTodolists(newTodolist);
    };

    const createTask = (todolistId:string,title: string) => {
        const newTask: Task = {
            id: v1(),
            title: title,
            isDone: false
        };
        const newTasks = {...tasks, [todolistId]:[newTask,...tasks[todolistId]]};
        setTasks(newTasks);
    };

    const changeTaskStatus = (todolistId: string,taskId: Task['id'], status: Task['isDone']) => {
        // const task = tasks.find(task => task.id === taskId);
        // if (task) {
        //     task.isDone = status;
        //     setTasks([...tasks]);
        // }
        // const newState = tasks.map(task => task.id === taskId ? {...task, isDone: status} : task);
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: status} : task)});
    };

    const deleteTodolist = (todolistId: string)=>{
        setTodolists( todolists.filter(tl=>tl.id!==todolistId) );
        delete tasks[todolistId];
        setTasks({...tasks})
    }

    return (
        <div className="app">
            {todolists.map(tl => {
                return (<Todolist
                    todolist={tl}
                    key={tl.id}
                    // tasks={filteredTasks}
                    tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                    deleteTask={deleteTask}
                    changeFilter={changeFilter}
                    createTask={createTask}
                    changeTaskStatus={changeTaskStatus}
                    deleteTodolist={deleteTodolist}
                />)
            })}

        </div>
    );
};

