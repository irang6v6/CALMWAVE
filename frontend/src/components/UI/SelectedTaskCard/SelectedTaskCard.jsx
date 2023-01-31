import { useDispatch, useSelector } from "react-redux"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"
import CardFooter from "../CardFooter/CardFooter"
import CardHeader from "../CardHeader/CardHeader"
import styles from "./SelectedTaskCard.module.css"

function SelectedTaskCard({ task }) {
  // const cardType = "selected-task"
  const dispatch = useDispatch()

  const toggleWorkHandler = function () {
    dispatch(selectedTaskActions.addSelectedTask({ newTask: { ...task } }))
  }

  return (
    <div
      className={`${styles[`selected-task-card-container`]}`}
      onClick={toggleWorkHandler}
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
