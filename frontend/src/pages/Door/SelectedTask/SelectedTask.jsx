import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SelectedTaskCard from "../../../components/UI/SelectedTaskCard/SelectedTaskCard"
import styles from "./SelectedTask.module.css"

function SelectedTask() {
  const [selectedTaskList, setSelectedTaskList] = useState([])
  const originalTaskList = useSelector((state) => state.task.taskList)

  useEffect(
    function () {
      setSelectedTaskList(() => {
        return originalTaskList.filter((task) => {
          return task.isSelected
        })
      })
    },
    [originalTaskList]
  )

  return (
    <div className={`${styles[`selected-task-container`]}`}>
      {selectedTaskList.map((task) => {
        return <SelectedTaskCard task={task} key={`selected-task-${task.id}`} />
      })}
    </div>
  )
}

export default SelectedTask
