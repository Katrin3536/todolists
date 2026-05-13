import './App.css'
import {TaskProps, Todolist} from "./Todolist/Todolist.tsx";

export const App=()=> {
  const tasks1:TaskProps[] = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
  ]

  const tasks2:TaskProps[] = [
    { id: 1, title: 'Hello world', isDone: true },
    { id: 2, title: 'I am Happy', isDone: false },
    { id: 3, title: 'Yo', isDone: false },
  ]


  return (
      <div className="app">
        <Todolist title={"What to read"} tasks={tasks1}/>
        <Todolist title={"What to learn"} tasks={tasks2}/>
        <Todolist title={"What to buy"} tasks={tasks1}/>
      </div>
  )
}

