import { useDispatch, useSelector } from "react-redux"
import { useClasses } from "../../../hooks/custom/useClasses"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"
import CardBody from "../CardBody/CardBody"
// import CardFooter from "../CardFooter/CardFooter"
import CardHeader from "../CardHeader/CardHeader"
import styles from "./CategoryTaskCard.module.css"
import { useEffect } from "react"

/* eslint-disable */
function CategoryTaskCard({ task, idx }) {
  const cardType = true
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
    if (task.column === "Done") {
      return
    }
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
      className={`${classes}
      ${selected && styles["selected-card"]}`}
      onClick={toggleWorkHandler}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <CardHeader data={task} cardType={cardType} />
      <div className={`${styles["done-tag"]}`}>{task.column === "Done" ? "완료됨" : ""}</div>
      <CardBody data={task} />
      {/* <CardFooter /> */}
    </div>
  )
}

export default CategoryTaskCard
