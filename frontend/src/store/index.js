import { configureStore } from "@reduxjs/toolkit"
import exReducer from "./ex-slice"
import userSlice from "./user-slice"

const store = configureStore({
  reducer: {
    ex: exReducer,
    user: userSlice,
  },
})

export default store
