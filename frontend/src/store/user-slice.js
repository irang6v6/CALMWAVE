import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isLoading: false,
  isError: false,
  userData: {},
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateStretchingIntervalTime(state, action) {
      state.stretchingIntervalTime = action.payload.stretchingIntervalTime
    },
    updateFaceInfo(state, action) {
      state.faceInfo = action.payload.faceInfo
    },
    updateWorkInfo(state, action) {
      // 이건 아직
    },
    updateTurtleCount(state, action) {
      state.turtleCount += 1
      // state.turtleCount += action.payload.count // count는 status에 따라 넣어주면 될듯? 아니라면 그냥 1로만 해도 됨.
    },
    updateDeathCount(state, action) {
      state.deathCount += 1
      state.deathCount += action.payload.count // count는 status에 따라 넣어주면 될듯? 아니라면 그냥 1로만 해도 됨.
    },
    updateMaximunWorkTime(state, action) {
      state.maximumWorkTime = action.payload.maximumWorkTime
    },
    updateLogin(state, action) {
      state.isLogin = !state.isLogin
    },
  },
})

export const AxiosGetUser = function (requestData) {
  return async function (dispatch) {
    axios(requestData)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const userActions = UserSlice.actions
export default UserSlice.reducer
