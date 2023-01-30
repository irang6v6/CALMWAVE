import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  epicList: [],
}

const exSlice = createSlice({
  name: "epic",
  initialState,
  reducers: {
    changeEx(state, action) {
      state.ex = action.payload.exval
    },
  },
})

export const exActions = exSlice.actions
export default exSlice.reducer
