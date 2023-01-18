import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  ex: "ex",
}

const exSlice = createSlice({
  name: "ex",
  initialState,
  reducers: {
    changeEx(state, action) {
      state.ex = action.payload.exval
    },
  },
})

export const exActions = exSlice.actions
export default exSlice.reducer
