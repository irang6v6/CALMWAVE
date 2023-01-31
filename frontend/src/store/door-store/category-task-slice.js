import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  column: "category-task",
  categoryTaskList: [],
}

const categoryTaskSlice = createSlice({
  name: "categoryTask",
  initialState,
  reducers: {
    getCategoryTask(state, action) {
      state.categoryTaskList = action.payload.newList
    },
    addCategoryTask(state, action) {
      if (
        state.categoryTaskList.findIndex(
          (ctask) => ctask.id === action.payload.newTask.id
        ) === -1
      ) {
        state.categoryTaskList.push(action.payload.newTask)
      } else {
        state.categoryTaskList = state.categoryTaskList.filter((ctask) => {
          return ctask.id !== action.payload.newTask.id
        })
      }
    },
    editCategoryTaskById(state, action) {
      state.categoryTaskList = state.categoryTaskList.map((ctask) => {
        if (ctask.id === action.payload.id) {
          return action.payload.newTask
        }
        return ctask
      })
    },
    editCategoryTaskByIdx(state, action) {
      state.categoryTaskList[action.payload.idx] = action.payload.newTask
    },
    changeCategoryTaskPlaceByIdx(state, action) {
      state.categoryTaskList[action.payload.idx1] = action.payload.task2
      state.categoryTaskList[action.payload.idx2] = action.payload.task1
    },
    clearCategoryTaskList(state, action) {
      state.categoryTaskList = []
    },
    deleteCategoryTaskById(state, action) {
      state.categoryTaskList = state.categoryTaskList.filter((ctask) => {
        return ctask.id !== action.payload.id
      })
    },
  },
})

export const categoryTaskActions = categoryTaskSlice.actions
export default categoryTaskSlice.reducer
