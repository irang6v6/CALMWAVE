import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { categoryActions } from "../../../store/category-slice"
import CardBody from "../CardBody/CardBody"
import CardFooter from "../CardFooter/CardFooter"
import CardHeader from "../CardHeader/CardHeader"
import styles from "./CategoryCard.module.css"
import {
  dragStart,
  resetStartEnd,
  dragEnter,
  resetEnd,
  dragEnd,
} from "../../../store/door-store/drag-task-slice"

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
    dispatch(dragStart(idx, cardType, category))
  }
  const dragEnterHandler = function () {
    dispatch(dragEnter(idx, cardType, category))
  }
  const dragEndHandler = function () {
    dispatch(
      dragEnd(
        dragStartColumn,
        dragStartIdx,
        dragStartTask,
        dragEndColumn,
        dragEndIdx,
        dragEndTask
      )
    )
    dispatch(resetStartEnd())
  }
  const dragExitHandler = function () {
    dispatch(resetEnd())
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
      onDragEnter={dragEnterHandler}
    >
      {/* 카드 헤더에 onSetting이랑 onDelete 넣어줘야 함. */}
      <CardHeader data={category} />
      <CardBody data={category} />
      <CardFooter
        data={category}
        big={category.sumBusinessHours}
        small={category.nowBusinessHours}
      />
    </div>
  )
}

export default CategoryCard
