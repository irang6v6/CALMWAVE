import { useEffect } from "react"
import { useState } from "react"
import ReactDOM from "react-dom"
import styles from "./Modal.module.css"
// import { AiOutlineClose } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
// import { closeModal } from "../../store/door-store/modal-slice"
import { SpinnerDots } from "./Spinner"
import DeleteModalForm from "./DeleteModalForm/DeleteModalForm"
import CategoryForm from "./CategoryForm/CategoryForm"
import TaskForm from "./TaskFrom/TaskForm"

function Modal() {
  const dispatch = useDispatch()
  const { isModal, isTask, isDelete, isLoading, isError, formData, isCreate } =
    useSelector((state) => state.modal)
  const [classes, setClasses] = useState(
    `${styles[`modal-container`]} ${styles[`close`]}`
  )
  const [contentClasses, setContentClasses] = useState(
    `${styles[`modal-content-container`]} ${styles[`close`]}`
  )
  // const [taskCreate]

  useEffect(
    function () {
      if (isModal) {
        setClasses(() => `${styles[`modal-container`]} ${styles[`open`]}`)
        setContentClasses(
          () => `${styles[`modal-content-container`]} ${styles[`open`]}`
        )
      } else {
        setClasses(() => `${styles[`modal-container`]} ${styles[`close`]}`)
        setContentClasses(
          () => `${styles[`modal-content-container`]} ${styles[`close`]}`
        )
      }
    },
    [isModal]
  )
  // const onCloseModal = function () {
  //   dispatch(closeModal())
  // }

  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes}>
          {/* <AiOutlineClose
            className={`${styles[`modal-close-button`]}`}
            onClick={onCloseModal}
          /> */}
          <div className={contentClasses}>
            {isLoading ? (
              <SpinnerDots />
            ) : isError ? (
              <div>에러임</div>
            ) : isDelete ? (
              <DeleteModalForm cardType={isTask} cardId={formData?.id} />
            ) : isTask ? (
              <TaskForm isCreate={isCreate} />
            ) : (
              <CategoryForm isCreate={isCreate} />
            )}
          </div>
        </div>,
        document.getElementById("overlay-root")
      )}
    </>
  )
}

export default Modal
