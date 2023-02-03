import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  Access: localStorage.getItem("Access"),
  Refresh: localStorage.getItem("Refresh"),
}

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    changeAccess(state, action) {
      state.Access = action.payload || localStorage.getItem("Access")
    },
    changeRefresh(state, action) {
      state.Refresh = action.payload || localStorage.getItem("Refresh")
    },
  },
})

export const setAccess = function (acc) {
  return function (dispatch) {
    dispatch(tokenActions.changeAccess(acc))
    localStorage.setItem("Access", acc)
    axios.defaults.headers.AccessToken = acc || localStorage.getItem("Access")
  }
}

export const setRefresh = function (ref) {
  return function (dispatch) {
    dispatch(tokenActions.changeRefresh(ref))
    localStorage.setItem("Refresh", ref)
    axios.defaults.headers.RefreshToken = ref || localStorage.getItem("Refresh")
  }
}

export const tokenActions = tokenSlice.actions
export default tokenSlice.reducer
