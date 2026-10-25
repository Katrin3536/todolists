import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"
import type { TodolistDomain } from "@/features/todolists/lib/types"
import { TasksPagination } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskPagination/TaskPagination"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton"
import List from "@mui/material/List"
import { useState } from "react"

import { TaskItem } from "./TaskItem/TaskItem.tsx"

type Props = {
  todolist: TodolistDomain
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery(
    { todolistId: id, params: { page } },
    {
      // refetchOnFocus: true,
      // refetchOnReconnect: true
      // pollingInterval: 3000,
      // skipPollingIfUnfocused: true,
    },
  )

  let filteredTasks = data?.items
  if (filter === "Active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "Completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>" No tasks"</p>
      ) : (
        <>
          <List>
            {filteredTasks?.map((task) => {
              return <TaskItem key={task.id} task={task} todolistId={id} todolist={todolist} />
            })}
          </List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
