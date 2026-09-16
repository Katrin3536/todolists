import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getFilteredTasks } from "@/common/utils"
import { fetchTasksTC, selectTasks } from "@/features/todolists/model/tasks-slice"
import { useEffect } from "react"
import { type TodolistDomain } from "../../../../model/todolists-slice.ts"
import List from "@mui/material/List"
import { TaskItem } from "./TaskItem/TaskItem.tsx"

type Props = {
  todolist: TodolistDomain
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  const filteredTasks = getFilteredTasks(tasks[id], filter)

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>" No tasks"</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return <TaskItem key={task.id} task={task} todolistId={id} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
