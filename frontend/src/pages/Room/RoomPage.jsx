import React from "react"
import { useSelector } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import styles from "./RoomPage.module.css"
import TodoColumn from "../../components/UI/TodoColumn"
import TodoCard from "../../components/UI/TodoCard"
import HandleTodo from "../../components/UI/HandleTodo"
import Video from "../../components/Video/Video"

export const RoomPage = () => {
  const todos = useSelector((state) => state.todos.todos)

  const alignTodosInColumn = (columnName) => {
    return todos
      .filter((todo) => todo.column === columnName)
      .map((todo, index) => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          title={todo.title}
          currentColumn={todo.column}
          description={todo.description}
          index={index}
          time={todo.time}
        />
      ))
  }

  return (
    <>
      <HandleTodo></HandleTodo>
      <div className={`${styles["container"]}`}>
        <DndProvider backend={HTML5Backend}>
          <div>
            <Video>
            </Video>
            <TodoColumn title="To do" className={`bg-cw-indigo-7`}>
              {alignTodosInColumn("To do")}
            </TodoColumn>
          </div>
          <TodoColumn title="In Progress" className={`bg-cw-yellow-5`}>
            {alignTodosInColumn("In Progress")}
          </TodoColumn>
          <TodoColumn title="Done" className={`bg-wb-mint-4`}>
            {alignTodosInColumn("Done")}
          </TodoColumn>
        </DndProvider>
      </div>
    </>
  )
}

export default RoomPage
