import { useDrop } from "react-dnd"
import styles from "./TodoColumn.module.css"
export default function TodoColumn({ children, className, title }) {
  const [, drop] = useDrop({
    accept: "Todo",
    drop: () => ({ name: title }),
  })

  return (
    <div ref={drop} className={`${styles["todobox"]} ${className}`}>
      {title}
      {children}
    </div>
  )
}
