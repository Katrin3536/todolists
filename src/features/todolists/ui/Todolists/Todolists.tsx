import { useAppDispatch } from "@/common/hooks"
import { fetchTodolistsTC, selectTodolists } from "@/features/todolists/model/todolists-slice"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useEffect } from "react"
import { TodolistItem } from "./TodolistItem/TodolistItem.tsx"

import { useAppSelector } from "@/common/hooks/useAppSelector.ts"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
