import { configureStore } from "@reduxjs/toolkit"
import exReducer from "./ex-slice"

const store = configureStore({
  reducer: {
    ex: exReducer,
  },
})

export default store
