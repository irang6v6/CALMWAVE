import axios from "axios"
import styles from "./DeleteModalForm.module.css"

function DeleteModalForm({ cardType, cardId, toggleIsOpen }) {
  const deleteCategoryHandler = function () {
    if (cardType === "category") {
      axios({}).then().catch()
    } else if (cardType === "task") {
      axios({}).then().catch()
    }
    toggleIsOpen()
  }
  return (
    <>
      <div className={`${styles[`delete-modal-container`]}`}>
        <div>삭제 고?</div>
        <div>삭제 고?</div>
        <div onClick={deleteCategoryHandler}>삭제 버튼임</div>
      </div>
    </>
  )
}

export default DeleteModalForm
