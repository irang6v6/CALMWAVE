import styles from "./CategoryForm.module.css"
import { memo, useRef } from "react"
import { useInput } from "../../../hooks/custom/useInput"
import { useEffect } from "react"
import { SpinnerDots } from "../Spinner"
import { useDispatch, useSelector } from "react-redux"
// import { submitModal } from "../../../store/door-store/modal-slice"
import axios from "axios"
import {
  // categoryActions,
  AxiosGetCategory,
} from "../../../store/category-slice"
import { closeModal, modalActions } from "../../../store/door-store/modal-slice"

function CategoryForm() {
  const dispatch = useDispatch()
  const { formData, isLoading, isCreate } = useSelector((state) => state.modal)
  const [titleRef] = [useRef(null)]
  const [titleInput, titleChangeHandler, titleSetTrigger] = useInput(titleRef)
  const FormTitle = isCreate ? `카테고리 생성` : `카테고리 수정`

  const submitHandler = function (event) {
    event.preventDefault()
    if (isLoading) {
      return
    }
    if (isCreate && titleInput) {
      axios({
        method: "post",
        url: `/v1/category/create`,
        data: {
          cateName: `${titleInput}`,
          cateColor: 0,
          cateIcon: 0,
          // cateOrder: 0,
        },
      })
        .then((res) => {
          dispatch(modalActions.setNotLoading)
          dispatch(AxiosGetCategory())
        })
        .then((res) => {
          dispatch(closeModal())
          titleSetTrigger("")
        })
        .then(() => {
          // dispatch(modalActions.toggleIsLoading())
        })
        .catch((err) => {
          console.log(err, "<<<<<<<<<<<<")
          dispatch(modalActions.setNotLoading())
        })
    } else if (titleInput) {
      axios({
        method: "post",
        url: `/v1/category/update`,
        data: {
          cateColor: 0,
          cateIcon: 0,
          cateName: `${titleInput}`,
          cateId: formData?.id,
          // cateOrder: 0,
        },
      })
        .then((res) => {
          dispatch(AxiosGetCategory())
        })
        .then(() => {
          dispatch(closeModal())
        })
        .then(() => {
          titleSetTrigger("")
          dispatch(modalActions.toggleIsLoading())
        })
        .catch((err) => {
          dispatch(modalActions.toggleIsLoading())
          console.log(err)
        })
    }
  }

  useEffect(
    function () {
      titleSetTrigger(formData?.title || "")
    },
    [formData, titleSetTrigger]
  )

  return (
    <div className={`${styles[`category-form-container`]}`}>
      <div>{FormTitle}</div>
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
        <button disabled={isLoading}>
          {isLoading ? <SpinnerDots /> : `완료`}
        </button>
      </form>
    </div>
  )
}

export default memo(CategoryForm)
