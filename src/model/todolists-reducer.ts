import {FilterValues, TodolistType} from '../App.tsx';
import {v1} from 'uuid';

const initialState: TodolistType[] = [];


type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | changeTodolistFilterAction

export const todolistsReducer = (prevState: TodolistType[] = initialState, action: Actions): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return prevState.filter(tl => tl.id !== action.payload.id);
        }
        case 'create_todolist': {
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'All'};
            return [newTodolist, ...prevState];
        }
        case 'change_todolist_title': {
            return prevState.map(tl => tl.id === action.payload.id ? {...tl, title:action.payload.title} : tl)
        }
        case 'change_todolist_filter': {
            return prevState.map(tl => tl.id === action.payload.id ? {...tl, filter:action.payload.filter} : tl)
        }
        default:
            return prevState;
    }

};

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const;
};

export const createTodolistAC = (title: string) => {
    const todolistId=v1()
    return {
        type: 'create_todolist',
        payload: {
            title,
            id: todolistId
        }
    } as const;
};

export const changeTodolistTitleAC = (payload:{id: string, title: string}) => {
    return {
        type: 'change_todolist_title',
        payload
    } as const;
};

export const changeTodolistFilterAC = (payload:{id: string, filter: FilterValues}) => {
    return {
        type: 'change_todolist_filter',
        payload
    } as const;
};


export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>