
import {FilterValues} from './App.tsx';
import {Task} from './Todolist/Todolist.tsx';

export const getFilteredTasks = ( tasks:Task[], filter:FilterValues):Task[]=> {
    switch (filter) {
        case 'Active':
            return tasks.filter(task => !task.isDone)
        case 'Completed':
            return tasks.filter(task => task.isDone)
        default:
            return tasks
    }
}

