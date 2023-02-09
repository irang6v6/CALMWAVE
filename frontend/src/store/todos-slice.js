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
      if (localData) {
        state.todos = localData
        if (localData.filter((e) => e.column === "In Progress")[0]) {
          state.onProgress = true
        }
      } else {
        state.todos = []
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
