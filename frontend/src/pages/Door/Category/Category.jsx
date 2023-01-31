import { useSelector } from "react-redux"
import CategoryCard from "../../../components/UI/CategoryCard/CategoryCard"
import styles from "./Category.module.css"

function Category() {
  // hoverEpicId, SelectedEpicId, hoverHandler, selectHandler, mouseOutHandler
  const { categoryList } = useSelector((state) => state.category)
  return (
    <>
      <div className={`${styles[`cam-container`]}`}>캠임</div>
      <div className={`${styles[`epic-container`]}`}>
        {categoryList.map((category) => {
          return (
            <CategoryCard category={category} key={`category-${category.id}`} />
          )
        })}
      </div>
    </>
  )
}

export default Category
