import { useEffect, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import { useClasses } from "../../../hooks/custom/useClasses"
import { categoryActions } from "../../../store/category-slice"
// import CardBody from "../CardBody/CardBody"
import CardFooter from "../CardFooter/CardFooter"
import CardHeader from "../CardHeader/CardHeader"
import styles from "./CategoryCard.module.css"

function CategoryCard({ category, idx }) {
  const cardType = false
  const dispatch = useDispatch()
  const { categoryList, selectedCategoryId } = useSelector(
    (state) => state.category
  )
  /* eslint-disable */
  const [togglehover, toggleselect, customselect, classes] = useClasses(
    styles,
    "category-card-container"
  )

  useEffect(
    function () {
      customselect(category.id === selectedCategoryId)
    },
    [selectedCategoryId, category.id, customselect]
  )

  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: "Category",
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.idx
      const hoverIndex = idx
      const hoverId = category.id
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCardHandler(item, hoverId)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.idx = hoverIndex
    },
  })

  const moveCardHandler = (dragItem, hoverId) => {
    const dragCategory = categoryList.filter(
      (category) => category.id === dragItem.category.id
    )[0]
    const dragCategoryIndex = categoryList.indexOf(dragCategory)
    const hoverCategory = categoryList.filter(
      (category) => category.id === hoverId
    )[0]
    const hoverCategoryIndex = categoryList.indexOf(hoverCategory)
    if (dragCategory) {
      const coppiedStateArray = [...categoryList]

      // remove item by "hoverIndex" and put "dragItem" instead
      const prevCategory = coppiedStateArray.splice(
        hoverCategoryIndex,
        1,
        dragCategory
      )

      // remove item by "dragIndex" and put "prevItem" instead
      coppiedStateArray.splice(dragCategoryIndex, 1, prevCategory[0])
      dispatch(categoryActions.changeCategoryList(coppiedStateArray))
    }
  }

  const [{ isDragging }, drag] = useDrag({
    type: "Category",
    item: { idx, category }, // time
    end: (item, monitor) => {},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.6 : 1

  drag(drop(ref))

  const selectHandler = function () {
    dispatch(
      categoryActions.changeSelected({ selectedCategoryId: category.id })
    )
  }

  return (
    <div
      ref={ref}
      className={classes}
      style={{ opacity }}
      onClick={selectHandler}
      onMouseEnter={togglehover}
      onMouseLeave={togglehover}
    >
      {/* 카드 헤더에 onSetting이랑 onDelete 넣어줘야 함. */}
      <CardHeader data={category} cardType={cardType} />
      {/* <CardBody data={category} /> */}
      <CardFooter
        data={category}
        big={category.sumBusinessHours}
        small={category.nowBusinessHours}
      />
    </div>
  )
}

export default CategoryCard
