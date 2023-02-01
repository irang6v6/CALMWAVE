import { useDispatch, useSelector } from "react-redux"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"
import CardFooter from "../CardFooter/CardFooter"
import CardHeader from "../CardHeader/CardHeader"
import styles from "./SelectedTaskCard.module.css"
import {
  dragStart,
  resetStartEnd,
  resetEnd,
  dragEnd,
  dragEnter,
} from "../../../store/door-store/drag-task-slice"

function SelectedTaskCard({ task, idx }) {
  const cardType = "selected-task"
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
    dispatch(selectedTaskActions.addSelectedTask({ newTask: { ...task } }))
  }
  const dragStartHandler = function () {
    dispatch(dragStart(idx, cardType, task))
  }
  const dragExitHandler = function () {
    dispatch(resetEnd())
    console.log("?")
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
      className={`${styles[`selected-task-card-container`]}`}
      onClick={toggleWorkHandler}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragExit={dragExitHandler}
      onDragEnter={dragEnterHandler}
    >
      <CardHeader />
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.businessHours}</div>
      <div>{task.categoryId}</div>
      <CardFooter />
    </div>
  )
}

export default SelectedTaskCard
