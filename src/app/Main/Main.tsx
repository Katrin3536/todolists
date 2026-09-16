import { CreateItemForm } from "@/common/components"
import { useAppDispatch } from "@/common/hooks"
import { createTodolistTC } from "@/features/todolists/model/todolists-slice"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    // const newTodolist: TodolistType = {id: v1(), title, filter: 'All'};
    dispatch(createTodolistTC(title))
    // setTasks({...tasks, [action.payload.id]: []})
    // setTodolists([newTodolist, ...todolists]);
    // setTasks({...tasks, [newTodolist.id]: []});
  }

  return (
    <Container fixed maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}

// const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
// const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})

// const todolistId1 = v1();
// const todolistId2 = v1();

// const [todolists, setTodolists] = useState<TodolistType[]>([
//     {id: todolistId1, title: 'What to learn', filter: 'All'},
//     {id: todolistId2, title: 'What to buy', filter: 'Active'},
// ]);
//
// const [tasks, setTasks] = useState<Tasks>({
//     [todolistId1]: [
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//     ],
//     [todolistId2]: [
//         {id: v1(), title: 'Rest API', isDone: true},
//         {id: v1(), title: 'GraphQL', isDone: false},
//     ],
// });

// let filteredTasks:TaskProps[] = tasks
//
// if(filter === 'Active') {
//     filteredTasks=tasks.filter(task => !task.isDone)
// }
// if(filter === 'Completed') {
//     filteredTasks=tasks.filter(task => task.isDone)
// }
