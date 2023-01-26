import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  todos: [
    {
      id: 1,
      title: "일1",
      description: "설명1",
      column: "To do",
    },
    {
      id: 2,
      title: "일2",
      description: "설명2",
      column: "To do",
    },
    {
      id: 3,
      title: "일3",
      description: "설명3",
      column: "To do",
    },
    {
      id: 4,
      title: "일4",
      description: "설명4",
      column: "To do",
    },
    {
      id: 5,
      title: "일5",
      description: "설명5",
      column: "To do",
    },
  ],
  onProgress: false, // 일을 하고 있는지? 에 대한 boolean 값
}

const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setProgress(state, action) {
      state.onProgress = action.payload
    },
    changeTodos(state, action) {
      state.todos = action.payload
      // {workType, itemId} : column 종류, 해당 아이템 id unique 값
      // action.payload.workType //
    },
    // addTodo(state, action) {
    //   state.todos.push(action.payload)
    // }
    deleteTodo(state, action) {
      const id = action.payload
      console.log(id)
      state.todos = state.todos.filter((todo) => todo.id !== id)
    }
  },
})

export const todoActions = todosSlice.actions
export default todosSlice.reducer
