import { EditableSpan } from "@/common/components"
import { useAppDispatch } from "@/common/hooks"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./TodolistTitle.module.css"
import { changeTodolistTitleTC, deleteTodolistTC, type TodolistDomain } from "../../../../model/todolists-slice.ts"

type Props = {
  todolist: TodolistDomain
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    dispatch(deleteTodolistTC(id))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
