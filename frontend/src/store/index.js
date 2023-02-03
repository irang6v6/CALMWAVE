import { configureStore } from "@reduxjs/toolkit"
import categorySlice from "./category-slice"
import categoryTaskSlice from "./door-store/category-task-slice"
import dragTaskSlice from "./door-store/drag-task-slice"
import selectedTaskSlice from "./door-store/selected-task-slice"
import taskSlice from "./task-slice"
// import exReducer from "./ex-slice"
import todosSlice from "./todos-slice"
import tokenSlice from "./token-slice"
import userSlice from "./user-slice"

const store = configureStore({
  reducer: {
    user: userSlice,
    todos: todosSlice,
    category: categorySlice,
    task: taskSlice,
    doorctask: categoryTaskSlice,
    doorstask: selectedTaskSlice,
    dragtask: dragTaskSlice,
    token: tokenSlice,
  },
})

export default store
