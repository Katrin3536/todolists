import { containerSx } from "@/common/styles"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi"
import { TodolistSkeleton } from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem.tsx"

export const Todolists = () => {
  // const [skip, setSkip] = useState(true)
  // const { data, refetch } = useGetTodolistsQuery(undefined, { skip })
  // const fetchTodosHandler = () => { 1 version
  //   setSkip(false)
  // }

  // const [trigger, { data }] = useLazyGetTodolistsQuery()
  //
  // const fetchTodosHandler = () => { 2 version
  //   trigger()
  // }

  // const { data, isLoading } = useGetTodolistsQuery(undefined, {
  //   // pollingInterval: 1000,
  //   // skipPollingIfUnfocused: true,
  // })

  const { data, isLoading } = useGetTodolistsQuery(undefined, {})

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {/*<button onClick={fetchTodosHandler}>get todolists</button>*/}
      {/*<button onClick={refetch}>get new data </button>*/}
      {data?.map((tl) => {
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
