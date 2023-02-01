import React from "react"
import { useSelector } from "react-redux"
import CategoryCard from "../../../components/UI/CategoryCard/CategoryCard"
import Video from "../../../components/Video/Video"
import styles from "./Category.module.css"

const Category = function Category() {
  // hoverEpicId, SelectedEpicId, hoverHandler, selectHandler, mouseOutHandler
  const { categoryList } = useSelector((state) => state.category)
  return (
    <>
      <div className={`${styles[`cam-container`]}`}>
        <Video />
      </div>
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
      </div>
    </>
  )
}

export default Category
