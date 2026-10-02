import { setAppStatusAC } from "@/app/app-slice"
import { clearDataAC } from "@/common/actions"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { authApi } from "@/features/auth/api/authApi"
import type { LoginInputs } from "@/features/auth/model/login.types"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    login: "Login",
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectLogin: (state) => state.login,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
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
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.logout()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            dispatch(clearDataAC())
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
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
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    initializeAppTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.me()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { isLoggedIn: true, login: res.data.data.login }
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
          state.isLoggedIn = action.payload.isLoggedIn
          state.login = action.payload.login
        },
      },
    ),
  }),
})

export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions
export const { selectIsLoggedIn, selectLogin } = authSlice.selectors
export const authReducer = authSlice.reducer
