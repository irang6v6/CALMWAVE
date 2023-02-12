import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
  AxiosGetCategory,
  categoryActions,
  // categoryActions,
} from "../../../store/category-slice"
import styles from "./DeleteModalForm.module.css"
import { closeModal } from "../../../store/door-store/modal-slice"
import { AxiosGetTodos } from "../../../store/task-slice"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"
import { todoActions } from "../../../store/todos-slice"

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
          // 삭제되는 친구들ㅇ르 selectedTask에서 제외해줘야 함.
          dispatch(selectedTaskActions.filteringAfterTaskDelete(formData.id))
          dispatch(todoActions.deleteTodo(formData.id))
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
          dispatch(categoryActions.changeSelected({ selectedCategoryId: null }))
        })
        .then(() => {
          // 삭제되는 친구들ㅇ르 selectedTask에서 제외해줘야 함.
          dispatch(
            selectedTaskActions.filteringAfterCategoryDelete(formData.id)
          )
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
        <div className={`${styles[`recheck`]}`}>
          삭제하시겠습니까?
        </div>
        <div
          onClick={deleteCategoryTaskHandler}
          className={`${styles[`delete-btn`]}`}
        >
          삭제하기
        </div>
      </div>
    </>
  )
}

export default DeleteModalForm
