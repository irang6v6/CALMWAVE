import { useDrop } from "react-dnd"
import { useSelector, useDispatch } from "react-redux"
import styles from "./TodoColumn.module.css"
import { todoActions } from "../../store/todos-slice"
import useApi from "../../hooks/http/use-api"


export default function TodoColumn({ children, className, title }) {
  const todos = useSelector((state) => state.todos.todos)
  const progress = useSelector((state) => state.todos.onProgress)
  /* eslint-disable */
  const [updateStatusLoading, updateStatusError, updateStatus] = useApi()
  const dispatch = useDispatch()

  const canMoveTodo = (title) => {
    return title !== "In Progress" || !progress
  }

  const moveCardColumnHandler = (dragItem, hoverColumn) => {
    const prevState = [...todos]
    dispatch(
      todoActions.changeTodos(
        prevState.map((e) => {
          return {
            ...e,
            column: e.id === dragItem.id ? hoverColumn : e.column,
          }
        })
      )
    )
    if (hoverColumn === "Done") {
      updateStatus({
        method: "post",
        url: "/v1/task/status",
        data: {
          workStatus: "DONE",
          workId: dragItem.id,
        },
      })
    } else if (hoverColumn === "To do") {
      updateStatus({
        method: "post",
        url: "/v1/task/status",
        data: {
          workStatus: "TODO",
          workId: dragItem.id,
        },
      })
    }
  }

  const [, drop] = useDrop({
    accept: "Todo",
    canDrop: () => canMoveTodo(title),
    drop: () => ({ title: title }),
    hover(item, monitor) {
      const dragColumn = item.currentColumn
      const hoverColumn = title
      if (dragColumn === hoverColumn) {
        return
      }
      if (
        hoverColumn === "In Progress" ||
        item.currentColumn === "In Progress"
      ) {
        return
      }
      moveCardColumnHandler(item, hoverColumn)

      item.currentColumn = hoverColumn
    },
  })

  return (
    <div className={`${styles[`box-container`]}`}>
      <div className={`${styles[`title-container`]}`}>
        {title}
      </div>
      <div
        ref={drop}
        className={`${styles["todobox"]}
        ${title === "In Progress" && styles["progressbox"]}
        ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
