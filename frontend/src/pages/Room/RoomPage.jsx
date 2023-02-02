import { useRef } from "react"
import { useSelector } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import styles from "./RoomPage.module.css"
import TodoColumn from "../../components/UI/TodoColumn"
import TodoCard from "../../components/UI/TodoCard"
// import HandleTodo from "../../components/UI/HandleTodo"
import Video from "../../components/Video/Video"
import NightSky from "../../components/Canvas/NightSky/NightSky"
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"

export const RoomPage = () => {
  const todos = useSelector((state) => state.todos.todos)
  const doorRef = useRef(null)
  const { width, height } = useCustomWidthHeight(doorRef)

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
      <div className={`${styles[`canvas-container`]}`}>
        <NightSky canvasWidth={width} canvasHeight={height} />
      </div>
      <div ref={doorRef} className={`${styles["todobox-container"]}`}>
        <DndProvider backend={HTML5Backend}>
          <div className={`${styles["cam-todo-container"]}`}>
            <div className={`${styles[`cam-container`]}`}>
              <Video />
            </div>
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
