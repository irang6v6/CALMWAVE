import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isLoading: false,
  isError: false,
  selectedDate: null,
  taskList: [],
}

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    changeTaskList(state, action) {
      state.taskList = action.payload
    },
    changeDate(state, action) {
      state.selectedDate = action.payload
    },
    setLoading(state, action) {
      state.isLoading = true
    },
    setNotLoading(state, action) {
      state.isLoading = false
    },
    setError(state, action) {
      state.isError = true
    },
    setNotError(state, action) {
      state.isError = false
    },
    editCalender(state, action) {
      const [
        editedId,
        editedTitle,
        editedDescription,
        editedDateAimed,
        editedTimeAimed,
        editedCateId,
      ] = action.payload
      state.taskList = state.taskList.map((cal) => {
        if (cal.workId === editedId) {
          return {
            ...cal,
            title: editedTitle,
            description: editedDescription,
            dateAimed: editedDateAimed,
            timeAimed: editedTimeAimed,
            workCateId: editedCateId, 
          }
        }
        return cal
      })
    },
    deleteCalender(state, action) {
      const id = action.payload
      state.taskList = state.taskList.filter((cal => cal.workId !== id))
    }
  },
})

export const AxiosGetCalendar = function (year, month, day) {
  return async function (dispatch) {
    dispatch(calendarActions.setNotError())
    dispatch(calendarActions.setLoading())
    axios({
      method: "get",
      url: `/v1/calendar/${year}/${month}/${day}`,
    })
      .then((res) => {
        dispatch(calendarActions.changeTaskList(res.data))
      })
      .then(() => {
        dispatch(calendarActions.setNotLoading())
      })
      .catch((err) => {
        dispatch(calendarActions.setNotLoading())
        dispatch(calendarActions.setError())
        console.log(err)
      })
  }
}

export const calendarActions = calendarSlice.actions
export default calendarSlice.reducer
