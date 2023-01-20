import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import styles from "./TodoCard.module.css"

export default function TodoCard({
  id,
  name,
  index,
  currentColumn,
  moveCardHandler,
  setTodos,
}) {
  const changeTodoColumn = (currentTodo, columnName) => {
    setTodos((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.id === currentTodo.id ? columnName : e.column,
        }
      })
    })
  }
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: "Todo",
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCardHandler(item, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "Todo",
    item: { index, name, currentColumn, id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult && dropResult.name === "In Progress") {
        changeTodoColumn(item, "In Progress")
      } else if (dropResult && dropResult.name === "Done") {
        changeTodoColumn(item, "Done")
      } else if (dropResult && dropResult.name === "To do") {
        changeTodoColumn(item, "To do")
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.6 : 1

  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={
        currentColumn !== "In Progress"
          ? `${styles["dragable"]} bg-wb-nightsky-8 txt-wb-mint-10`
          : `${styles["ongoing"]} bg-cw-yellow-10`
      }
    >
      <h3>{name}</h3>
      <h3>We will drag this</h3>
    </div>
  )
}
