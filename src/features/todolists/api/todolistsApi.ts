import { instance } from "@/common/instance"
import type { DefaultResponse } from "@/common/types"
import type { CreateTodolistResponse, TodolistServer } from "@/features/todolists/api/todolistsApi.types"

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistServer[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { title, id } = payload
    return instance.put<DefaultResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<CreateTodolistResponse>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<DefaultResponse>(`/todo-lists/${id}`)
  },
}
