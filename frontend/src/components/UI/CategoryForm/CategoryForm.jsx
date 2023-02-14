import styles from "./CategoryForm.module.css"
import { memo, useRef } from "react"
import { useInput } from "../../../hooks/custom/useInput"
import { useEffect, useState } from "react"
import { SpinnerDots } from "../Spinner"
import { useDispatch, useSelector } from "react-redux"
// import { submitModal } from "../../../store/door-store/modal-slice"
import axios from "axios"
import {
  // categoryActions,
  AxiosGetCategory,
} from "../../../store/category-slice"
import { closeModal, modalActions } from "../../../store/door-store/modal-slice"
import { AxiosGetTodos } from "../../../store/task-slice"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"
import CateIcon from "../../CateIcon/CateIcon"
import CateIconArray from "../../CateIcon/CateIconArray"

function CategoryForm() {
  const dispatch = useDispatch()
  const { formData, isLoading, isCreate } = useSelector((state) => state.modal)
  const categoryList = useSelector((state) => state.category.categoryList)
  const [titleRef] = [useRef(null)]
  const [colorRef] = [useRef(null)]
  const [titleInput, titleChangeHandler, titleSetTrigger] = useInput(titleRef)
  /* eslint-disable */
  const [colorInput, colorChangeHandler, colorSetTrigger] = useInput(colorRef)
  const [icon, setIcon] = useState(0)
  const FormTitle = isCreate ? `카테고리 생성` : `카테고리 수정`

  const submitHandler = function (event) {
    event.preventDefault()
    if (isLoading) {
      return
    }
    if (!titleInput) {
      window.alert("제목을 입력해주세요")
      dispatch(closeModal())
      return
    }
    if (categoryList.every(item => item.title === titleInput && (!formData || item.id !== formData.id))) {
      window.alert("동일한 제목을 사용할 수 없습니다")
      dispatch(closeModal())
      return
    }
    if (isCreate && titleInput) {
      axios({
        method: "post",
        url: `/v1/category/create`,
        data: {
          cateName: `${titleInput}`,
          cateColor: `${colorInput}`,
          cateIcon: `${icon}`,
          // cateOrder: 0,
        },
      })
        .then((res) => {
          dispatch(modalActions.setNotLoading)
          dispatch(AxiosGetCategory())
        })
        .then(() => {
          dispatch(AxiosGetTodos())
        })

        .then((res) => {
          dispatch(closeModal())
          titleSetTrigger("")
        })
        .then(() => {
          // dispatch(modalActions.toggleIsLoading())
        })
        .catch((err) => {
          window.alert("동일한 제목을 사용할 수 없습니다")
          dispatch(closeModal())
          dispatch(modalActions.setNotLoading())
        })
    } else if (titleInput) {
      axios({
        method: "post",
        url: `/v1/category/update`,
        data: {
          cateColor: `${colorInput}`,
          cateIcon: `${icon}`,
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
          dispatch(AxiosGetTodos())
        })
        .then(() => {
          dispatch(
            selectedTaskActions.updateCategoryChanged({
              cateId: formData.id,
              cate: {
                ...formData,
                cateColor: colorInput,
                title: titleInput,
                cateIcon: icon,
              },
            })
          )
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
      colorSetTrigger(formData?.cateColor || 0)
      setIcon(formData?.category?.cateIcon || formData?.cateIcon || 0)
    },
    [formData, titleSetTrigger]
  )

  return (
    <div className={`${styles[`category-form-container`]}`}>
      <div className={`${styles[`header-text`]}`}>{FormTitle}</div>
      <form
        className={`${styles[`category-form-input-container`]}`}
        onSubmit={submitHandler}
      >
        <label htmlFor="category-title" className={`${styles[`body-text`]}`}>
          title
        </label>
        <input
          ref={titleRef}
          type="text"
          id="category-title"
          onChange={titleChangeHandler}
          className={`${styles[`input-form`]}`}
        />
        <label htmlFor="category-color" className={`${styles[`body-text`]}`}>
          category color
        </label>
        <select
          name="category-color-set"
          id="category-color"
          ref={colorRef}
          onChange={colorChangeHandler}
          className={`bg-cat-${colorInput}`}
        >
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
        </select>
        <div>
          <input type="hidden" />
          {CateIconArray.map((icon) => (
            <button
              key={icon.value}
              onClick={() => setIcon(icon.value)}
              className={`${styles[`icon-button`]}`}
            >
              <CateIcon value={icon.value} />
            </button>
          ))}
        </div>
        <button disabled={isLoading} className={`${styles[`ok-btn`]}`}>
          {isLoading ? <SpinnerDots /> : `완료`}
        </button>
      </form>
    </div>
  )
}

export default memo(CategoryForm)
