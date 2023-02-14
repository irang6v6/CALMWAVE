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
import { calendarActions } from "../../../store/calendar-slice"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"

function TaskForm() {
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.category.categoryList)
  const { selectedTaskList } = useSelector((state) => state.doorstask)
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

  const beforeStoryPoint = formData?.storyPoint / 3600

  const submitHandler = function (event) {
    event.preventDefault()
    dispatch(modalActions.toggleIsLoading())
    if (!titleInput) {
      window.alert("제목을 입력해주세요")
      dispatch(closeModal())
      return
    }
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
          //
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
      axios({
        method: "post",
        url: `/v1/task/update`,
        data: {
          workId: formData.id,
          title: titleInput,
          description: descriptionInput,
          dateAimed: dateInput ? dateInput?.substring(0, 10) + `T18:00:00` : "", //'T'18:00:00.000'Z'
          timeAimed: storyPointInput || beforeStoryPoint,
          workCateId: categoryInput || selectedCategoryId,
        },
      })
        .then(() => {
          dispatch(AxiosGetTodos())
        })
        .then(() => {
          dispatch(
            selectedTaskActions.updateTaskChanged({
              id: formData.id,
              newTask: {
                ...formData,
                title: titleInput,
                description: descriptionInput,
                storyPoint: parseInt(storyPointInput) * 3600,
                categoryId: categoryInput,
                category: categoryList.filter(
                  (cate) => cate.id === parseInt(categoryInput)
                )[0],
              },
            })
          )
          console.log("카테고리 리스트 : ", categoryList)
          console.log("골라진 doorstask", selectedTaskList)
          console.log("골라진 카테고리 인풋 : ", categoryInput)
          console.log(
            "골라진 id를 기반으로 고른 category : ",
            categoryList.filter(
              (cate) => cate.id === parseInt(categoryInput)
            )[0]
          )
        })
        .then(() => {
          const editedcateID = categoryInput || selectedCategoryId
          const editedData = [
            formData.id,
            titleInput,
            descriptionInput,
            dateInput ? dateInput + `T18:00:00` : "",
            parseInt(storyPointInput) * 3600,
            editedcateID,
          ]
          dispatch(todoActions.editTodo(editedData))
          dispatch(calendarActions.editCalender(editedData))
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
      dateSetTrigger(formData?.finishedDate?.substr(0, 10) || "")
      storyPointSetTrigger(parseInt(formData?.storyPoint / 3600) || 0)
      categorySetTrigger(formData?.categoryId || 0)
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
      <div className={`${styles[`header-text`]}`}>{FormTitle}</div>
      <form
        className={`${styles[`task-form-input-container`]}`}
        onSubmit={submitHandler}
      >
        <label htmlFor="task-title" className={`${styles[`body-text`]}`}>
          Title
        </label>
        <input
          ref={titleRef}
          type="text"
          id="task-title"
          onChange={titleChangeHandler}
          className={`${styles[`input-form`]}`}
        />
        <label htmlFor="task-description" className={`${styles[`body-text`]}`}>
          Description
        </label>
        <input
          ref={descriptionRef}
          type="text"
          id="task-description"
          onChange={descriptionChangeHandler}
          className={`${styles[`input-form`]}`}
        />
        <label htmlFor="task-date" className={`${styles[`body-text`]}`}>
          D-Day
        </label>
        <input
          ref={dateRef}
          type="date"
          id="task-date"
          onChange={dateChangeHandler}
          className={`${styles[`input-form`]}`}
        />

        <label htmlFor="task-storypoint" className={`${styles[`body-text`]}`}>
          Storypoint
        </label>
        <input
          ref={storyPointRef}
          type="number"
          id="task-storypoint"
          onChange={storyPointChangeHandler}
          className={`${styles[`input-form`]}`}
        />

        <label htmlFor="task-category" className={`${styles[`body-text`]}`}>
          카테고리
        </label>
        <select
          ref={categoryRef}
          // type="number"
          id="task-category"
          onChange={categoryChangeHandler}
          value={categoryInput || selectedCategoryId}
          className={`${styles[`input-form`]}`}
        >
          {categoryList.map((cate) => {
            return (
              <option value={cate.id} key={`select-category-${cate.id}`}>
                {cate.title}
              </option>
            )
          })}
        </select>

        <button className={`${styles[`ok-btn`]}`}>
          {isLoading ? <SpinnerDots /> : `완료`}
        </button>
      </form>
    </div>
  )
}

export default memo(TaskForm)
