import styles from "./SelectedTask.module.css"

function SelectedTask(props) {
  // console.log(props.selectedTaskList)
  return (
    <div className={`${styles[`selected-task-container`]}`}>
      <div>에픽</div>
      <div>에픽</div>
      <div>에픽</div>
      <div>에픽</div>
    </div>
  )
}

export default SelectedTask
