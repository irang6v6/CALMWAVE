import { useState } from "react"
import { useDispatch } from "react-redux"
import { useDrag } from "react-dnd"
import useAnimation from "../../../hooks/custom/useAnimation"
import { useClasses } from "../../../hooks/custom/useClasses"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"
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

  const [{ isDragging }, drag] = useDrag({
    type: "Task",
    item: { idx, task }, // time
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      console.log(dropResult)
      if (dropResult) {
        if (dropResult.title === "selectedTask") {
          return
        }
      }
      close()
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.6 : 1


  return (
    <>
      {isRender && (
        <div
          ref={drag}
          style={{ opacity }}
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
          <div>{task.businessHours}</div>
        </div>
      )}
    </>
  )
}

export default SelectedTaskCard
