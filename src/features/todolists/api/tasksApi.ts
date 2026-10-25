import { baseApi } from "@/app/baseApi"
import { PAGE_SIZE } from "@/common/constants"
import type { DefaultResponse } from "@/common/types"
import type { GetTasksResponse, TaskOperationResponse, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"

type TaskParams = {
  page: number
}

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, { todolistId: string; params: TaskParams }>({
      query: ({ todolistId, params }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      providesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    createTask: builder.mutation<TaskOperationResponse, { todolistId: string; title: string }>({
      query: ({ title, todolistId }) => ({
        method: "post",
        url: `/todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: builder.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        method: "delete",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: builder.mutation<TaskOperationResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>(
      {
        query: ({ todolistId, taskId, model }) => ({
          method: "put",
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          body: model,
        }),
        //1
        async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
          const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")

          let patchResults: any[] = []
          cachedArgsForQuery.forEach(({ params }) => {
            patchResults.push(
              dispatch(
                tasksApi.util.updateQueryData("getTasks", { todolistId, params: { page: params.page } }, (state) => {
                  const index = state.items.findIndex((task) => task.id === taskId)
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...model }
                  }
                }),
              ),
            )
          })
          try {
            await queryFulfilled
          } catch {
            patchResults.forEach((patchResult) => {
              patchResult.undo()
            })
          }
        },
        invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
      },
    ),
  }),
})

export const {
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi

// export const _tasksApi = {
//   getTasks(todolistId: string) {
//     return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
//   },
//   createTask(payload: { todolistId: string; title: string }) {
//     const { title, todolistId } = payload
//     return instance.post<TaskOperationResponse>(`/todo-lists/${todolistId}/tasks`, { title })
//   },
//   updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
//     const { todolistId, taskId, model } = payload
//     return instance.put<TaskOperationResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
//   },
//   deleteTask(payload: { todolistId: string; taskId: string }) {
//     const { todolistId, taskId } = payload
//     return instance.delete<DefaultResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
//   },
// }
