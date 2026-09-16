import { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
  value: string
  onChange: (title: string) => void
  disabled?: boolean
}

export const EditableSpan = ({ value, onChange, disabled = false }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const turnOnEditMode = () => {
    if (disabled) return
    setEditMode(true)
  }

  const turnOffEditMode = () => {
    setEditMode(false)
    onChange(title)
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <>
      {editMode && (
        <TextField
          variant={"outlined"}
          value={title}
          size={"small"}
          onChange={onChangeTitle}
          onBlur={turnOffEditMode}
          autoFocus
        />
      )}
      {!editMode && <span onDoubleClick={turnOnEditMode}>{value}</span>}
    </>
  )
}
