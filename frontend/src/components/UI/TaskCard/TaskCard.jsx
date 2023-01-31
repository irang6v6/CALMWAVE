import { useDispatch } from "react-redux"
import { taskActions } from "../../../store/task-slice"
import styles from "./TaskCard.module.css"

function TaskCard({ task }) {
  const dispatch = useDispatch()
  const toggleWorkHandler = function () {
    dispatch(
      taskActions.changeTaskObjectById({
        taskId: task.id,
        newTask: { ...task, isSelected: !task.isSelected },
      })
    )
  }
  return (
    <div
      className={`${styles[`task-card-container`]}`}
      onClick={toggleWorkHandler}
    >
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.businessHours}</div>
    </div>
  )
}

export default TaskCard
