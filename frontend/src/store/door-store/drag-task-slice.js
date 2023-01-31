import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  dragStartColumn: "",
  dragStartIdx: null,
  dragStartTask: {},
  dragEndColumn: "",
  dragEndIdx: null,
  dragEndTask: {},
}

const dragTaskSlice = createSlice({
  name: "dragtask",
  initialState,
  reducers: {
    setStartItem(state, action) {
      state.dragStartIdx = action.payload.idx
      state.dragStartColumn = action.payload.column
      state.dragStartTask = action.payload.task
    },
    setEndItem(state, action) {
      state.dragEndIdx = action.payload.idx
      state.dragEndColumn = action.payload.column
      state.dragEndTask = action.payload.task
    },
    resetItems(state, action) {
      state.dragStartIdx = null
      state.dragStartColumn = ""
      state.dragStartTask = {}
      state.dragEndIdx = null
      state.dragEndColumn = ""
      state.dragEndTask = {}
    },
    resetEndItem(state, action) {
      state.dragEndIdx = null
      state.dragEndColumn = ""
      state.dragEndTask = {}
    },
  },
})

export const dragTaskActions = dragTaskSlice.actions
export default dragTaskSlice.reducer
