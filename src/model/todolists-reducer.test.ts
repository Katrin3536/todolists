import { beforeEach,expect, test } from 'vitest'
import {TodolistType} from '../App.tsx';
import {v1} from 'uuid';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from './todolists-reducer.ts';

let todolistId1:string;
let todolistId2:string;
let startState:TodolistType[]=[];

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]
})

test('correct todolist should be deleted', () => {

    // 2. Действие
    const action = deleteTodolistAC(todolistId1)

    const endState = todolistsReducer(startState, action)

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)

})

test('correct todolist should be created', () => {

    // 2. Действие
    const action = createTodolistAC('New Todolist')

    const endState = todolistsReducer(startState, action)

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(3)
    // удалится нужный тудулист, не любой
    expect(endState[0].title).toBe('New Todolist')

})

test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title:title}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
    const filter = 'Completed'
    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter}))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(filter)
})