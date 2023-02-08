import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  onProgress: false,
  taskList: [
    {
      id: 1,
      categoryId: 1,
      createdDate: "2023-01-30",
      finishedDate: "2023-02-15",
      title: "React",
      description: "리액트 강의 듣기",
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
      finishedDate: "2023-02-15",
      title: "Redux toolkit",
      description: "리덕스 툴킷이 뭔가요",
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
      finishedDate: "2023-02-15",
      title: "Custom Hook",
      description: "커스텀 후크 주세요",
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
      finishedDate: "2023-02-15",
      title: "BFS / DFS",
      description: "또FS 또FS",
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
      finishedDate: "2023-02-11",
      title: "다익스트라",
      description: "라트스익다",
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
      finishedDate: "2023-02-15",
      title: "컨설턴트님께 이메일 보내기",
      description: "이거 저거 물어보기",
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
      finishedDate: "2023-02-15",
      title: "프로님께 MM 보내기",
      description: "싸탈하고 싶습니다",
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
      categoryId: 44,
      createdDate: "2023-01-30",
      finishedDate: "2023-02-15",
      title: "코치님께 이메일 보내기",
      description: "좋아합니다 프로젝트 이번엔 진짜라구요",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 4,
      column: "Done",
      time: 0,
    },
    {
      id: 9,
      categoryId: 44,
      createdDate: "2023-01-30",
      finishedDate: "2023-02-15",
      title: "헤어질 결심 보기",
      description: "진짜로 보고싶습니다",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "",
      businessHours: 4,
      column: "Done",
      time: 0,
    },
    {
      id: 10,
      categoryId: 44,
      createdDate: "2023-02-03",
      finishedDate: "2023-02-20",
      title: "리액트 공부",
      description: "설명 설명 444444444444444444444444444444",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "2023-02-08",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 11,
      categoryId: 40,
      createdDate: "2023-02-03",
      finishedDate: "2023-02-15",
      title: "알고리즘 문제풀이",
      description: "설명 설명 444444444444444444444444444444",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "2023-02-07",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 12,
      categoryId: 39,
      createdDate: "2023-02-03",
      finishedDate: "2023-02-10",
      title: "CS 스터디",
      description: "설명 설명 444444444444444444444444444444",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "2023-02-05",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 13,
      categoryId: 1,
      createdDate: "2023-02-08",
      finishedDate: "2023-02-10",
      title: "넷플릭스 보기",
      description: "볼 거 넘 많은데 프로젝트 싫어요",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "2023-02-05",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 14,
      categoryId: 1,
      createdDate: "2023-02-08",
      finishedDate: "2023-02-07",
      title: "리덕스 공부하기",
      description: "리액트도 모르겠는데 뭔 리덕스",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "2023-02-05",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 15,
      categoryId: 1,
      createdDate: "2023-02-08",
      finishedDate: "2023-02-08",
      title: "알고리즘 공부하기",
      description: "싸탈을 향한 발걸음",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "2023-02-05",
      businessHours: 4,
      column: "To do",
      time: 0,
    },
    {
      id: 16,
      categoryId: 1,
      createdDate: "2023-02-08",
      finishedDate: "2023-02-19",
      title: "술마시기",
      description: "맥주는 술 아니야",
      isSelected: false, // Door에서 선택되었는지? filter하기 위한 값
      startWorkingDate: "",
      endWorkingDate: "",
      Dday: "2023-02-05",
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
    },
    deleteTask(state, action) {
      const id = action.payload
      state.taskList = state.taskList.filter((todo) => todo.id !== id)
    },
    pushTaskList(state, action) {
      state.taskList = [...state.taskList, ...action.payload]
    },
  },
})

export const AxiosGetTodos = function () {
  return async function (dispatch) {
    axios({
      method: "get",
      url: `/v1/task/todo`,
    })
      .then((res) => {
        dispatch(
          taskActions.changeTaskList(
            res.data.map((task) => {
              return {
                id: task?.id,
                title: task?.title,
                description: task?.description,
                category: task?.workCate,
                categoryId: task?.workCate?.cateId,
                createdDate: task?.dateCreated,
                isSelected: false,
                column:
                  task?.status === "TODO"
                    ? "To do"
                    : task?.status === "DONE"
                    ? "Done"
                    : task?.status,
                finishedDate: task?.dateAimed,
                totalTime: task?.totalTime,
                workOrder: task?.workOrder,
              }
            })
          )
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const AxiosGetDones = function () {
  return async function (dispatch) {
    axios({
      method: "get",
      url: `/v1/task/done`,
    }).then((res) => {
      dispatch(
        taskActions.pushTaskList(
          res.data.map((task) => {
            return {
              id: task.id,
              title: task?.title,
              description: task?.description,
              category: task?.workCate,
              categoryId: task?.workCate?.cateId,
              createdDate: task?.dateCreated,
              isSelected: false,
              column: task?.status,
              finishedDate: task?.dateAimed,
              totalTime: task?.totalTime,
              workOrder: task?.workOrder,
            }
          })
        )
      )
    })
  }
}

// export const AxiosGetAllTaskList = function () {
//   return async function (dispatch) {
//     dispatch(AxiosGetTodos())
//     dispatch(AxiosGetDones())
//   }
// }

export const taskActions = taskSlice.actions
export default taskSlice.reducer
