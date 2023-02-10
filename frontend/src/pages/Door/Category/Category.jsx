import React from "react"
import { useDispatch, useSelector } from "react-redux"
import CategoryCard from "../../../components/UI/CategoryCard/CategoryCard"
import styles from "./Category.module.css"
import {
  openCategoryModal,
  modalActions,
} from "../../../store/door-store/modal-slice"
import { BsPlusLg } from "react-icons/bs"

const Category = function Category() {
  const dispatch = useDispatch()
  // hoverEpicId, SelectedEpicId, hoverHandler, selectHandler, mouseOutHandler
  const { categoryList } = useSelector((state) => state.category)
  const newCategory = function () {
    dispatch(modalActions.setIsCreate())
    dispatch(modalActions.resetFormData())
    dispatch(openCategoryModal())
  }
  return (
    <>
      <div className={`${styles[`cam-container`]}`}>카테고리</div>
      <div className={`${styles[`category-container`]}`}>
        {categoryList.map((category, idx) => {
          return (
            <CategoryCard
              category={category}
              idx={idx}
              key={`category-${category.id}`}
            />
          )
        })}
        <div className={`${styles[`create-category`]}`} onClick={newCategory}>
          <BsPlusLg className={`${styles[`create-icon`]}`} />
        </div>
      </div>
    </>
  )
}

export default Category
