import CategoryTaskCard from "../../../components/UI/CategoryTaskCard/CategoryTaskCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./CategoryTask.module.css"
import { categoryTaskActions } from "../../../store/door-store/category-task-slice"
import { BsPlusLg } from "react-icons/bs"
import { modalActions } from "../../../store/door-store/modal-slice"
import { openTaskModal } from "../../../store/door-store/modal-slice"
import { useClasses } from "../../../hooks/custom/useClasses"

function CategoryTask(props) {
  const dispatch = useDispatch()
  const { categoryTaskList } = useSelector((state) => state.doorctask)
  const selectedCategoryId = useSelector(
    (state) => state.category.selectedCategoryId
  )
  /* eslint-disable */
  const [
    toggleAllTabhover,
    toggleAllTabSelect,
    customAllTabSelect,
    AlltabClasses,
  ] = useClasses(styles, `tab-item`)
  const [
    toggleTodoTabhover,
    toggleTodoTabSelect,
    customTodoTabSelect,
    TodotabClasses,
  ] = useClasses(styles, `tab-item`)
  const [
    toggleCompleteTabhover,
    toggleCompleteTabSelect,
    customCompleteTabSelect,
    CompletetabClasses,
  ] = useClasses(styles, `tab-item`)

  const [selectedState, setSelectedState] = useState(null)
  useEffect(function () {
    customAllTabSelect(true)
  }, [])

  const originalTaskList = useSelector((state) => state.task.taskList)
  // console.log(originalTaskList)

  const selectAll = function () {
    setSelectedState(() => null)
    customAllTabSelect(true)
    customCompleteTabSelect(false)
    customTodoTabSelect(false)
  }
  const selectTodo = function () {
    setSelectedState(() => "To do")
    customAllTabSelect(false)
    customCompleteTabSelect(false)
    customTodoTabSelect(true)
  }
  const selectDone = function () {
    setSelectedState(() => "DONE")
    customAllTabSelect(false)
    customCompleteTabSelect(true)
    customTodoTabSelect(false)
  }

  useEffect(
    function () {
      dispatch(
        categoryTaskActions.getCategoryTask({
          newList:
            selectedState === null
              ? originalTaskList.filter((task) => {
                  return task.categoryId === selectedCategoryId
                })
              : selectedState === "To do"
              ? originalTaskList.filter((task) => {
                  return (
                    task.categoryId === selectedCategoryId &&
                    task.column === "To do"
                  )
                })
              : originalTaskList.filter((task) => {
                  return (
                    task.categoryId === selectedCategoryId &&
                    task.column === "Done"
                  )
                }),
        })
      )
    },
    [selectedCategoryId, originalTaskList, dispatch, selectedState]
  )

  const openCreateTaskModal = function () {
    dispatch(modalActions.resetFormData())
    dispatch(modalActions.setIsCreate())
    dispatch(openTaskModal())
  }

  return (
    <>
      <div className={`${styles[`door-title-container`]}`}>
        해당 카테고리의 업무들
      </div>
      <div className={`${styles[`epic-task-container`]}`}>
        <div className={`${styles[`door-tab-container`]}`}>
          <div className={AlltabClasses} onClick={selectAll}>
            모두
          </div>
          <div className={TodotabClasses} onClick={selectTodo}>
            미완료
          </div>
          <div className={CompletetabClasses} onClick={selectDone}>
            완료
          </div>
        </div>
        {categoryTaskList.map((task, idx) => {
          return (
            <CategoryTaskCard
              task={task}
              idx={idx}
              key={`task-card-${task.categoryId}-${task.id}`}
            />
          )
        })}
        <div
          className={`${styles[`create-task`]}`}
          onClick={openCreateTaskModal}
        >
          <BsPlusLg className={`${styles[`play-icon`]}`} />
        </div>
      </div>
    </>
  )
}

export default CategoryTask
