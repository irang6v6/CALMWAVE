import styles from "./TaskCard.module.css"

function TaskCard({ data, clickTask }) {
  return (
    <div
      className={`${styles[`task-card-container`]}`}
      onClick={() => {
        clickTask(data.taskId)
      }}
    >
      <div>{data.title}</div>
      <div>{data.description}</div>
      <div>{data.taskId}</div>
    </div>
  )
}

export default TaskCard
