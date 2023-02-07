import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { userActions } from "./user-slice"

const initialState = {
  Access: localStorage.getItem("Access") || "",
  Refresh: localStorage.getItem("Refresh") || "",
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
    resetTokens(state, action) {
      state.Access = ""
      state.Refresh = ""
    },
  },
})

export const setAccess = function (acc) {
  return function (dispatch) {
    dispatch(tokenActions.changeAccess(acc))
    localStorage.setItem("Access", acc)
    axios.defaults.headers.common["AccessToken"] =
      acc || localStorage.getItem("Access")
  }
}

export const setRefresh = function (ref) {
  return function (dispatch) {
    dispatch(tokenActions.changeRefresh(ref))
    localStorage.setItem("Refresh", ref)
    axios.defaults.headers.common["RefreshToken"] =
      ref || localStorage.getItem("Refresh")
  }
}

export const LOGOUTandRESETLOCALSTORAGE = function () {
  return function (dispatch) {
    dispatch(tokenActions.resetTokens())
    dispatch(userActions.resetUserData())
    localStorage.removeItem("Access")
    localStorage.removeItem("Refresh")
  }
}

export const tokenActions = tokenSlice.actions
export default tokenSlice.reducer
