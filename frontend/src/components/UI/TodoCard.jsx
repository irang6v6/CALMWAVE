import { useRef, useState, useEffect } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useSelector, useDispatch } from "react-redux"
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai"
import { todoActions } from "../../store/todos-slice"
import { modalActions } from "../../store/door-store/modal-slice"
import { openTaskModal, openTaskDeleteModal } from "../../store/door-store/modal-slice"
import styles from "./TodoCard.module.css"
import useApi from "../../hooks/http/use-api"
export default function TodoCard({
  todo,
  id,
  title,
  index,
  description,
  currentColumn,
  time,
  startWorkingDate,
  endWorkingDate,
}) {
  const [startTime] = useState(startWorkingDate ? startWorkingDate : Date.now())
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [running] = useState(currentColumn === "In Progress")
  const todos = useSelector((state) => state.todos.todos)
  const dispatch = useDispatch()
  /* eslint-disable */
  const [updateStatusLoading, updateStatusError, updateStatus] = useApi()

  useEffect(() => {
    let interval
    if (running) {
      interval = setInterval(() => {
        setCurrentTime(Date.now())
      }, 10)
    } else if (!running) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [running])

  const openDeleteModal = () => {
    dispatch(modalActions.setFormData({ data:todo }))
    dispatch(openTaskDeleteModal())
  }

  const openModal = () => {
    dispatch(modalActions.setFormData({ data:todo }))
    dispatch(modalActions.setIsTask())
    dispatch(modalActions.setIsUpdate())
    dispatch(openTaskModal())
  }

  const moveCardHandler = (dragItem, hoverId) => {
    const dragTodo = todos.filter((todo) => todo.id === dragItem.id)[0]
    const dragTodoIndex = todos.indexOf(dragTodo)
    const hoverTodo = todos.filter((todo) => todo.id === hoverId)[0]
    const hoverTodoIndex = todos.indexOf(hoverTodo)
    if (dragTodo) {
      const coppiedStateArray = [...todos]

      // remove item by "hoverIndex" and put "dragItem" instead
      const prevTodo = coppiedStateArray.splice(hoverTodoIndex, 1, dragTodo)

      // remove item by "dragIndex" and put "prevItem" instead
      coppiedStateArray.splice(dragTodoIndex, 1, prevTodo[0])

      dispatch(todoActions.changeTodos(coppiedStateArray))
    }
  }

  const changeTodoState = (
    currentTodoId,
    columnName,
    currentTime,
    currentStartTime
  ) => {
    const prevState = todos
    dispatch(
      todoActions.changeTodos(
        prevState.map((e) => {
          return {
            ...e,
            column: e.id === currentTodoId ? columnName : e.column,
            time: e.id === currentTodoId ? currentTime : e.time,
            startWorkingDate:
              e.id === currentTodoId ? currentStartTime : e.startWorkingDate,
          }
        })
      )
    )
  }

  const workPeriodHandler = async function (startTime, endTime) {
    updateStatus({
      method: "post",
      url: "/v1/task/workperiod",
      data: {
        endTime: endTime,
        startTime: startTime,
        workId: id,
      },
    })
  }

  const statusToDoneHandler = async function () {
    updateStatus({
      method: "post",
      url: "/v1/task/status",
      data: {
        workStatus: "DONE",
        workId: id,
      },
    })
  }

  const statusToTodoHandler = async function () {
    updateStatus({
      method: "post",
      url: "/v1/task/status",
      data: {
        workStatus: "TODO",
        workId: id,
      },
    })
  }

  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: "Todo",
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      const hoverId = id
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCardHandler(item, hoverId)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "Todo",
    item: { index, title, currentColumn, id }, // time
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        if (dropResult.title) {
          let now = 0
          if (dropResult.title === "In Progress") {
            now = Date.now()
            dispatch(todoActions.setProgress(true))
          } else if (item.currentColumn === "In Progress") {
            const workPeriodStartPoint = new Date(
              startWorkingDate + 9 * 60 * 60 * 1000
            ).toISOString()
            const workPeriodEndPoint = new Date(
              currentTime + 9 * 60 * 60 * 1000
            ).toISOString()
            workPeriodHandler(workPeriodStartPoint, workPeriodEndPoint)
            dispatch(todoActions.setProgress(false))
          }
          if (dropResult.title === "Done") {
            statusToDoneHandler()
          } else if (dropResult.title === "To do") {
            statusToTodoHandler()
          }
          changeTodoState(
            item.id,
            dropResult.title,
            time + currentTime - startTime,
            now
          )
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.6 : 1

  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={`${styles["todocard"]}
        ${currentColumn === "To do" && styles["todo"]}
        ${currentColumn === "In Progress" && styles["progress"]} 
        ${currentColumn === "Done" && styles["done"]}'
        ${
          currentColumn !== "In Progress"
            ? `bg-wb-nightsky-8 txt-wb-mint-10`
            : `bg-cw-yellow-10`
        }
        `}
    >
      <span>{title}</span>
      <span>{description}</span>
      {currentColumn !== "In Progress" ? (
        <div>
          {time + currentTime - startTime >= 3600000 ? (
            <span>
              {(
                "0" +
                Math.floor(((time + currentTime - startTime) / 3600000) % 60)
              ).slice(-2)}
              :
            </span>
          ) : (
            <span></span>
          )}
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
          <div className={`${styles["buttons"]}`}>
            <AiFillEdit onClick={openModal} />
            <AiFillCloseCircle onClick={openDeleteModal} />
          </div>
        </div>
      ) : (
        <div>
          {time + currentTime - startTime >= 3600000 ? (
            <span>
              {(
                "0" +
                Math.floor(((time + currentTime - startTime) / 3600000) % 60)
              ).slice(-2)}
              :
            </span>
          ) : (
            <span></span>
          )}
          <span>
            {(
              "0" + Math.floor(((time + currentTime - startTime) / 60000) % 60)
            ).slice(-2)}
            :
          </span>
          <span>
            {(
              "0" + Math.floor(((time + currentTime - startTime) / 1000) % 60)
            ).slice(-2)}
          </span>
        </div>
      )}
    </div>
  )
}
