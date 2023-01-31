import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryActions } from "../../../store/category-slice"
import styles from "./CategoryCard.module.css"

function CategoryCard({ category }) {
  const dispatch = useDispatch()
  const { hoveredCategoryId, selectedCategoryId } = useSelector(
    (state) => state.category
  )
  const [cardClasses, setCardClasses] = useState(
    `${styles[`category-card-container`]}`
  )
  useEffect(
    function () {
      if (
        category.id === selectedCategoryId &&
        category.id === hoveredCategoryId
      ) {
        setCardClasses(
          () =>
            `${styles[`category-card-container`]} ${styles[`is-selected`]} ${
              styles[`is-hovered`]
            }`
        )
      } else if (category.id === selectedCategoryId) {
        setCardClasses(
          () => `${styles[`category-card-container`]} ${styles[`is-selected`]}`
        )
      } else if (category.id === hoveredCategoryId) {
        setCardClasses(
          () => `${styles[`category-card-container`]} ${styles[`is-hovered`]}`
        )
      } else {
        setCardClasses(() => `${styles[`category-card-container`]}`)
      }
    },
    [selectedCategoryId, hoveredCategoryId, category.id]
  )
  const hoverHandler = function () {
    dispatch(categoryActions.changeHovered({ hoveredCategoryId: category.id }))
  }
  const selectHandler = function () {
    dispatch(
      categoryActions.changeSelected({ selectedCategoryId: category.id })
    )
  }
  const mouseOutHandler = function () {
    dispatch(categoryActions.changeHovered({ hoveredCategoryId: null }))
  }
  return (
    <div
      className={cardClasses}
      onMouseEnter={() => hoverHandler(category.id)}
      onClick={() => selectHandler(category.id)}
      onMouseLeave={() => mouseOutHandler()}
    >
      <div>{category.name}</div>
      <div>{category.sumBusinessHours}</div>
      <div>{category.epicDescription}</div>
    </div>
  )
}

export default CategoryCard
