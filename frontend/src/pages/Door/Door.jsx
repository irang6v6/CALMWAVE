import styles from "./Door.module.css"
import SelectedTask from "./SelectedTask/SelectedTask"
import Category from "./Category/Category"
import CategoryTask from "./CategoryTask/CategoryTask"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Modal from "../../components/UI/Modal"
import NavIcon from "../../components/NavIcon/NavIcon"
import { useDispatch } from "react-redux"
import { AxiosGetCategory } from "../../store/category-slice"
import { useEffect } from "react"
import axios from "axios"
import { AxiosGetTodos, AxiosGetDones } from "../../store/task-slice"

function Door(props) {
  const dispatch = useDispatch()
  useEffect(
    function () {
      if (localStorage.getItem("Access")) {
        axios.defaults.headers.common["AccessToken"] =
          localStorage.getItem("Access")
      }
      if (localStorage.getItem("Refresh")) {
        axios.defaults.headers.common["RefreshToken"] =
          localStorage.getItem("Refresh")
      }
      dispatch(AxiosGetCategory())
      dispatch(AxiosGetTodos())
      dispatch(AxiosGetDones())
    },
    [dispatch]
  )

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
