import { useDispatch, useSelector } from "react-redux"
import {
  dragStart,
  resetStartEnd,
  resetEnd,
  dragEnd,
  dragEnter,
} from "../../../store/door-store/drag-task-slice"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"
import styles from "./CategoryTaskCard.module.css"

function CategoryTaskCard({ task, idx }) {
  const cardType = "category-task"
  const dispatch = useDispatch()
  const {
    dragStartColumn,
    dragStartIdx,
    dragStartTask,
    dragEndColumn,
    dragEndIdx,
    dragEndTask,
  } = useSelector((state) => state.dragtask)

  const toggleWorkHandler = function () {
    dispatch(
      selectedTaskActions.addSelectedTask({
        newTask: {
          ...task,
        },
      })
    )
  }
  const dragStartHandler = function () {
    dispatch(dragStart(idx, cardType, task))
  }
  const dragExitHandler = function () {
    dispatch(resetEnd())
  }
  const dragEnterHandler = function () {
    dispatch(dragEnter(idx, cardType, task))
  }
  const dragEndHandler = function () {
    dispatch(
      dragEnd(
        dragStartColumn,
        dragStartIdx,
        dragStartTask,
        dragEndColumn,
        dragEndIdx,
        dragEndTask
      )
    )
    dispatch(resetStartEnd())
  }

  return (
    <div
      className={`${styles[`task-card-container`]}`}
      onClick={toggleWorkHandler}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragExit={dragExitHandler}
      onDragEnter={dragEnterHandler}
    >
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.businessHours}</div>
      <div>{task.categoryId}</div>
    </div>
  )
}

export default CategoryTaskCard
