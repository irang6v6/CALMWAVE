import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { BsFillPlayFill } from "react-icons/bs"
import styles from "./RoomPage.module.css"
import TodoColumn from "../../components/UI/TodoColumn"
import TodoCard from "../../components/UI/TodoCard"
// import HandleTodo from "../../components/UI/HandleTodo"
import Video from "../../components/Video/Video"
import NightSky from "../../components/Canvas/NightSky/NightSky"
import { useCustomWidthHeight } from "../../hooks/custom/useCustomWidthHeight"
import { todoActions } from "../../store/todos-slice"

export const RoomPage = () => {
  const todos = useSelector((state) => state.todos.todos)
  const progress = useSelector((state) => state.todos.onProgress)
  const dispatch = useDispatch()
  const doorRef = useRef(null)
  const videoRef = useRef(null)
  const { width, height } = useCustomWidthHeight(doorRef)

  useEffect(() => {
    dispatch(todoActions.recallTodos())
  }, [dispatch])

  useEffect(() => {
    window.localStorage.setItem("todo", JSON.stringify(todos))
  }, [todos])

  const backToHome = () => {
    window.localStorage.removeItem("todo")
  }

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
          startWorkingDate={todo.startWorkingDate}
          endWorkingDate={todo.endWorkingDate}
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
          <div className={`${styles["todo-container"]}`}>
            <TodoColumn title="To do">{alignTodosInColumn("To do")}</TodoColumn>
          </div>
          <div
            className={`${styles["cam-progress-container"]}
          ${progress && styles["cam-progress-container-focused"]}`}
          >
            <div className={`${styles[`cam-container`]}`}>
              <Video videoRef={videoRef} />
            </div>
            <TodoColumn title="In Progress">
              {alignTodosInColumn("In Progress")}
            </TodoColumn>
          </div>
          <div
            className={`${styles["done-container"]}
          ${!progress && styles["done-container-focused"]}`}
          >
            <TodoColumn title="Done">
              {alignTodosInColumn("Done")}
              <NavLink
                to={`/`}
                className={`${styles[`lets-go-home`]}`}
                onClick={backToHome}
              >
                <BsFillPlayFill className={`${styles[`play-icon`]}`} />
              </NavLink>
            </TodoColumn>
          </div>
        </DndProvider>
      </div>
    </>
  )
}

export default RoomPage
