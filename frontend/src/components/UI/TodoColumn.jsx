import { useDrop } from "react-dnd"
import { useSelector } from "react-redux"
import styles from "./TodoColumn.module.css"
export default function TodoColumn({ children, className, title}) {
  const progress = useSelector(state => state.todos.onProgress)

  const canMoveTodo = (title) => {
    return (title !== "In Progress") || (!progress)
  }
  const [ , drop] = useDrop({
    accept: "Todo",
    canDrop: () => canMoveTodo(title),
    drop: () => ({ title: title }),
  })


  return (
    <div ref={drop} className={`${styles["todobox"]} ${className}`}>
      {title}
      {children}
    </div>
  )
}
