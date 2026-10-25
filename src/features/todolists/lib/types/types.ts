import type { RequestStatus } from "@/common/types"
import type { TodolistServer } from "@/features/todolists/api/todolistsApi.types"

export type FilterValues = "All" | "Completed" | "Active"

export type TodolistDomain = TodolistServer & {
  filter: FilterValues
  entityStatus: RequestStatus
}
