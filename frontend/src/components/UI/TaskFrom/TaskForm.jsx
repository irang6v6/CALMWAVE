import styles from "./TaskForm.module.css"
import { memo, useRef } from "react"
import { useInput } from "../../../hooks/custom/useInput"
import { useEffect } from "react"
import { SpinnerDots } from "../Spinner"
import { useDispatch, useSelector } from "react-redux"
import { closeModal, modalActions } from "../../../store/door-store/modal-slice"
import axios from "axios"
import {
  // AxiosGetAllTaskList,
  // AxiosGetDones,
  AxiosGetTodos,
} from "../../../store/task-slice"
import { todoActions } from "../../../store/todos-slice"

function TaskForm() {
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.category.categoryList)
  const { formData, isLoading, isCreate } = useSelector((state) => state.modal)
  const [titleRef, descriptionRef, dateRef, storyPointRef, categoryRef] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]
  const [titleInput, titleChangeHandler, titleSetTrigger] = useInput(titleRef)
  const [descriptionInput, descriptionChangeHandler, descriptionSetTrigger] =
    useInput(descriptionRef)
  const [dateInput, dateChangeHandler, dateSetTrigger] = useInput(dateRef)
  const [storyPointInput, storyPointChangeHandler, storyPointSetTrigger] =
    useInput(storyPointRef)
  const [categoryInput, categoryChangeHandler, categorySetTrigger] =
    useInput(categoryRef)

  const { selectedCategoryId } = useSelector((state) => state.category)
  const FormTitle = isCreate ? `업무 생성` : `업무 수정`

  const submitHandler = function (event) {
    event.preventDefault()
    dispatch(modalActions.toggleIsLoading())
    console.log(isLoading)
    if (isCreate) {
      axios({
        method: "post",
        url: `/v1/task/create`,
        data: {
          title: titleInput,
          description: descriptionInput,
          dateAimed: dateInput ? dateInput + `T18:00:00` : "", //'T'18:00:00.000'Z'
          timeAimed: storyPointInput,
          workCateId: categoryInput || selectedCategoryId,
        },
      })
        .then(() => {
          dispatch(AxiosGetTodos())
        })
        .then(() => {
          // dispatch(AxiosGetDones())
        })
        .then(() => {
          dispatch(closeModal())
        })
        .then(() => {
          setTimeout(function () {
            dispatch(modalActions.setNotLoading())
          }, 400)
        })
        .catch((err) => {
          console.log(err)
          dispatch(closeModal())
        })
    } else {
      console.log(dateInput, categoryInput, selectedCategoryId)
      axios({
        method: "post",
        url: `/v1/task/update`,
        data: {
          workId: formData.id,
          title: titleInput,
          description: descriptionInput,
          dateAimed: dateInput ? dateInput + `T18:00:00` : "", //'T'18:00:00.000'Z'
          timeAimed: storyPointInput,
          workCateId: categoryInput || selectedCategoryId,
        },
      })
        .then(() => {
          dispatch(AxiosGetTodos())
        })
        .then(() => {
          // dispatch(AxiosGetDones())
        })
        .then(() => {
          const editedcateID = categoryInput || selectedCategoryId
          const editedData = [formData.id, titleInput, descriptionInput, dateInput ? dateInput + `T18:00:00` : "", storyPointInput, editedcateID]
          dispatch(todoActions.editTodo(editedData))
        })
        .then(() => {
          dispatch(closeModal())
        })
        .then(() => {
          setTimeout(function () {
            dispatch(modalActions.setNotLoading())
          }, 100)
        })
        .catch((err) => {
          console.log(err)
          dispatch(closeModal())
        })
    }
  }

  useEffect(
    function () {
      titleSetTrigger(formData?.title || "")
      descriptionSetTrigger(formData?.description || "")
      dateSetTrigger(formData?.finishedDate || "")
      storyPointSetTrigger(formData?.finishedDate || 0)
      categorySetTrigger(formData?.finishedDate || 0)
    },
    [
      formData,
      titleSetTrigger,
      descriptionSetTrigger,
      dateSetTrigger,
      storyPointSetTrigger,
      categorySetTrigger,
    ]
  )

  return (
    <div className={`${styles[`task-form-container`]}`}>
      <div>{FormTitle}</div>
      <form
        className={`${styles[`task-form-input-container`]}`}
        onSubmit={submitHandler}
      >
        <label htmlFor="task-title">Title</label>
        <input
          ref={titleRef}
          type="text"
          id="task-title"
          onChange={titleChangeHandler}
        />
        <label htmlFor="task-description">Description</label>
        <input
          ref={descriptionRef}
          type="text"
          id="task-description"
          onChange={descriptionChangeHandler}
        />
        <label htmlFor="task-date">D-Day</label>
        <input
          ref={dateRef}
          type="date"
          id="task-date"
          onChange={dateChangeHandler}
        />

        <label htmlFor="task-storypoint">Storypoint</label>
        <input
          ref={storyPointRef}
          type="number"
          id="task-storypoint"
          onChange={storyPointChangeHandler}
        />

        <label htmlFor="task-category">카테고리</label>
        <select
          ref={categoryRef}
          // type="number"
          id="task-category"
          onChange={categoryChangeHandler}
          value={selectedCategoryId}
        >
          {categoryList.map((cate) => {
            return (
              <option value={cate.id} key={`select-category-${cate.id}`}>
                {cate.title}
              </option>
            )
          })}
        </select>

        <button>{isLoading ? <SpinnerDots /> : `완료`}</button>
      </form>
    </div>
  )
}

export default memo(TaskForm)
