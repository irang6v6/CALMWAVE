import TaskCard from "../../../components/UI/TaskCard/TaskCard"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styles from "./CategoryTask.module.css"

function CategoryTask(props) {
  const selectedCategoryId = useSelector(
    (state) => state.category.selectedCategoryId
  )
  const [taskList, setTaskList] = useState([])
  const originalTaskList = useSelector((state) => state.task.taskList)

  useEffect(
    function () {
      setTaskList(() =>
        originalTaskList.filter((task) => {
          return task.categoryId === selectedCategoryId
        })
      )
    },
    [selectedCategoryId, originalTaskList]
  )

  return (
    <div className={`${styles[`epic-task-container`]}`}>
      {taskList.map((task) => {
        return (
          <TaskCard
            task={task}
            key={`task-card-${task.categoryId}-${task.id}`}
          />
        )
      })}
    </div>
  )
}

export default CategoryTask
