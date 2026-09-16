import { EditableSpan } from "@/common/components"
import { TaskStatus } from "@/common/enums"
import { useAppDispatch } from "@/common/hooks"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { deleteTaskTC, updateTaskTC } from "@/features/todolists/model/tasks-slice"
import type { TodolistDomain } from "@/features/todolists/model/todolists-slice"
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
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId: todolistId, taskId: task.id }))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC({ todolistId, taskId: task.id, domainModel: { status } }))
  }
  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC({ todolistId: todolistId, taskId: task.id, domainModel: { title } }))
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatus}
          disabled={todolist.entityStatus === "loading"}
        />
        {/*<input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>*/}
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={todolist.entityStatus === "loading"} />
      </div>
      <IconButton onClick={deleteTask} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
