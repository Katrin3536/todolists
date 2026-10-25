import { baseApi } from "@/app/baseApi"
import type { DefaultResponse } from "@/common/types"
import type { CreateTodolistResponse, TodolistServer } from "@/features/todolists/api/todolistsApi.types"
import type { TodolistDomain } from "@/features/todolists/lib/types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<TodolistDomain[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: TodolistServer[]) => {
        return todolists.map((tl) => ({ ...tl, filter: "All", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    createTodolist: builder.mutation<CreateTodolistResponse, string>({
      query: (title) => ({
        method: "post",
        url: "/todo-lists",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<DefaultResponse, string>({
      query: (id) => ({
        method: "delete",
        url: `/todo-lists/${id}`,
      }),
      //1
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
            const index = state.findIndex((todolist) => todolist.id === id)
            if (index !== -1) {
              state.splice(index, 1)
            }
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: builder.mutation<DefaultResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "put",
        url: `/todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useLazyGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi

// export const _todolistsApi = {
//   getTodolists() {
//     return instance.get<TodolistServer[]>("/todo-lists")
//   },
//   changeTodolistTitle(payload: { id: string; title: string }) {
//     const { title, id } = payload
//     return instance.put<DefaultResponse>(`/todo-lists/${id}`, { title })
//   },
//   createTodolist(title: string) {
//     return instance.post<CreateTodolistResponse>("/todo-lists", { title })
//   },
//   deleteTodolist(id: string) {
//     return instance.delete<DefaultResponse>(`/todo-lists/${id}`)
//   },
// }
