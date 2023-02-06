import { useDispatch, useSelector } from "react-redux"
import { useClasses } from "../../../hooks/custom/useClasses"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"
import CardBody from "../CardBody/CardBody"
import CardFooter from "../CardFooter/CardFooter"
import CardHeader from "../CardHeader/CardHeader"
import styles from "./CategoryTaskCard.module.css"
import { useEffect } from "react"

/* eslint-disable */
function CategoryTaskCard({ task, idx }) {
  const cardType = "category-task"
  const dispatch = useDispatch()
  const { selectedTaskList } = useSelector((state) => state.doorstask)
  const [toggleHover, toggleSelect, customSelect, classes] = useClasses(
    styles,
    "task-card-container"
  )
  const selected =
    selectedTaskList.findIndex((val) => val.id === task.id) !== -1

  useEffect(
    function () {
      customSelect(selected)
    },
    [selected]
  )

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
      className={`${classes}`}
      onClick={toggleWorkHandler}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <CardHeader />
      <div>{task.description}</div>
      <div>{task.businessHours}</div>
      <CardBody />
      <CardFooter />
    </div>
  )
}

export default CategoryTaskCard
