import styles from "./Door.module.css"
import SelectedTask from "./SelectedTask/SelectedTask"
import Category from "./Category/Category"
import CategoryTask from "./CategoryTask/CategoryTask"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Modal from "../../components/UI/Modal"
import NavIcon from "../../components/NavIcon/NavIcon"

function Door(props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <NavIcon />
      <Modal />
      <div ref={props.refVal} className={`${styles[`door-container`]}`}>
        <div className={`${styles[`cam-epic-container`]}`}>
          <Category />
        </div>
        <div className={`${styles[`task-container`]}`}>
          <CategoryTask />
        </div>
        <div className={`${styles[`selected-container`]}`}>
          <SelectedTask />
        </div>
      </div>
    </DndProvider>
  )
}

export default Door
