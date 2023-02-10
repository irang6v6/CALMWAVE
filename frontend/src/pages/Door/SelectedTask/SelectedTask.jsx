import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import SelectedTaskCard from "../../../components/UI/SelectedTaskCard/SelectedTaskCard"
import styles from "./SelectedTask.module.css"
import { BsFillPlayFill } from "react-icons/bs"
import { todoActions } from "../../../store/todos-slice"
import { selectedTaskActions } from "../../../store/door-store/selected-task-slice"

function SelectedTask() {
  const { selectedTaskList } = useSelector((state) => state.doorstask)
  const categoryList = useSelector((state) => state.category.categoryList)
  const { taskList } = useSelector((state) => state.task)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(selectedTaskActions.recallSelectedTodoTaskList())
  }, [dispatch])

  const sendTodayTodo = () => {
    let todoSend = []
    selectedTaskList.forEach((task) => {
      if (task.column === "To do") {
        todoSend.push({
          ...task,
          startWorkingDate: task.startWorkingDate ? task.startWorkingDate : 0,
          endWorkingDate: task.endWorkingDate ? task.endWorkingDate : 0,
          businessHours: task.businessHours ? task.businessHours : null,
        })
      }
    })
    taskList.forEach((task) => {
      if (task.column === "Done") {
        todoSend.push({
          ...task,
          startWorkingDate: task.startWorkingDate ? task.startWorkingDate : 0,
          endWorkingDate: task.endWorkingDate ? task.endWorkingDate : 0,
          businessHours: task.businessHours ? task.businessHours : null,
        })
      }
    })

    // const localData = JSON.parse(window.localStorage.getItem("todo"))
    // console.log(localData)
    // if (localData) {
    //   if (localData.filter((e) => e.column === "In Progress")[0]) {
    //     console.log(localData.filter((e) => e.column === "In Progress")[0])
    //   }
      // todoSend.push(inProgress)
    // }
    dispatch(todoActions.changeTodos(todoSend))
    localStorage.setItem("todo", JSON.stringify(todoSend))
    localStorage.setItem("category", JSON.stringify(categoryList))
  }
  return (
    <>
      <div className={`${styles[`door-title-container`]}`}>선택한 업무</div>
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
        <NavLink
          to={`/room`}
          className={`${styles[`lets-go-room`]}`}
          onClick={sendTodayTodo}
        >
          <BsFillPlayFill className={`${styles[`play-icon`]}`} />
        </NavLink>
      </div>
    </>
  )
}

export default SelectedTask
