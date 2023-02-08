import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
  AxiosGetCategory,
  // categoryActions,
} from "../../../store/category-slice"
import styles from "./DeleteModalForm.module.css"
import { closeModal } from "../../../store/door-store/modal-slice"
import { AxiosGetDones, AxiosGetTodos } from "../../../store/task-slice"

function DeleteModalForm({ cardType, cardId }) {
  const dispatch = useDispatch()
  const { formData } = useSelector((state) => state.modal)

  const deleteCategoryTaskHandler = function () {
    if (cardType) {
      // task
      axios({
        method: "post",
        url: "/v1/task/delete",
        data: {
          workId: formData.id,
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
        .catch((err) => {
          console.log("이건 일 지우기 에러임")
        })
    } else {
      // category
      axios({
        method: "post",
        url: `/v1/category/delete`,
        data: {
          cateId: formData.id,
        },
      })
        .then((res) => {
          dispatch(AxiosGetCategory())
        })
        .then(() => {
          dispatch(closeModal())
        })
        .catch((err) => {
          console.log(err, "카테고리 삭제 에러")
        })
    }
  }

  return (
    <>
      <div className={`${styles[`delete-modal-container`]}`}>
        <div>삭제 고?</div>
        <div>삭제 고?</div>
        <div onClick={deleteCategoryTaskHandler}>삭제 버튼임</div>
      </div>
    </>
  )
}

export default DeleteModalForm
