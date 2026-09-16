import type { GlobalError, RequestStatus } from "@/common/types"
import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as GlobalError,
  },
  selectors: {
    // selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
  reducers: (create) => ({
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

export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError } = appSlice.selectors
export const appReducer = appSlice.reducer

// const initialState = {
//   themeMode: "light" as ThemeMode,
// }

// export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")

// export const appSlice = createReducer(initialState, (builder) => {
//   builder.addCase(changeThemeModeAC, (state, action) => {
//     state.themeMode = action.payload.themeMode
//   })
// })

export type ThemeMode = "dark" | "light"
