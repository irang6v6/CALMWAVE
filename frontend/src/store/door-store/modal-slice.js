import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isModal: false,
  isTask: null,
  isDelete: null,
  isLoading: false,
  isError: false,
  formData: null,
  isCreate: null,
}

const modalSlice = createSlice({
  name: "modal",
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
    setIsCreate(state, action) {
      state.isCreate = true
    },
    setIsUpdate(state, action) {
      state.isCreate = false
    },
  },
})

export const openCategoryModal = function () {
  return async function (dispatch) {
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
    dispatch(modalActions.setNotError())
    dispatch(modalActions.resetFormData())
    // setTimeout(function () {
    // }, 400)
  }
}
export const submitModal = function (requestData) {
  return async function (dispatch) {
    dispatch(modalActions.toggleIsLoading())
    dispatch(modalActions.setNotError())
    axios(requestData)
      .then((res) => {
        // axios 요청이므로 이전 then에서 전체 list를 가져오거나 한다.
        // 혹은 모든 list들을 돌면서 update 해준다.
        // request.method === "post" 로 확인하면 될 듯.
        dispatch(modalActions.toggleIsLoading())
        dispatch(modalActions.toggleIsModal())
      })
      .then(() => {
        dispatch(modalActions.resetFormData())
      })
      .catch((err) => {
        dispatch(modalActions.toggleIsLoading())
        dispatch(modalActions.setIsError())
        dispatch(modalActions.resetFormData())
      })
  }
}

export const modalActions = modalSlice.actions
export default modalSlice.reducer
