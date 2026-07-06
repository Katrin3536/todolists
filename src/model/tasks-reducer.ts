import type {Tasks} from '../App';
import {CreateTodolistAction, DeleteTodolistAction} from './todolists-reducer.ts';
import {Task} from '../Todolist/Todolist.tsx';
import {v1} from 'uuid';

const initialState: Tasks = {};

export const tasksReducer = (prevState: Tasks = initialState, action: Actions): Tasks => {
    switch (action.type) {
        case 'create_todolist': {
            return {...prevState, [action.payload.id]: []};
        }
        case 'delete_todolist': {
            const newState = {...prevState};
            delete newState[action.payload.id];
            return newState;
        }
        case 'delete_task': {
            return {
                ...prevState,
                [action.payload.todolistId]: prevState[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            };
        }
        case 'create_task': {
            const newTask: Task = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            };
            return {...prevState, [action.payload.todolistId]: [newTask, ...prevState[action.payload.todolistId]]};
        }
        case 'change_task_status': {
            return {
                ...prevState,
                [action.payload.todolistId]: prevState[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            };
        }
        case 'change_task_title': {
            return {
                ...prevState,
                [action.payload.todolistId]: prevState[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.title
                } : task)
            };
        }
        default:
            return prevState;
    }
};

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {
        type: 'delete_task',
        payload
    } as const;
};

export const createTaskAC = (payload: { todolistId: string, title: string }) => {
    return {
        type: 'create_task',
        payload
    } as const;
};

export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return {
        type: 'change_task_status',
        payload
    } as const;
};

export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
    return {
        type: 'change_task_title',
        payload
    } as const;
};


type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions =
    CreateTodolistAction
    | DeleteTodolistAction
    | DeleteTaskAction
    | CreateTaskAction
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction