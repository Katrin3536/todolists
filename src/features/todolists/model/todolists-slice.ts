import { setAppStatusAC } from "@/app/app-slice"
import { ResultCode } from "@/common/enums"
import { defaultResponseSchema, type RequestStatus } from "@/common/types"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import {
  createTodolistResponseSchema,
  type TodolistServer,
  todolistsSchema,
} from "@/features/todolists/api/todolistsApi.types"

export type FilterValues = "All" | "Completed" | "Active"

export type TodolistDomain = TodolistServer & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as TodolistDomain[],
  selectors: {
    // selectTodolists = (state: RootState): TodolistType[] => state.todolists
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    fetchTodolistsTC: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        // const { dispatch, rejectWithValue } = thunkAPI
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.getTodolists()

          todolistsSchema.array().parse(res.data) // zod

          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(null)
        }
      },
      {
        pending: (_state, _action) => {
          console.log("loading...")
        },
        fulfilled: (_state, action) => {
          console.log("loading finished")
          return action.payload?.todolists.map((tl) => {
            return { ...tl, filter: "All", entityStatus: "idle" }
          })
        },
        rejected: (_state, _action) => {
          console.log("mistake")
        },
        settled: (_state, _action) => {
          console.log("settled")
        },
      },
    ),
    changeTodolistTitleTC: create.asyncThunk(
      async (args: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.changeTodolistTitle(args)

          defaultResponseSchema.parse(res.data)//zod

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return args
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
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state[index].title = action.payload.title
          }
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (id: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
          const res = await todolistsApi.deleteTodolist(id)

          defaultResponseSchema.parse(res.data)//zod

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { id }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }))
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        },
      },
    ),
    changeTodolistEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),
    createTodolistTC: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.createTodolist(title)

          createTodolistResponseSchema.parse(res.data) //zod

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return res.data.data.item
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(null)
        } finally {
          dispatch(setAppStatusAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload, filter: "All", entityStatus: "idle" })
        },
      },
    ),
  }),
})

export const {
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  fetchTodolistsTC,
  changeTodolistTitleTC,
  deleteTodolistTC,
  createTodolistTC,
} = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer
