import styles from "./SelectedTaskCard.module.css"

function SelectedTaskCard({ task }) {
  return (
    <div className={`${styles[`selected-task-card-container`]}`}>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.businessHours}</div>
    </div>
  )
}

export default SelectedTaskCard
