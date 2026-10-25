import type { GlobalError, RequestStatus } from "@/common/types"
import { tasksApi } from "@/features/todolists/api/tasksApi"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as GlobalError,
    isLoggedIn: false,
  },
  selectors: {
    // selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
    selectThemeMode: (state) => state.themeMode,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
  reducers: (create) => ({
    changeIsLogginInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: GlobalError }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
})

export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC, changeIsLogginInAC } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
