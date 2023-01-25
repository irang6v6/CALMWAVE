import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: 0,
  accessToken: "tokenExample",
  refreshToken: "tokenExample",
  isLogin: false,
  userNickname: "기본 값 닉네임",
  description: "기본 자기 소개",
  stretchingIntervalTime: 50,
  OAuthType: "",
  OAuthSub: "",
  maximumWorkTime: 50,
  faceInfo: {
    neutral: 23,
    happy: 385,
    sad: 654,
    angry: 700,
    fearful: 888,
    disgusted: 512,
    surprised: 12,
  },
  workInfo: [],
  turtleCount: 0,
  deathCount: 12,
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

export const userActions = UserSlice.actions
export default UserSlice.reducer
