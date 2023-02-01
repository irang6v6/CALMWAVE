import styles from "./CategoryForm.module.css"
import { memo, useRef } from "react"
import { useInput } from "../../../hooks/custom/useInput"
import { useEffect } from "react"
import useApi from "../../../hooks/http/use-api"
import { SpinnerDots } from "../Spinner"

function CategoryForm({ data, isOpen, toggleIsOpen }) {
  const [titleRef, descriptionRef] = [useRef(null), useRef(null)]
  /* eslint-disable */
  const [
    [titleInput, titleChangeHandler, titleSetTrigger],
    [descriptionInput, descriptionChangeHandler, descriptionSetTrigger],
  ] = [useInput(titleRef), useInput(descriptionRef)]

  /* eslint-disable */
  const [submitLoading, submitError, AxiosSubmitRequest] = useApi()

  useEffect(
    function () {
      titleSetTrigger(data?.title || "")
      descriptionSetTrigger(data?.description || "")
    },
    [isOpen, data, titleSetTrigger, descriptionSetTrigger]
  )

  const onSubmitHandler = function (event) {
    event.preventDefault()
    // 여기에는 axios 통신 or Action Creator
    // 혹은 redux나 local data 편집 hooks
    AxiosSubmitRequest(
      { method: "get", url: "/asdf", timeout: 2000 },
      (res) => {
        console.log("response 받았을 때 처리해주는 함수", res)
      }
    )
      .then(() => {
        console.log("여기서 모달에서 쓰는 데이터 정리. 응답은 없음.")
      })
      .then(() => {
        toggleIsOpen()
      })
  }

  return (
    <div className={`${styles[`category-form-container`]}`}>
      <div>카테고리 수수정정</div>
      <form
        className={`${styles[`category-form-input-container`]}`}
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="category-title">title</label>
        <input
          ref={titleRef}
          type="text"
          id="category-title"
          onChange={titleChangeHandler}
        />
        <label htmlFor="category-description">description</label>
        <input
          ref={descriptionRef}
          type="text"
          id="category-description"
          onChange={descriptionChangeHandler}
        />
        <button>{submitLoading ? <SpinnerDots /> : `완료`}</button>
      </form>
    </div>
  )
}

export default memo(CategoryForm)
