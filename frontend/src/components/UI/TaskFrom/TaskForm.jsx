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
  AxiosGetDones,
  AxiosGetTodos,
} from "../../../store/task-slice"

function TaskForm() {
  const dispatch = useDispatch()
  const { formData, isLoading, isCreate } = useSelector((state) => state.modal)
  const [titleRef, descriptionRef, dateRef] = [
    useRef(null),
    useRef(null),
    useRef(null),
  ]
  const [titleInput, titleChangeHandler, titleSetTrigger] = useInput(titleRef)
  const [descriptionInput, descriptionChangeHandler, descriptionSetTrigger] =
    useInput(descriptionRef)
  const [dateInput, dateChangeHandler, dateSetTrigger] = useInput(dateRef)
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
          dateAimed: dateInput ? dateInput + `T18:00:00` : "",
          workCateId: selectedCategoryId,
        },
      })
        .then(() => {
          dispatch(AxiosGetTodos())
        })
        .then(() => {
          dispatch(AxiosGetDones())
        })
        .then(() => {
          dispatch(closeModal())
        })
        .then(() => {
          setTimeout(function () {
            dispatch(modalActions.toggleIsLoading())
          }, 400)
        })
    } else {
    }
  }

  useEffect(
    function () {
      titleSetTrigger(formData?.title || "")
      descriptionSetTrigger(formData?.description || "")
      dateSetTrigger(formData?.finishedDate || "")
    },
    [formData, titleSetTrigger, descriptionSetTrigger, dateSetTrigger]
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
        <button>{isLoading ? <SpinnerDots /> : `완료`}</button>
      </form>
    </div>
  )
}

export default memo(TaskForm)
