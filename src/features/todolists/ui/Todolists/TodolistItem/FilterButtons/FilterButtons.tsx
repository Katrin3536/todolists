import { useAppDispatch } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import type { FilterValues, TodolistDomain } from "@/features/todolists/lib/types"

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

type Props = {
  todolist: TodolistDomain
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (payload: { todolistId: string; filter: FilterValues }) => {
    const { todolistId, filter } = payload
    // dispatch(changeTodolistFilterAC({ id: todolistId, filter }))
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (todolistsData) => {
        const todolist = todolistsData.find((todolist) => todolist.id === todolistId)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
  }

  return (
    <Box sx={containerSx}>
      <Button
        variant={filter === "All" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilter({ todolistId: id, filter: "All" })}
      >
        All
      </Button>
      <Button
        variant={filter === "Active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter({ todolistId: id, filter: "Active" })}
      >
        Active
      </Button>
      <Button
        variant={filter === "Completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter({ todolistId: id, filter: "Completed" })}
      >
        Completed
      </Button>
      {/*<Button className={filter === 'All' ? 'active-filter' : ''} title="All"*/}
      {/*        onClick={() => changeFilter({todolistId:id, filter:'All'})}/>*/}
      {/*<Button className={filter === 'Active' ? 'active-filter' : ''} title="Active"*/}
      {/*        onClick={() => changeFilter({todolistId:id, filter:'Active'})}/>*/}
      {/*<Button className={filter === 'Completed' ? 'active-filter' : ''} title="Completed"*/}
      {/*        onClick={() => changeFilter({todolistId:id, filter:'Completed'})}/>*/}
    </Box>
  )
}
