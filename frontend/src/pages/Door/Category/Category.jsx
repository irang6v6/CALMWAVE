import React from "react"
import { useDispatch, useSelector } from "react-redux"
import CategoryCard from "../../../components/UI/CategoryCard/CategoryCard"
import styles from "./Category.module.css"
import {
  openCategoryModal,
  modalActions,
} from "../../../store/door-store/modal-slice"

const Category = function Category() {
  const dispatch = useDispatch()
  // hoverEpicId, SelectedEpicId, hoverHandler, selectHandler, mouseOutHandler
  const { categoryList } = useSelector((state) => state.category)
  const newCategory = function () {
    dispatch(modalActions.resetFormData())
    dispatch(openCategoryModal())
  }
  return (
    <>
      <div className={`${styles[`cam-container`]}`}>카테고리</div>
      <div className={`${styles[`category-container`]}`}>
        <div onClick={newCategory}>ㅎㅇ</div>
        {categoryList.map((category, idx) => {
          return (
            <CategoryCard
              category={category}
              idx={idx}
              key={`category-${category.id}`}
            />
          )
        })}
      </div>
    </>
  )
}

export default Category
