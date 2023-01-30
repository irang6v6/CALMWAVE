import { useEffect } from "react"
import { useState, useCallback, useMemo } from "react"
import styles from "./Door.module.css"
import Epic from "./Epic/Epic"
import EpicTask from "./EpicTask/EpicTask"
import SelectedTask from "./SelectedTask/SelectedTask"

const epicList = [
  {
    epicId: 1,
    name: "에픽 1",
    sumBusinessHours: 12, // 그냥 데이터로 받아온다고 생각하겠음.
    epicDescription: "에픽 설명 1",
    todos: [
      {
        taskId: 1,
        title: "에픽 1의 할 일 1",
        description: "설명 설명",
        isSelected: false,
        startDate: "",
        Dday: "",
        businessHours: 4,
      },
      {
        taskId: 2,
        title: "에픽 1의 할 일 2",
        description: "설명 설명 222",
        isSelected: false,
        startDate: "",
        Dday: "",
        businessHours: 4,
      },
      {
        taskId: 3,
        title: "에픽 1의 할 일 3",
        description: "설명 설명 3333333333333333",
        isSelected: false,
        startDate: "",
        Dday: "",
        businessHours: 4,
      },
    ],
  },
  {
    epicId: 2,
    name: "에픽 2",
    sumBusinessHours: 10, // 그냥 데이터로 받아온다고 생각하겠음.
    epicDescription: "에픽 설명 2",
    todos: [
      {
        taskId: 4,
        title: "에픽 2의 할 일 1",
        description: "설명 설명",
        isSelected: false,
        startDate: "",
        Dday: "",
        businessHours: 5,
      },
      {
        taskId: 5,
        title: "에픽 2의 할 일 2",
        description: "설명 설명 222",
        isSelected: false,
        startDate: "",
        Dday: "",
        businessHours: 5,
      },
    ],
  },
  {
    epicId: 3,
    name: "에픽 3",
    sumBusinessHours: 16, // 그냥 데이터로 받아온다고 생각하겠음.
    epicDescription: "에픽 설명 3",
    todos: [
      {
        taskId: 6,
        title: "에픽 3의 할 일 1",
        description: "설명 설명",
        isSelected: false,
        startDate: "",
        Dday: "",
        businessHours: 4,
      },
      {
        taskId: 7,
        title: "에픽 3의 할 일 2",
        description: "설명 설명 222",
        isSelected: false,
        startDate: "",
        Dday: "",
        businessHours: 4,
      },
      {
        taskId: 8,
        title: "에픽 3의 할 일 3",
        description: "설명 설명 3333333333333333",
        isSelected: false,
        startDate: "",
        Dday: "",
        businessHours: 4,
      },
      {
        taskId: 9,
        title: "에픽 3의 할 일 4",
        description: "설명 설명 444444444444444444444444444444",
        isSelected: false,
        startDate: "",
        Dday: "",
        businessHours: 4,
      },
    ],
  },
]

const taskList = [
  {
    taskId: 1,
    epicId: 1,
    title: "에픽 1의 할 일 1",
    description: "설명 설명",
    isSelected: false,
    startDate: "",
    Dday: "",
    businessHours: 4,
  },
  {
    taskId: 2,
    epicId: 1,
    title: "에픽 1의 할 일 2",
    description: "설명 설명 222",
    isSelected: false,
    startDate: "",
    Dday: "",
    businessHours: 4,
  },
  {
    taskId: 3,
    epicId: 1,
    title: "에픽 1의 할 일 3",
    description: "설명 설명 3333333333333333",
    isSelected: false,
    startDate: "",
    Dday: "",
    businessHours: 4,
  },
  {
    taskId: 4,
    epicId: 2,
    title: "에픽 2의 할 일 1",
    description: "설명 설명",
    isSelected: false,
    startDate: "",
    Dday: "",
    businessHours: 5,
  },
  {
    taskId: 5,
    epicId: 2,
    title: "에픽 2의 할 일 2",
    description: "설명 설명 222",
    isSelected: false,
    startDate: "",
    Dday: "",
    businessHours: 5,
  },
  {
    taskId: 6,
    epicId: 3,
    title: "에픽 3의 할 일 1",
    description: "설명 설명",
    isSelected: false,
    startDate: "",
    Dday: "",
    businessHours: 4,
  },
  {
    taskId: 7,
    epicId: 3,
    title: "에픽 3의 할 일 2",
    description: "설명 설명 222",
    isSelected: false,
    startDate: "",
    Dday: "",
    businessHours: 4,
  },
  {
    taskId: 8,
    epicId: 3,
    title: "에픽 3의 할 일 3",
    description: "설명 설명 3333333333333333",
    isSelected: false,
    startDate: "",
    Dday: "",
    businessHours: 4,
  },
  {
    taskId: 9,
    epicId: 3,
    title: "에픽 3의 할 일 4",
    description: "설명 설명 444444444444444444444444444444",
    isSelected: true,
    startDate: "",
    Dday: "",
    businessHours: 4,
  },
]

function Door(props) {
  const [hoverEpicId, setHoverEpicId] = useState(null)
  const [taskLists, setTaskLists] = useState(taskList)
  const [selectedEpicId, setSelectedEpicId] = useState(null)
  const [selectedEpicTask, setSelectedEpicTask] = useState([])
  const [selectedTask, setSelectedTask] = useState([])

  const epicLists = useMemo(() => {
    return epicList
  }, [])

  useEffect(
    function () {
      setSelectedEpicTask(() =>
        taskLists.filter((val) => {
          return val.epicId === selectedEpicId
        })
      )
    },
    [selectedEpicId]
  )

  // useEffect(function () {
  //   setSelectedTask(() => {
  //     taskList.filter((task) => {
  //       return task.isSelected
  //     })
  //   })
  // }, [])

  const hoverEpicHandler = useCallback(function (epicId) {
    setHoverEpicId(epicId)
  }, [])

  const selectEpicHandler = useCallback(function (epicId) {
    setSelectedEpicId(epicId)
  }, [])

  const mouseOutHandler = useCallback(function () {
    setHoverEpicId(null)
  }, [])

  const toggleSelectTaskHandler = function (taskId) {
    setTaskLists((tasklists) => {
      tasklists.map((task) => {
        if (task.taskId === taskId) {
          task.isSelected = !task.isSelected
        }
        return task
      })
    })
    setSelectedTask(() => {
      taskLists.filter((task) => {
        return task.isSelected === true
      })
    })
    console.log(selectedTask)
  }

  return (
    <div ref={props.refVal} className={`${styles[`door-container`]}`}>
      <div className={`${styles[`cam-epic-container`]}`}>
        <Epic
          epicList={epicLists}
          hoverEpicId={hoverEpicId}
          selectedEpicId={selectedEpicId}
          hoverHandler={hoverEpicHandler}
          selectHandler={selectEpicHandler}
          mouseOutHandler={mouseOutHandler}
        />
      </div>
      <div className={`${styles[`task-container`]}`}>
        <EpicTask
          taskList={selectedEpicTask}
          clickTask={toggleSelectTaskHandler}
        />
      </div>
      <div className={`${styles[`selected-container`]}`}>
        <SelectedTask
          selectedTaskList={selectedTask}
          clickTask={toggleSelectTaskHandler}
        />
      </div>
    </div>
  )
}

export default Door
