import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  Access: localStorage.getItem("Access") || "",
  Refresh: localStorage.getItem("Refresh") || "",
}

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    changeAccess(state, action) {
      state.Access = localStorage.getItem("Access")
    },
    changeRefresh(state, action) {
      state.Refresh = localStorage.getItem("Refresh")
    },
  },
})

export const tokenActions = tokenSlice.actions
export default tokenSlice.reducer
