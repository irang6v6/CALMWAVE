import { configureStore } from "@reduxjs/toolkit"
import exReducer from "./ex-slice"
import todosSlice from "./todos-slice"

const store = configureStore({
  reducer: {
    ex: exReducer,
    todos: todosSlice,
  },
})

export default store
