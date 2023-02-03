import React from "react"
import { useSelector } from "react-redux"
import CategoryCard from "../../../components/UI/CategoryCard/CategoryCard"
import styles from "./Category.module.css"

const Category = function Category({ settingModal, openModal }) {
  // hoverEpicId, SelectedEpicId, hoverHandler, selectHandler, mouseOutHandler
  const { categoryList } = useSelector((state) => state.category)
  const newCategory = function () {
    settingModal("category")
    openModal()
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
              settingModal={settingModal}
              openModal={openModal}
            />
          )
        })}
      </div>
    </>
  )
}

export default Category
