import { createSlice } from "@reduxjs/toolkit"
import { categoryActions } from "../category-slice"
import { taskActions } from "../task-slice"
import { categoryTaskActions } from "./category-task-slice"
import { selectedTaskActions } from "./selected-task-slice"

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

const dragStart = function (idx, column, taskOrCategory) {
  return function (dispatch) {
    dispatch(
      dragTaskActions.setStartItem({ idx, column, task: taskOrCategory })
    )
  }
}

const dragEnter = function (idx, column, taskOrCategory) {
  return function (dispatch) {
    dispatch(dragTaskActions.setEndItem({ idx, column, task: taskOrCategory }))
  }
}

const resetEnd = function () {
  return function (dispatch) {
    dispatch(dragTaskActions.resetEndItem())
  }
}

const resetStartEnd = function () {
  return function (dispatch) {
    dispatch(dragTaskActions.resetItems())
  }
}

const dragEnd = function (
  dragStartColumn,
  dragstartIdx,
  dragStartTask,
  dragEndColumn,
  dragEndIdx,
  dragEndTask
) {
  return function (dispatch) {
    if (dragStartColumn === dragEndColumn) {
      if (dragStartColumn === "category") {
        dispatch(
          categoryActions.changeCategoryPlaceByIdx({
            idx1: dragstartIdx,
            idx2: dragEndIdx,
            category1: dragStartTask,
            category2: dragEndTask,
          })
        )
      } else if (dragStartColumn === "category-task") {
        dispatch(
          categoryTaskActions.changeCategoryTaskPlaceByIdx({
            idx1: dragstartIdx,
            idx2: dragEndIdx,
            task1: dragStartTask,
            task2: dragEndTask,
          })
        )
      } else if (dragStartColumn === "selected-task") {
        dispatch(
          selectedTaskActions.changeSelectedTaskPlaceByIdx({
            idx1: dragstartIdx,
            idx2: dragEndIdx,
            task1: dragStartTask,
            task2: dragEndTask,
          })
        )
      }
      return
    }
    if (dragStartColumn === "category-task" && dragEndColumn === "category") {
      if (dragStartTask.categoryId === dragEndTask.id) {
        return
      }
      dispatch(
        taskActions.changeTaskObjectById({
          newTask: { ...dragStartTask, categoryId: dragEndTask.id },
        })
      )
      dispatch(
        selectedTaskActions.changeSelectedTaskById({
          newTask: { ...dragStartTask, categoryId: dragEndTask.id },
        })
      )
      return
    }
    if (
      dragStartColumn === "category-task" &&
      dragEndColumn === "selected-task"
    ) {
      return
    }
    if (
      dragStartColumn === "selected-task" &&
      dragEndColumn !== "selected-task"
      // && dragEndColumn !== null
    ) {
      console.log(
        dragStartColumn,
        dragstartIdx,
        dragStartTask,
        dragEndColumn,
        dragEndIdx,
        dragEndTask
      )
      dispatch(
        selectedTaskActions.addSelectedTask({ newTask: { ...dragStartTask } })
      )
      return
    }
  }
}

export const dragTaskActions = dragTaskSlice.actions
export default dragTaskSlice.reducer
export { dragStart, resetStartEnd, dragEnter, resetEnd, dragEnd }
