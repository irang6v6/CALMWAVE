import TaskCard from "../../../components/UI/TaskCard/TaskCard"
import styles from "./EpicTask.module.css"

function EpicTask({ taskList, clickTask }) {
  return (
    <div className={`${styles[`epic-task-container`]}`}>
      {taskList.map((val) => {
        return (
          <TaskCard
            data={val}
            key={`epic-task-${val.taskId}`}
            clickTask={clickTask}
          />
        )
      })}
    </div>
  )
}

export default EpicTask
