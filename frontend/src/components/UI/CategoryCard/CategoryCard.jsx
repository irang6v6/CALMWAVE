import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryActions } from "../../../store/category-slice"
import { categoryTaskActions } from "../../../store/door-store/category-task-slice"
import { dragTaskActions } from "../../../store/door-store/drag-task-slice"
import CardBody from "../CardBody/CardBody"
import CardFooter from "../CardFooter/CardFooter"
import CardHeader from "../CardHeader/CardHeader"
import styles from "./CategoryCard.module.css"

function CategoryCard({ category, idx }) {
  const {
    dragStartColumn,
    dragStartIdx,
    dragStartTask,
    dragEndColumn,
    dragEndIdx,
    dragEndTask,
  } = useSelector((state) => state.dragtask)
  const cardType = "category"
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
  const dragStartHandler = function () {
    dispatch(
      dragTaskActions.setStartItem({
        column: cardType,
        task: category,
        idx: idx,
      })
    )
  }
  const dragEnterHandler = function () {
    dispatch(
      dragTaskActions.setEndItem({ column: cardType, task: category, idx: idx })
    )
  }
  const dragEndHandler = function () {
    console.log(
      dragStartColumn,
      dragStartIdx,
      dragStartTask
      // dragEndColumn,
      // dragEndIdx,
      // dragEndTask
    )
    if (
      dragStartColumn === "category" &&
      dragEndColumn === "category" &&
      dragEndIdx !== dragStartIdx
    ) {
      dispatch(
        categoryActions.changeCategoryPlaceByIdx({
          idx1: dragStartIdx,
          idx2: dragEndIdx,
          category1: dragStartTask,
          category2: dragEndTask,
        })
      )
      dispatch(dragTaskActions.resetItems())
    } else if (
      dragStartColumn === "category-task" &&
      dragEndColumn === "category"
    ) {
      dispatch(
        categoryTaskActions.editCategoryTaskById({
          id: dragStartTask.id,
          newTask: { ...dragStartTask, categoryId: category.id },
        })
      )
      dispatch(dragTaskActions.resetItems())
    }
  }
  const dragExitHandler = function () {
    dispatch(dragTaskActions.resetEndItem())
  }
  return (
    <div
      className={cardClasses}
      onMouseEnter={() => hoverHandler(category.id)}
      onClick={() => selectHandler(category.id)}
      onMouseLeave={() => mouseOutHandler()}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragExit={dragExitHandler}
      onDragOver={dragEnterHandler}
    >
      <CardHeader data={category} />
      <CardBody data={category} />
      <CardFooter data={category} />
    </div>
  )
}

export default CategoryCard
