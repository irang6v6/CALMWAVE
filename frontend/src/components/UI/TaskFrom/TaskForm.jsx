import styles from "./TaskForm.module.css"
import { memo, useRef } from "react"
import { useInput } from "../../../hooks/custom/useInput"
import { useEffect } from "react"
import { SpinnerDots } from "../Spinner"
import { useDispatch, useSelector } from "react-redux"
import { submitModal } from "../../../store/door-store/modal-slice"

function TaskForm() {
  const dispatch = useDispatch()
  const { formData, isLoading } = useSelector((state) => state.modal)
  const [titleRef] = [useRef(null)]
  const [titleInput, titleChangeHandler, titleSetTrigger] = useInput(titleRef)

  const submitHandler = function (event) {
    event.preventDefault()
    let requestData
    if (formData) {
      requestData = {
        method: "post",
        url: `/v1/task/update/${formData.id}`,
        data: {
          cateColor: ``,
          cateIcon: ``,
          cateName: `${titleInput}`,
          cateOrder: 0,
        },
      }
    } else {
      requestData = {
        method: "post",
        url: `/v1/category/create`,
        data: {
          cateColor: ``,
          cateIcon: ``,
          cateName: `${titleInput}`,
          cateOrder: 0,
        },
      }
    }
    dispatch(submitModal(requestData))
  }

  useEffect(
    function () {
      titleSetTrigger(formData?.title || "")
    },
    [formData, titleSetTrigger]
  )

  return (
    <div className={`${styles[`category-form-container`]}`}>
      <div>태스크 수수정정</div>
      <form
        className={`${styles[`category-form-input-container`]}`}
        onSubmit={submitHandler}
      >
        <label htmlFor="category-title">title</label>
        <input
          ref={titleRef}
          type="text"
          id="category-title"
          onChange={titleChangeHandler}
        />
        <button>{isLoading ? <SpinnerDots /> : `완료`}</button>
      </form>
    </div>
  )
}

export default memo(TaskForm)
