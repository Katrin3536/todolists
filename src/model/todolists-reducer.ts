import {FilterValues, TodolistType} from '../app/App.tsx';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

const initialState: TodolistType[] = [];


// type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | changeTodolistFilterAction

export const deleteTodolistAC =createAction<{ id: string }> ('todolists/deleteTodolist')
export const createTodolistAC =createAction('todolists/createTodolist', (title:string)=>{
    return {payload: {
            title:title,
            id: nanoid()
        }
    }})
export const changeTodolistTitleAC =createAction<{id:string, title:string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC =createAction<{id:string, filter:FilterValues}>('todolists/changeTodolistFilter')

export const todolistsReducer = createReducer(initialState, builder=> {
    builder
        .addCase(deleteTodolistAC,(state, action) => {
            const index =state.findIndex(todolist => todolist.id === action.payload.id)
            if(index !==-1){
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC,(state, action) => {
            state.push({...action.payload, filter:'All'})
        })
        .addCase(changeTodolistTitleAC,(state, action) => {
            const index=state.findIndex(todolist => todolist.id === action.payload.id)
            if(index !== -1){
                state[index].title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC,(state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.id)
            if(todolist){
                todolist.filter = action.payload.filter
            }
        })
})

// export const todolistsReducer = (prevState: TodolistType[] = initialState, action: Actions): TodolistType[] => {
//     switch (action.type) {
//         case 'todolists/delete-todolist': {
//             return prevState.filter(tl => tl.id !== action.payload.id);
//         }
//         case 'todolists/create_todolist': {
//             const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'All'};
//             return [newTodolist, ...prevState];
//         }
//         case 'todolists/change_todolist_title': {
//             return prevState.map(tl => tl.id === action.payload.id ? {...tl, title:action.payload.title} : tl)
//         }
//         case 'todolists/change_todolist_filter': {
//             return prevState.map(tl => tl.id === action.payload.id ? {...tl, filter:action.payload.filter} : tl)
//         }
//         default:
//             return prevState;
//     }
//
// };

// export const deleteTodolistAC = (id: string) => {
//     return {type: 'delete_todolist', payload: {id}} as const;
// };



//
// export const createTodolistAC = (title: string) => {
//     const todolistId=v1()
//     return {
//         type: 'create_todolist',
//         payload: {
//             title,
//             id: todolistId
//         }
//     } as const;
// };



// export const changeTodolistTitleAC = (payload:{id: string, title: string}) => {
//     return {
//         type: 'change_todolist_title',
//         payload
//     } as const;
// };



// export const changeTodolistFilterAC = (payload:{id: string, filter: FilterValues}) => {
//     return {
//         type: 'change_todolist_filter',
//         payload
//     } as const;
// };


// export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
// export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
// export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
// export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>