import { EditableSpan } from "@/common/components"
import { TaskStatus } from "@/common/enums"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi"
import type { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
import type { TodolistDomain } from "@/features/todolists/lib/types"

import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"

import { getListItemSx } from "./TaskItem.styles.ts"

type Props = {
  task: DomainTask
  todolistId: string
  todolist: TodolistDomain
}

export const TaskItem = ({ task, todolistId, todolist }: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const domainModel: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  }

  const deleteTaskHandler = () => {
    deleteTask({ todolistId: todolistId, taskId: task.id })
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    updateTask({ todolistId, taskId: task.id, model: { ...domainModel, status } })
  }
  const changeTaskTitleHandler = (title: string) => {
    updateTask({ todolistId: todolistId, taskId: task.id, model: { ...domainModel, title } })
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={todolist.entityStatus === "loading"}
        />
        {/*<input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>*/}
        <EditableSpan
          value={task.title}
          onChange={changeTaskTitleHandler}
          disabled={todolist.entityStatus === "loading"}
        />
      </div>
      <IconButton onClick={deleteTaskHandler} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
