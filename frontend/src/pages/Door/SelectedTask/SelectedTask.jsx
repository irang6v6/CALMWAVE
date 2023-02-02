import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import SelectedTaskCard from "../../../components/UI/SelectedTaskCard/SelectedTaskCard"
import styles from "./SelectedTask.module.css"
import { BsFillPlayFill } from "react-icons/bs"

function SelectedTask() {
  const { selectedTaskList } = useSelector((state) => state.doorstask)

  return (
    <>
      <div className={`${styles[`door-title-container`]}`}>선택 한 업무들</div>
      <div className={`${styles[`selected-task-container`]}`}>
        {selectedTaskList.map((task, idx) => {
          return (
            <SelectedTaskCard
              task={task}
              idx={idx}
              key={`selected-task-${task.id}`}
            />
          )
        })}
        <NavLink to={`/room`} className={`${styles[`lets-go-room`]}`}>
          <BsFillPlayFill className={`${styles[`play-icon`]}`} />
        </NavLink>
      </div>
    </>
  )
}

export default SelectedTask
