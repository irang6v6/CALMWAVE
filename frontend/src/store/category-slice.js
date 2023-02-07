import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isLoading: false,
  isError: null,
  selectedCategoryId: null,
  hoveredCategoryId: null,
  categoryList: [
    {
      id: 1,
      title: "카테고리 1",
      cateColor: "",
      cateIcon: "",
      sumBusinessHours: 12, // 그냥 데이터로 받아온다고 생각하겠음.
      nowBusinessHours: 10, // 그냥 데이터로 받아온다고 생각하겠음.
      isSelected: false, // 이건 push 혹은 get 할 때 임의로 넣어주는 값
    },
    {
      id: 2,
      title: "카테고리 2",
      description: "카테고리 설명 2",
      sumBusinessHours: 10, // 그냥 데이터로 받아온다고 생각하겠음.
      nowBusinessHours: 2,
      isSelected: false, // 이건 push 혹은 get 할 때 임의로 넣어주는 값
    },
    {
      id: 3,
      title: "카테고리 3",
      description: "카테고리 설명 3",
      sumBusinessHours: 16, // 그냥 데이터로 받아온다고 생각하겠음.
      nowBusinessHours: 10,
      isSelected: false, // 이건 push 혹은 get 할 때 임의로 넣어주는 값
    },
    {
      id: 4,
      title: "카테고리 4",
      description: "카테고리 설명 4",
      sumBusinessHours: 16, // 그냥 데이터로 받아온다고 생각하겠음.
      nowBusinessHours: 10,
      isSelected: false, // 이건 push 혹은 get 할 때 임의로 넣어주는 값
    },
  ],
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory(state, action) {
      state.categoryList.push(action.payload.newCategory)
    },
    getCategory(state, action) {
      state.categoryList = action.payload.categoryList
    },
    changeSelected(state, action) {
      state.selectedCategoryId = action.payload.selectedCategoryId
    },
    changeHovered(state, action) {
      state.hoveredCategoryId = action.payload.hoveredCategoryId
    },
    changeCategoryPlaceByIdx(state, action) {
      state.categoryList[action.payload.idx1] = action.payload.category2
      state.categoryList[action.payload.idx2] = action.payload.category1
    },
    changeCategoryList(state, action) {
      state.categoryList = action.payload
      // {workType, itemId} : column 종류, 해당 아이템 id unique 값
      // action.payload.workType //
    },
  },
})

export const AxiosGetCategory = function () {
  return async function (dispatch) {
    axios({
      method: "get",
      url: `/v1/category/list`,
    })
      .then((res) => {
        // response에 따라서 순회 돌린 값에 isSelected: false 넣어서 넣어준다.
        dispatch(
          categoryActions.getCategory({
            categoryList: res.data.map((cate) => {
              return {
                id: cate.cateId,
                title: cate.cateName,
                cateColor: cate.cateColor,
                cateIcon: cate.cateIcon,
                cateOrder: cate.cateOrder,
                isSelected: false,
              }
            }),
          })
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const AxiosPostCategory = function (requestData) {
  return async function (dispatch) {
    axios(requestData)
      .then((res) => {
        categoryActions.addCategory({
          newCategory: requestData.data.newCategory,
        }) // 여기서 requestData의 data에 넣어주는 값들로 newCategory 객체를 만들어서 넣어준다.
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const categoryActions = categorySlice.actions
export default categorySlice.reducer
