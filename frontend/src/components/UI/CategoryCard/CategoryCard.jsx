import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import { categoryActions } from "../../../store/category-slice"
import CardBody from "../CardBody/CardBody"
import CardFooter from "../CardFooter/CardFooter"
import CardHeader from "../CardHeader/CardHeader"
import styles from "./CategoryCard.module.css"
// import {
//   dragStart,
//   resetStartEnd,
//   dragEnter,
//   resetEnd,
//   dragEnd,
// } from "../../../store/door-store/drag-task-slice"

function CategoryCard({ category, idx, settingModal, openModal }) {
  // const {
  //   dragStartColumn,
  //   dragStartIdx,
  //   dragStartTask,
  //   dragEndColumn,
  //   dragEndIdx,
  //   dragEndTask,
  // } = useSelector((state) => state.dragtask)
  const cardType = false
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.category.categoryList)
  // const [cardClasses, setCardClasses] = useState(
  //   `${styles[`category-card-container`]}`
  // )
  // useEffect(
  //   function () {
  //     if (
  //       category.id === selectedCategoryId &&
  //       category.id === hoveredCategoryId
  //     ) {
  //       setCardClasses(
  //         () =>
  //           `${styles[`category-card-container`]} ${styles[`is-selected`]} ${
  //             styles[`is-hovered`]
  //           }`
  //       )
  //     } else if (category.id === selectedCategoryId) {
  //       setCardClasses(
  //         () => `${styles[`category-card-container`]} ${styles[`is-selected`]}`
  //       )
  //     } else if (category.id === hoveredCategoryId) {
  //       setCardClasses(
  //         () => `${styles[`category-card-container`]} ${styles[`is-hovered`]}`
  //       )
  //     } else {
  //       setCardClasses(() => `${styles[`category-card-container`]}`)
  //     }
  //   },
  //   [selectedCategoryId, hoveredCategoryId, category.id]
  // )

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
      console.log(item)
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
      console.log(coppiedStateArray)
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

  // const hoverHandler = function () {
  //   // dispatch(categoryActions.changeHovered({ hoveredCategoryId: category.id }))
  // }
  const selectHandler = function () {
    dispatch(
      categoryActions.changeSelected({ selectedCategoryId: category.id })
    )
  }
  // const mouseOutHandler = function () {
  //   // dispatch(categoryActions.changeHovered({ hoveredCategoryId: null }))
  // }

  // const dragStartHandler = function () {
  //   // dispatch(dragStart(idx, cardType, category))
  // }
  // const dragEnterHandler = function () {
  //   // dispatch(dragEnter(idx, cardType, category))
  // }
  // const dragEndHandler = function () {
  //   // dispatch(
  //   //   dragEnd(
  //   //     dragStartColumn,
  //   //     dragStartIdx,
  //   //     dragStartTask,
  //   //     dragEndColumn,
  //   //     dragEndIdx,
  //   //     dragEndTask
  //   //   )
  //   // )
  //   // dispatch(resetStartEnd())
  // }
  // const dragExitHandler = function () {
  //   // dispatch(resetEnd())
  // }
  const settingAndOpenModal = function () {
    settingModal(cardType, category)
    openModal()
  }
  return (
    <div
      ref={ref}
      className={`${styles[`category-card-container`]}`}
      style={{ opacity }}
      // onMouseEnter={() => hoverHandler(category.id)}
      onClick={() => selectHandler(category.id)}
      // onMouseLeave={() => mouseOutHandler()}
      // onDragStart={dragStartHandler}
      // onDragEnd={dragEndHandler}
      // onDragExit={dragExitHandler}
      // onDragEnter={dragEnterHandler}
    >
      {/* 카드 헤더에 onSetting이랑 onDelete 넣어줘야 함. */}
      <CardHeader data={category} onSetting={settingAndOpenModal} />
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
