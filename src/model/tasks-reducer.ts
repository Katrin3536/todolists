import type {Tasks} from '../app/App';
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

const initialState: Tasks = {};

export const deleteTaskAC =createAction<{ todolistId: string, taskId: string }>('tasks/delete_task')
export const createTaskAC =createAction<{  todolistId: string, title: string }>('tasks/create_task')
export const changeTaskStatusAC =createAction<{  todolistId: string, taskId: string, isDone: boolean }>('tasks/change_task_status')
export const changeTaskTitleAC =createAction<{  todolistId: string, taskId: string, title: string }>('tasks/change_task_title')

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id]=[];
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task=>task.id === action.payload.taskId);
            if(index !==-1){
                state[action.payload.todolistId].splice(index, 1);
            }
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift({title:action.payload.title, isDone:false, id:nanoid()})
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task=>task.id === action.payload.taskId);
            if(task){
                task.isDone=action.payload.isDone;
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task=>task.id === action.payload.taskId);
            if(task){
                task.title=action.payload.title;
            }
        })

});

// export const tasksReducer = (prevState: Tasks = initialState, action: Actions): Tasks => {
//
//     switch (action.type) {
//         case 'todolists/create_todolist': {
//             return {...prevState, [action.payload.id]: []};
//         }
//         case 'todolists/delete-todolist': {
//             const newState = {...prevState};
//             delete newState[action.payload.id];
//             return newState;
//         }
//         case 'delete_task': {
//             return {
//                 ...prevState,
//                 [action.payload.todolistId]: prevState[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
//             };
//         }
//         case 'create_task': {
//             const newTask: Task = {
//                 id: nanoid(),
//                 title: action.payload.title,
//                 isDone: false
//             };
//             return {...prevState, [action.payload.todolistId]: [newTask, ...prevState[action.payload.todolistId]]};
//         }
//         case 'change_task_status': {
//             return {
//                 ...prevState,
//                 [action.payload.todolistId]: prevState[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
//                     ...task,
//                     isDone: action.payload.isDone
//                 } : task)
//             };
//         }
//         case 'change_task_title': {
//             return {
//                 ...prevState,
//                 [action.payload.todolistId]: prevState[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
//                     ...task,
//                     title: action.payload.title
//                 } : task)
//             };
//         }
//         default:
//             return prevState;
//     }
// };

// export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
//     return {
//         type: 'delete_task',
//         payload
//     } as const;
// };



// export const createTaskAC = (payload: { todolistId: string, title: string }) => {
//     return {
//         type: 'create_task',
//         payload
//     } as const;
// };

// export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
//     return {
//         type: 'change_task_status',
//         payload
//     } as const;
// };
//
// export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
//     return {
//         type: 'change_task_title',
//         payload
//     } as const;
// };


// type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
// type CreateTaskAction = ReturnType<typeof createTaskAC>
// type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
// type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>
//
// type Actions =
//     CreateTodolistAction
//     | DeleteTodolistAction
//     | DeleteTaskAction
//     | CreateTaskAction
//     | ChangeTaskStatusAction
//     | ChangeTaskTitleAction