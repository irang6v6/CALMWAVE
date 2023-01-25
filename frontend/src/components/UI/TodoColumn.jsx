import { useDrop } from "react-dnd"
import styles from "./TodoColumn.module.css"
export default function TodoColumn({ children, className, title, progress }) {
  const canMoveTodo = (title) => {
    return (title !== "In Progress") || (progress)
  }

  const [ , drop] = useDrop({
    accept: "Todo",
    canDrop: () => canMoveTodo(title),
    drop: () => ({ name: title }),
  })


  return (
    <div ref={drop} className={`${styles["todobox"]} ${className}`}>
      {title}
      {children}
    </div>
  )
}
