import { useSelector } from "react-redux"
import CategoryCard from "../../../components/UI/CategoryCard/CategoryCard"
import styles from "./Category.module.css"

function Category() {
  // hoverEpicId, SelectedEpicId, hoverHandler, selectHandler, mouseOutHandler
  const { categoryList } = useSelector((state) => state.category)
  return (
    <>
      <div className={`${styles[`cam-container`]}`}>캠임</div>
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
