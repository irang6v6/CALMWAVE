import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  onProgress: false,
  taskList: [
    {
      id: 1,
      categoryId: 1,
      createdDate: "2023-01-30",
      finishedDate: "",
      title: "카테고리 1의 할 일 1",
      description: "설명 설명",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 2,
      categoryId: 1,
      createdDate: "2023-01-30",
      finishedDate: "",
      title: "카테고리 1의 할 일 2",
      description: "설명 설명 222",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 3,
      categoryId: 1,
      createdDate: "2023-01-30",
      finishedDate: "",
      title: "카테고리 1의 할 일 3",
      description: "설명 설명 3333333333333333",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 4,
      categoryId: 2,
      createdDate: "2023-01-30",
      finishedDate: "",
      title: "카테고리 2의 할 일 1",
      description: "설명 설명",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 5,
      column: "To do",
      time: 0,
    },
    {
      id: 5,
      categoryId: 2,
      createdDate: "2023-01-30",
      finishedDate: "",
      title: "카테고리 2의 할 일 2",
      description: "설명 설명 222",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 5,
      column: "To do",
      time: 0,
    },
    {
      id: 6,
      categoryId: 3,
      createdDate: "2023-01-30",
      finishedDate: "",
      title: "카테고리 3의 할 일 1",
      description: "설명 설명",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 7,
      categoryId: 3,
      createdDate: "2023-01-30",
      finishedDate: "",
      title: "카테고리 3의 할 일 2",
      description: "설명 설명 222",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 8,
      categoryId: 3,
      createdDate: "2023-01-30",
      finishedDate: "",
      title: "카테고리 3의 할 일 3",
      description: "설명 설명 3333333333333333",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 9,
      categoryId: 3,
      createdDate: "2023-01-30",
      finishedDate: "",
      title: "카테고리 3의 할 일 4",
      description: "설명 설명 444444444444444444444444444444",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
  ],
}

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setProgress(state, action) {
      state.onProgress = action.payload
    },
    changeTaskList(state, action) {
      state.taskList = action.payload
      // {workType, itemId} : column 종류, 해당 아이템 id unique 값
      // action.payload.workType //
    },
    deleteTask(state, action) {
      const id = action.payload
      state.taskList = state.taskList.filter((todo) => todo.id !== id)
    },
    changeTaskObjectByIdx(state, action) {
      state.taskList[action.payload.idx] = action.payload.newTask
    },
    changeTaskObjectById(state, action) {
      state.taskList = state.taskList.map((task) => {
        if (task.id === action.payload.newTask.id) {
          return action.payload.newTask
        }
        return task
      })
      console.log(state.taskList)
    },
  },
})

export const AxiosGetTasks = function (requestData) {
  return async function (dispatch) {
    axios(requestData)
      .then((res) => {
        dispatch(taskActions.changeTaskList(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const taskActions = taskSlice.actions
export default taskSlice.reducer
