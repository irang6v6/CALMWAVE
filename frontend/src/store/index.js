import { configureStore } from "@reduxjs/toolkit"
// import exReducer from "./ex-slice"
import todosSlice from "./todos-slice"
import userSlice from "./user-slice"

const store = configureStore({
  reducer: {
    user: userSlice,
    todos: todosSlice,
  },
})

export default store
