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
import { closeModal } from "../../../store/door-store/modal-slice"

function CategoryForm({ isCreate }) {
  const dispatch = useDispatch()
  const { formData, isLoading } = useSelector((state) => state.modal)
  const [titleRef] = [useRef(null)]
  const [titleInput, titleChangeHandler, titleSetTrigger] = useInput(titleRef)

  const submitHandler = async function (event) {
    event.preventDefault()
    if (isCreate) {
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
          dispatch(AxiosGetCategory())
        })
        .then((res) => {
          dispatch(closeModal())
        })
        .catch((err) => {
          console.log(err, "<<<<<<<<<<<<")
        })
    } else {
      axios({
        method: "post",
        url: `/v1/category/update`,
        data: {
          cateColor: 0,
          cateIcon: 0,
          cateName: `${titleInput}`,
          cateId: formData.id,
          // cateOrder: 0,
        },
      }).then((res) => {
        dispatch(AxiosGetCategory())
      })
    }
    // dispatch(submitModal())
  }

  useEffect(
    function () {
      titleSetTrigger(formData?.title || "")
    },
    [formData, titleSetTrigger]
  )

  return (
    <div className={`${styles[`category-form-container`]}`}>
      <div>카테고리 수수정정</div>
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

export default memo(CategoryForm)
