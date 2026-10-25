import { baseApi } from "@/app/baseApi"
import type { BaseResponse } from "@/common/types"
import type { LoginInputs } from "@/features/auth/model/login.types"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<BaseResponse<{ id: string; email: string; login: string }>, void>({
      query: () => "/auth/me",
    }),
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (payload) => ({
        method: "post",
        url: "auth/login",
        body: payload,
      }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        method: "delete",
        url: "auth/login",
      }),
    }),
    getCaptcha: builder.query<{ url: string }, void>({
      query: () => ({
        method: "get",
        url: "security/get-captcha-url",
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery, useGetCaptchaQuery } = authApi

// export const _authApi = {
//   login(payload: LoginInputs) {
//     return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", payload)
//   },
//   logout() {
//     return instance.delete<BaseResponse>("auth/login")
//   },
//   me() {
//     return instance.get<BaseResponse<{ id: string; email: string; login: string }>>("auth/me")
//   },
// }
