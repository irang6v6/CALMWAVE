import { useState } from "react"
import { useDispatch } from "react-redux"
import useAnimation from "../../../hooks/custom/useAnimation"
import { useClasses } from "../../../hooks/custom/useClasses"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"
import CardFooter from "../CardFooter/CardFooter"
import CardHeader from "../CardHeader/CardHeader"
import styles from "./SelectedTaskCard.module.css"

function SelectedTaskCard({ task, idx }) {
  const cardType = true
  const dispatch = useDispatch()
  /* eslint-disable */
  const [togglehover, toggleselect, customselect, classes] = useClasses(
    styles,
    "selected-task-card-container"
  )
  const [opened, setOpened] = useState(true)
  const [isRender, transitionEnd, transitionTrigger] = useAnimation(opened)
  const close = function () {
    setOpened(false)
    toggleselect()
  }
  const toggleWorkHandler = function () {
    transitionEnd()
    if (!transitionTrigger) {
      dispatch(selectedTaskActions.addSelectedTask({ newTask: { ...task } }))
    }
  }

  return (
    <>
      {isRender && (
        <div
          className={classes}
          // onClick={close}
          onTransitionEnd={toggleWorkHandler}
          onMouseEnter={togglehover}
          onMouseLeave={togglehover}
        >
          <CardHeader
            cardType={cardType}
            data={task}
            deleteSelectedTaskList={close}
          />
          <div>{task.title}</div>
          <div>{task.description}</div>
          <div>{task.businessHours}</div>
          <div>{task.categoryId}</div>
          <CardFooter />
        </div>
      )}
    </>
  )
}

export default SelectedTaskCard
