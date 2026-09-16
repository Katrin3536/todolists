import { CreateItemForm } from "@/common/components"
import { useAppDispatch } from "@/common/hooks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "./Tasks/Tasks.tsx"
import { FilterButtons } from "./FilterButtons/FilterButtons.tsx"
import { type TodolistDomain } from "../../../model/todolists-slice.ts"
import { createTaskTC } from "../../../model/tasks-slice.ts"

type Props = {
  todolist: TodolistDomain
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskTC({ todolistId: todolist.id, title }))
  }
  //<div inert={todolist.entityStatus === "loading"}>- если надо весь тодолист задизейблить
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}

// const changeTaskStatus = (payload: { todolistId: string, taskId: string, status: boolean }) => {
//     const {todolistId, taskId, status} = payload;
//     dispatch(changeTaskStatusAC({todolistId, taskId, isDone: status}));
//     // setTasks((prevState: Tasks) => ({
//     //     ...prevState,
//     //     [todolistId]: prevState[todolistId].map(task => task.id === taskId ? {...task, isDone: status} : task)
//     // }));
// };

// const changeTaskTitle = (payload: { todolistId: string, taskId: string, title: string }) => {
//     const {todolistId, taskId, title} = payload;
//     dispatch(changeTaskTitleAC({todolistId, taskId, title}));
//     // setTasks((prevState: Tasks) => ({
//     //     ...prevState,
//     //     [todolistId]: prevState[todolistId].map(task => task.id === taskId ? {...task, title} : task)
//     // }));
// };

// const deleteTask = (payload: { todolistId: string, taskId: string }) => {
//     const {todolistId, taskId} = payload;
//     dispatch(deleteTaskAC({todolistId, taskId}));
//     // setTasks((prevState: Tasks) => ({
//     //     ...prevState,
//     //     [todolistId]: prevState[todolistId].filter(t => t.id !== taskId)
//     // }));
// };
