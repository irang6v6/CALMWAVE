import styles from "./Door.module.css"
import SelectedTask from "./SelectedTask/SelectedTask"
import Category from "./Category/Category"
import CategoryTask from "./CategoryTask/CategoryTask"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Modal from "../../components/UI/Modal"
import { useState } from "react"
import CategoryForm from "../../components/UI/CategoryForm/CategoryForm"

function Door(props) {
  const [isModal, setIsModal] = useState(false)
  const [isTask, setIsTask] = useState(false)
  const [formData, setFormData] = useState(null)
  const settingModalHandler = function (ctBool, ctData) {
    setIsTask(ctBool)
    if (ctData) {
      setFormData(ctData)
    } else {
      setFormData(null)
    }
  }
  const toggleModalIsOpenHandler = function () {
    setIsModal((val) => !val)
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Modal isOpen={isModal} toggleIsOpen={toggleModalIsOpenHandler}>
        {isTask ? null : (
          <CategoryForm
            data={formData}
            isOpen={isModal}
            toggleIsOpen={toggleModalIsOpenHandler}
          />
        )}
      </Modal>
      <div ref={props.refVal} className={`${styles[`door-container`]}`}>
        <div className={`${styles[`cam-epic-container`]}`}>
          <Category
            settingModal={settingModalHandler}
            openModal={toggleModalIsOpenHandler}
          />
        </div>
        <div className={`${styles[`task-container`]}`}>
          <CategoryTask
            settingModal={settingModalHandler}
            openModal={toggleModalIsOpenHandler}
          />
        </div>
        <div className={`${styles[`selected-container`]}`}>
          <SelectedTask
            settingModal={settingModalHandler}
            openModal={toggleModalIsOpenHandler}
          />
        </div>
      </div>
    </DndProvider>
  )
}

export default Door
