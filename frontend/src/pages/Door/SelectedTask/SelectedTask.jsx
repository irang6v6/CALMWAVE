import { useSelector } from "react-redux"
import SelectedTaskCard from "../../../components/UI/SelectedTaskCard/SelectedTaskCard"
import styles from "./SelectedTask.module.css"

function SelectedTask() {
  const { selectedTaskList } = useSelector((state) => state.doorstask)

  return (
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
    </div>
  )
}

export default SelectedTask
