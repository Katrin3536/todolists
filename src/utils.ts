import {TaskProps} from './Todolist/Todolist.tsx';
import {FilterValues} from './App.tsx';

export const getFilteredTasks = (tasks:TaskProps[], filter:FilterValues):TaskProps[] => {
    switch (filter) {
        case 'Active':
            return tasks.filter(task => !task.isDone)
        case 'Completed':
            return tasks.filter(task => task.isDone)
        default:
            return tasks
    }
}

