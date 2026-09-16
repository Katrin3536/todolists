import { TaskPriority, TaskStatus } from "@/common/enums"
import { baseResponseSchema } from "@/common/types"

import { z } from "zod/v4"

export type DomainTask = z.infer<typeof tasksSchema>

export type GetTasksResponse = z.infer<typeof getTasksSchema>

export const tasksSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.iso.datetime().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.iso.datetime({ local: true }),
})

export const getTasksSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number().int().nonnegative(),
  items: tasksSchema.array(),
})

//create and update tasks
export const taskOperationResponseSchema = baseResponseSchema(
  z.object({
    item: tasksSchema,
  }),
)
export type TaskOperationResponse = z.infer<typeof taskOperationResponseSchema>

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
