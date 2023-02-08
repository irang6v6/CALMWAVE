import CategoryTaskCard from "../../../components/UI/CategoryTaskCard/CategoryTaskCard"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./CategoryTask.module.css"
import { categoryTaskActions } from "../../../store/door-store/category-task-slice"
import { BsFillPlayFill } from "react-icons/bs"
import { modalActions } from "../../../store/door-store/modal-slice"
import { openTaskModal } from "../../../store/door-store/modal-slice"

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

  const openCreateTaskModal = function () {
    dispatch(modalActions.resetFormData())
    dispatch(openTaskModal())
  }

  return (
    <>
      <div className={`${styles[`door-title-container`]}`}>
        해당 카테고리의 업무들
      </div>
      <div className={`${styles[`epic-task-container`]}`}>
        <form className={`${styles[`door-tab-container`]}`}>
          {/* 여기 아래는 보여주기용 체크박스인 상태. */}
          <div>
            <label htmlFor={`door-tab-daily`}>Daily</label>
            <input type="checkbox" id={`door-tab-daily`}></input>
          </div>
          <div>
            <label htmlFor={`door-tab-weekly`}>Weekly</label>
            <input type="checkbox" id={`door-tab-weekly`}></input>
          </div>
          <div>
            <label htmlFor={`door-tab-monthly`}>Monthly</label>
            <input type="checkbox" id={`door-tab-monthly`}></input>
          </div>
        </form>
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
          <BsFillPlayFill className={`${styles[`play-icon`]}`} />
        </div>
      </div>
    </>
  )
}

export default CategoryTask
