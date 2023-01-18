import { configureStore } from "@reduxjs/toolkit"
// import exampleReducer from "./examples"

const store = configureStore({
  reducer: {
    // example: exampleReducer,
  },
})

export default store
