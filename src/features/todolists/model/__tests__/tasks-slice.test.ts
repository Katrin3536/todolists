import { TaskPriority, TaskStatus } from "@/common/enums"
import { beforeEach, expect, test } from "vitest"
import {
  changeTaskStatusTC,
  changeTaskTitleAC,
  createTaskTC,
  deleteTaskTC,
  Tasks,
  tasksReducer,
} from "../tasks-slice.ts"
import { createTodolistTC, deleteTodolistTC } from "../todolists-slice.ts"

let startState: Tasks = {}

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
}

beforeEach(() => {
  startState = {
    todoistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  }
})

test("array should be created for new todolist", () => {
  const newTodolist = { id: "todolistId3", title: "News", addedDate: "", order: 0, filter: "All" }
  const endState = tasksReducer(startState, createTodolistTC.fulfilled(newTodolist, "requestId", "News"))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(3)
  expect(endState["todolistId3"]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, deleteTodolistTC.fulfilled({ id: "todoistId1" }, "requestId", "todoistId1"))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId1"]).toBeUndefined()
})

test("проверка, что значения не равны ожидаемому", () => {
  // ✅ Тест пройден
  expect(5).not.toBe(10) // 5 не равно 10
  expect("hello").not.toContain("world") // строка 'hello' не содержит 'world'
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTaskTC.fulfilled({ todolistId: "todolistId2", taskId: "2" }, "requestId", {
      todolistId: "todolistId2",
      taskId: "2",
    }),
  )

  expect(endState).toEqual({
    todoistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  })
})

test("correct task should be created at correct array", () => {
  const mockTask = {
    id: "new-task-id",
    todoListId: "todolistId2",
    title: "juice",
    status: 0,
    description: "",
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
    priority: 0,
  }

  const endState = tasksReducer(
    startState,
    createTaskTC.fulfilled({ task: mockTask }, "requesId", {
      todolistId: "todolistId2",
      title: "juice",
    }),
  )

  expect(endState.todoistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe("juice")
})

test("проверка, что значение определено", () => {
  // ✅ Тест пройден
  const value = "определено"
  expect(value).toBeDefined()
})

// test('проверка, что значение не определено', () => {
//     // ❌ Тест не пройдет, потому что value = undefined, т.е. значение не определено
//     const value = undefined
//     expect(value).toBeDefined()
// })

// ✅ Тест пройден
expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 })

// ❌ Тест не пройдет, потому что сравниваются разные объекты в памяти
// expect({a: 1, b: 2}).toBe({a: 1, b: 2})

test("correct task should change its status", () => {
  const mockTask = {
    id: "new-task-id",
    todoListId: "todolistId2",
    title: "juice",
    status: 0,
    description: "",
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
    priority: 0,
  }

  const myTask = {
    id: "new-task-id",
    todoListId: "todolistId2",
    title: "juice",
    status: 2,
    description: "",
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
    priority: 0,
  }
  const endState = tasksReducer(startState, changeTaskStatusTC.fulfilled({ task: mockTask }, "requestID", myTask))

  expect(endState["todolistId2"][1].status).toBe(2)
})

test("correct task should change its title", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({ todolistId: "todolistId1", taskId: "3", title: "Redux" }),
  )
  expect(endState["todolistId1"][2].title).toBe("Redux")
  expect(endState["todolistId2"][2].title).toBe("tea")
})
