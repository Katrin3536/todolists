import { beforeEach, expect, test } from "vitest"
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  type TodolistDomain,
  todolistsReducer,
} from "../todolists-slice.ts"
import { nanoid } from "@reduxjs/toolkit"

let todolistId1: string
let todolistId2: string
let startState: TodolistDomain[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: "What to learn", addedDate: "", order: 0, filter: "All", entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", addedDate: "", order: 0, filter: "All", entityStatus: "idle" },
  ]
})

test("correct todolist should be created", () => {
  const newTodolist = { id: "todolistId3", title: "News", addedDate: "", order: 0, filter: "All", entityStatus: "idle" }
  const action = createTodolistTC.fulfilled(newTodolist, "requestId", "New TodolistItem")

  const endState = todolistsReducer(startState, action)

  // 3. Проверка, что действие измененило state соответствующим образом
  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("News")
})

test("correct todolist should change its title", () => {
  const title = "New title"
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleTC.fulfilled({ id: todolistId2, title: title }, "requestId", { id: todolistId2, title: title }),
  )

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(title)
})

test("correct todolist should change its filter", () => {
  const filter = "Completed"
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }))

  expect(endState[0].filter).toBe("All")
  expect(endState[1].filter).toBe(filter)
})

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(
    startState,
    deleteTodolistTC.fulfilled({ id: todolistId1 }, "requestId", todolistId1),
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})
