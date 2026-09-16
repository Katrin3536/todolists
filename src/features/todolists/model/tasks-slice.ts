import { setAppStatusAC } from "@/app/app-slice"
import type { RootState } from "@/app/store"
import { ResultCode } from "@/common/enums"
import { defaultResponseSchema } from "@/common/types"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi"
import {
  type DomainTask,
  getTasksSchema,
  taskOperationResponseSchema,
  type UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice.ts"

export type Tasks = Record<string, DomainTask[]>

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as Tasks,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.getTasks(todolistId)

          getTasksSchema.parse(res.data) // zod

          dispatch(setAppStatusAC({ status: "succeeded" }))
          const tasks = res.data.items
          return { tasks: tasks, todolistId: todolistId }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.createTask(payload)

          taskOperationResponseSchema.parse(res.data) //zod

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { task: res.data.data.item }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.deleteTask(payload)

          defaultResponseSchema.parse(res.data) //zod

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return payload
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            state[action.payload.todolistId].splice(index, 1)
          }
        },
      },
    ),
    changeTaskStatusTC: create.asyncThunk(
      async (task: DomainTask, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const model: UpdateTaskModel = {
            status: task.status,
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
          }
          const res = await tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model })
          dispatch(setAppStatusAC({ status: "succeeded" }))

          taskOperationResponseSchema.parse(res.data) //zod

          return { task: res.data.data.item }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
          if (task) {
            task.status = action.payload.task.status
          }
        },
      },
    ),
    updateTaskTC: create.asyncThunk(
      async (
        payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
        { dispatch, getState, rejectWithValue },
      ) => {
        const { todolistId, taskId, domainModel } = payload

        const state = getState() as RootState
        const task = state.tasks[todolistId]?.find((t) => t.id === taskId)

        if (!task) {
          return rejectWithValue("Task not found in state")
        }

        const model: UpdateTaskModel = {
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          ...domainModel,
        }

        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.updateTask({ todolistId, taskId, model })

          taskOperationResponseSchema.parse(res.data) //zod

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { task: res.data.data.item }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.task.todoListId]
          const index = tasks.findIndex((t) => t.id === action.payload.task.id)

          if (index !== -1) {
            tasks[index] = action.payload.task
          }
        },
      },
    ),

    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { createTaskTC, fetchTasksTC, deleteTaskTC, updateTaskTC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer
