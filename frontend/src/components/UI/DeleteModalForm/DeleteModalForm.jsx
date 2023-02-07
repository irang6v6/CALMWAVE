import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
  AxiosGetCategory,
  // categoryActions,
} from "../../../store/category-slice"
import styles from "./DeleteModalForm.module.css"
import { closeModal } from "../../../store/door-store/modal-slice"

function DeleteModalForm({ cardType, cardId }) {
  const dispatch = useDispatch()
  const { formData } = useSelector((state) => state.modal)

  const deleteCategoryTaskHandler = function () {
    if (cardType) {
      // task
      axios({
        method: "post",
        url: "/v1/task/delete",
        data: {},
      })
        .then()
        .catch()
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
          axios({
            method: "get",
            url: `/v1/category/list`,
          })
            .then((res) => {
              dispatch(AxiosGetCategory())
            })
            .then((res) => {
              dispatch(closeModal())
            })
            .catch((err) => {
              console.log(err)
            })
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
