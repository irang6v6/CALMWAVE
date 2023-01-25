import React, { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import styles from "./RoomPage.module.css"
import TodoColumn from "../../components/UI/TodoColumn"
import TodoCard from "../../components/UI/TodoCard"

export const RoomPage = () => {
  const [progress, setProgress] = useState(true)
  const [todos, setTodos] = useState([
    { id: 1, name: "알고리즘", column: "To do" },
    { id: 2, name: "React", column: "To do" },
    { id: 3, name: "Redux", column: "To do" },
  ])

  const moveCardHandler = (dragItem, hoverId) => {
    const dragTodo = todos.filter((todo) => todo.id === dragItem.id)[0]
    const dragTodoIndex = todos.indexOf(dragTodo)
    const hoverTodo = todos.filter(
      (todo) => todo.id === hoverId)[0]
    const hoverTodoIndex = todos.indexOf(hoverTodo)
    if (dragTodo) {
      setTodos((prevState) => {
        const coppiedStateArray = [...prevState]

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevTodo = coppiedStateArray.splice(hoverTodoIndex, 1, dragTodo)

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragTodoIndex, 1, prevTodo[0])

        return coppiedStateArray
      })
    }
  }

  const alignTodosInColumn = (columnName) => {
    return todos
      .filter((todo) => todo.column === columnName)
      .map((todo, index) => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          name={todo.name}
          currentColumn={todo.column}
          progress={progress}
          setTodos={setTodos}
          setProgress={setProgress}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ))
  }

  return (
    <>
      <div className={`${styles["container"]}`}>
        <DndProvider backend={HTML5Backend}>
          <TodoColumn title="To do" className={`bg-cw-indigo-7`} progress={progress}>
            {alignTodosInColumn("To do")}
          </TodoColumn>
          <TodoColumn title="In Progress" className={`bg-cw-yellow-5`} progress={progress}>
            {alignTodosInColumn("In Progress")}
          </TodoColumn>
          <TodoColumn title="Done" className={`bg-wb-mint-4`} progress={progress}>
            {alignTodosInColumn("Done")}
          </TodoColumn>
        </DndProvider>
      </div>
    </>
  )
}

export default RoomPage
