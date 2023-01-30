import { configureStore } from "@reduxjs/toolkit"
import categorySlice from "./category-slice"
import taskSlice from "./task-slice"
// import exReducer from "./ex-slice"
import todosSlice from "./todos-slice"
import userSlice from "./user-slice"

const store = configureStore({
  reducer: {
    user: userSlice,
    todos: todosSlice,
    category: categorySlice,
    task: taskSlice,
  },
})

export default store
