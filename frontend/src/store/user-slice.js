import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { LOGOUTandRESETLOCALSTORAGE } from "./token-slice"

const initialState = {
  isLoading: false,
  isError: false,
  isLogin: localStorage.getItem("isLogin") || false,
  userData: {
    id: 0, // String일 수도 있음.
    nickname: "",
    username: "",
    stretchingIntervalMin: 50, // 스트레칭 시간 Number
    dateRegistered: "Date 형태인듯", // 데이트 형태
  },
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = true
    },
    setEndLoading(state, action) {
      state.isLoading = false
    },
    setIsError(state, action) {
      state.isError = true
    },
    setNotError(state, action) {
      state.isError = false
    },
    changeUserData(state, action) {
      state.userData = action.payload
    },
    resetUserData(state, action) {
      state.userData = {}
      state.isLogin = false
    },
    // updateStretchingIntervalTime(state, action) {
    //   state.stretchingIntervalTime = action.payload.stretchingIntervalTime
    // },
    // updateFaceInfo(state, action) {
    //   state.faceInfo = action.payload.faceInfo
    // },
    // updateWorkInfo(state, action) {
    //   // 이건 아직
    // },
    // updateTurtleCount(state, action) {
    //   state.turtleCount += 1
    //   // state.turtleCount += action.payload.count // count는 status에 따라 넣어주면 될듯? 아니라면 그냥 1로만 해도 됨.
    // },
    // updateDeathCount(state, action) {
    //   state.deathCount += 1
    //   state.deathCount += action.payload.count // count는 status에 따라 넣어주면 될듯? 아니라면 그냥 1로만 해도 됨.
    // },
    // updateMaximunWorkTime(state, action) {
    //   state.maximumWorkTime = action.payload.maximumWorkTime
    // },
    // updateLogin(state, action) {
    //   state.isLogin = !state.isLogin
    // },
  },
})

export const AxiosGetUser = function () {
  return async function (dispatch) {
    dispatch(userActions.setIsLoading())
    axios({
      method: "get",
      url: "v1/user/userinfo",
    })
      .then((res) => {
        dispatch(userActions.changeUserData(res.data))
      })
      .then((res) => {
        dispatch(userActions.setEndLoading())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const AxiosLogout = function () {
  return async function (dispatch) {
    dispatch(userActions.setIsLoading())
    axios({
      method: "get",
      url: "/v1/user/logout",
    })
      .then((res) => {
        dispatch(LOGOUTandRESETLOCALSTORAGE())
      })
      .then(() => {
        dispatch(userActions.resetUserData())
        dispatch(userActions.setEndLoading())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const userActions = UserSlice.actions
export default UserSlice.reducer
