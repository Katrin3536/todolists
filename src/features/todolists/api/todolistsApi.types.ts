import { baseResponseSchema } from "@/common/types"
import { z } from "zod/v4"

export const todolistsSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({ local: true }),
  order: z.number(),
})

export type TodolistServer = z.infer<typeof todolistsSchema>

export const createTodolistResponseSchema = baseResponseSchema(
  z.object({
    item: todolistsSchema,
  }),
)

export type CreateTodolistResponse = z.infer<typeof createTodolistResponseSchema>
