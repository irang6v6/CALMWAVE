import styles from "./Door.module.css"
import SelectedTask from "./SelectedTask/SelectedTask"
import Category from "./Category/Category"
import CategoryTask from "./CategoryTask/CategoryTask"

function Door(props) {
  return (
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
  )
}

export default Door
