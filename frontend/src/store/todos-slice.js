import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  todos: [
    {
      id: 1,
      title: "일1",
      description: "설명1",
      workType: "",
    },
    {
      id: 2,
      title: "일2",
      description: "설명2",
      workType: "",
    },
    {
      id: 3,
      title: "일3",
      description: "설명3",
      workType: "",
    },
    {
      id: 4,
      title: "일4",
      description: "설명4",
      workType: "",
    },
    {
      id: 5,
      title: "일5",
      description: "설명5",
      workType: "",
    },
  ],
  nowWorking: false, // 일을 하고 있는지? 에 대한 boolean 값
}

const exSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleWorking(state, action) {
      state.nowWorking = !state.nowWorking
    },
    changeTodos(state, action) {
      // {workType, itemId} : column 종류, 해당 아이템 id unique 값
      // action.payload.workType //
    },
  },
})

export const exActions = exSlice.actions
export default exSlice.reducer
