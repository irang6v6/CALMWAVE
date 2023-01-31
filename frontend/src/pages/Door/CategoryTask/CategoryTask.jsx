import CategoryTaskCard from "../../../components/UI/CategoryTaskCard/CategoryTaskCard"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./CategoryTask.module.css"
import { categoryTaskActions } from "../../../store/door-store/category-task-slice"

function CategoryTask(props) {
  const dispatch = useDispatch()
  const { categoryTaskList } = useSelector((state) => state.doorctask)
  const selectedCategoryId = useSelector(
    (state) => state.category.selectedCategoryId
  )
  const originalTaskList = useSelector((state) => state.task.taskList)

  useEffect(
    function () {
      dispatch(
        categoryTaskActions.getCategoryTask({
          newList: originalTaskList.filter((task) => {
            return task.categoryId === selectedCategoryId
          }),
        })
      )
    },
    [selectedCategoryId, originalTaskList, dispatch]
  )

  return (
    <div className={`${styles[`epic-task-container`]}`}>
      {categoryTaskList.map((task, idx) => {
        return (
          <CategoryTaskCard
            task={task}
            idx={idx}
            key={`task-card-${task.categoryId}-${task.id}`}
          />
        )
      })}
    </div>
  )
}

export default CategoryTask
