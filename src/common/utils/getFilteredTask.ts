import { TaskStatus } from "@/common/enums"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { FilterValues } from "@/features/todolists/model/todolists-slice"

export const getFilteredTasks = (tasks: DomainTask[], filter: FilterValues): DomainTask[] => {
  switch (filter) {
    case "Active":
      return tasks.filter((task) => task.status === TaskStatus.New)
    case "Completed":
      return tasks.filter((task) => task.status === TaskStatus.Completed)
    default:
      return tasks
  }
}
