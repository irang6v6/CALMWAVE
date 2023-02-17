import styles from "./Door.module.css"
import SelectedTask from "./SelectedTask/SelectedTask"
import Category from "./Category/Category"
import CategoryTask from "./CategoryTask/CategoryTask"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import NavIcon from "../../components/NavIcon/NavIcon"
import { useDispatch, useSelector } from "react-redux"
import { AxiosGetCategory } from "../../store/category-slice"
import { useEffect, useState } from "react"
import axios from "axios"
import { AxiosGetTodos } from "../../store/task-slice"
import { useNavigate } from "react-router-dom"

function Door(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const id = useSelector((state) => state.user.userData?.id)
  const [isLogin, setIsLogin] = useState(
    id ? true : false || localStorage.getItem("Access") ? true : false
  )
  /* eslint-disable */
  useEffect(
    function () {
      setIsLogin(() =>
        id
          ? true
          : false ||
            (localStorage.getItem("Access") && localStorage.getItem("Refresh"))
          ? true
          : false
      )
    },
    [id]
  )

  useEffect(
    function () {
      if (!isLogin) {
        navigate("/sign")
      }
    },
    [isLogin]
  )

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
      // dispatch(AxiosGetDones())
    },
    [dispatch]
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <NavIcon />

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
