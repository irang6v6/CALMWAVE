import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isModal: false,
  isTask: null,
  isDelete: null,
  isLoading: false,
  isError: false,
  formData: null,
}

const modalSlice = createSlice({
  name: "ex",
  initialState,
  reducers: {
    toggleIsModal(state, action) {
      state.isModal = !state.isModal
    },
    setIsTask(state, action) {
      state.isTask = true
    },
    setIsCategory(state, action) {
      state.isTask = false
    },
    setFormData(state, action) {
      state.formData = action.payload.data
    },
    resetFormData(state, action) {
      state.formData = null
    },
    setIsDelete(state, action) {
      state.isDelete = true
    },
    setIsNotDelete(state, action) {
      state.isDelete = false
    },
    toggleIsLoading(state, action) {
      state.isLoading = !state.isLoading
    },
    setIsError(state, action) {
      state.isError = true
    },
    setNotError(state, action) {
      state.isError = false
    },
  },
})

export const openCategoryModal = function () {
  return function (dispatch) {
    dispatch(modalActions.setIsNotDelete())
    dispatch(modalActions.setIsCategory())
    dispatch(modalActions.toggleIsModal())
  }
}
export const openTaskModal = function () {
  return function (dispatch) {
    dispatch(modalActions.setIsNotDelete())
    dispatch(modalActions.setIsTask())
    dispatch(modalActions.toggleIsModal())
  }
}
export const openCategoryDeleteModal = function () {
  return function (dispatch) {
    dispatch(modalActions.setIsDelete())
    dispatch(modalActions.setIsCategory())
    dispatch(modalActions.toggleIsModal())
  }
}
export const openTaskDeleteModal = function () {
  return function (dispatch) {
    dispatch(modalActions.setIsDelete())
    dispatch(modalActions.setIsTask())
    dispatch(modalActions.toggleIsModal())
  }
}
export const closeModal = function () {
  return async function (dispatch) {
    dispatch(modalActions.toggleIsModal())
    setTimeout(() => dispatch(modalActions.setNotError()), 400)
  }
}
export const submitModal = function (requestData) {
  return function (dispatch) {
    dispatch(modalActions.toggleIsLoading())
    dispatch(modalActions.setNotError())
    axios(requestData)
      .then((res) => {
        // axios 요청이므로 이전 then에서 전체 list를 가져오거나 한다.
        // 혹은 모든 list들을 돌면서 update 해준다.
        dispatch(modalActions.toggleIsLoading())
        dispatch(modalActions.toggleIsModal())
      })
      .catch((err) => {
        dispatch(modalActions.toggleIsLoading())
        dispatch(modalActions.setIsError())
      })
  }
}

export const modalActions = modalSlice.actions
export default modalSlice.reducer
