import { useDispatch } from "react-redux"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"
import styles from "./CategoryTaskCard.module.css"

function TaskCard({ task }) {
  // const cardType = "category-task"
  const dispatch = useDispatch()
  const toggleWorkHandler = function () {
    dispatch(
      selectedTaskActions.addSelectedTask({
        newTask: {
          ...task,
        },
      })
    )
  }
  return (
    <div
      className={`${styles[`task-card-container`]}`}
      onClick={toggleWorkHandler}
      onDragStart={() => {
        console.log("드래그")
      }}
      onDragEnter={() => {
        console.log("드래그 상태에서 데이터 확인")
      }}
    >
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.businessHours}</div>
      <div>{task.categoryId}</div>
    </div>
  )
}

export default TaskCard
