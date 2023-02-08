import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  todos: [],
  onProgress: false, // 일을 하고 있는지? 에 대한 boolean 값
}

const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    recallTodos(state, action) {
      const localData = JSON.parse(window.localStorage.getItem("todo"))
      console.log(localData)
      if (!localData) {
        state.todos = localData
        if (localData.filter((e) => e.column === "In Progress")[0]) {
          state.onProgress = true
        }
      } else {
        state.todos = [{
          id: 200,
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
        },]
      }
    },
    setProgress(state, action) {
      state.onProgress = action.payload
    },
    changeTodos(state, action) {
      state.todos = action.payload
      // {workType, itemId} : column 종류, 해당 아이템 id unique 값
      // action.payload.workType //
    },
    deleteTodo(state, action) {
      const id = action.payload
      state.todos = state.todos.filter((todo) => todo.id !== id)
    },
  },
})

export const todoActions = todosSlice.actions
export default todosSlice.reducer
