import { beforeEach, expect, test } from 'vitest'
import type { Tasks } from '../app/App'
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from './tasks-reducer.ts';
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';

let startState: Tasks = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC('New todolist'));

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC({id:'todolistId2'}))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

test('проверка, что значения не равны ожидаемому', () => {
    // ✅ Тест пройден
    expect(5).not.toBe(10) // 5 не равно 10
    expect('hello').not.toContain('world') // строка 'hello' не содержит 'world'
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState,
        deleteTaskAC({ todolistId: 'todolistId2', taskId: '2' })
    )

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false },
        ],
    })
})

test('correct task should be created at correct array', () => {
    const endState = tasksReducer(
        startState,
        createTaskAC({
            todolistId: 'todolistId2',
            title: 'juice',
        })
    )

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe('juice')
    expect(endState.todolistId2[0].isDone).toBe(false)
})

test('проверка, что значение определено', () => {
    // ✅ Тест пройден
    const value = 'определено'
    expect(value).toBeDefined()
})

// test('проверка, что значение не определено', () => {
//     // ❌ Тест не пройдет, потому что value = undefined, т.е. значение не определено
//     const value = undefined
//     expect(value).toBeDefined()
// })

// ✅ Тест пройден
expect({a: 1, b: 2}).toEqual({a: 1, b: 2})

// ❌ Тест не пройдет, потому что сравниваются разные объекты в памяти
// expect({a: 1, b: 2}).toBe({a: 1, b: 2})

test('correct task should change its status', () => {
    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({ todolistId: 'todolistId2', taskId: '2', isDone: false })
    )

    expect(endState['todolistId2'][1].isDone).toBeFalsy()
    expect(endState['todolistId1'][1].isDone).toBeTruthy()

})

test('correct task should change its title', () => {
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({ todolistId: 'todolistId1', taskId: '3', title: 'Redux' })
    )
    expect(endState['todolistId1'][2].title).toBe('Redux')
    expect(endState['todolistId2'][2].title).toBe('tea')
})
