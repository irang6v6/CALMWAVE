import { useState, useEffect } from "react"
import styles from "./EpicCard.module.css"

function EpicCard({
  hoverEpicId,
  selectedEpicId,
  epic,
  hoverHandler,
  selectHandler,
  mouseOutHandler,
}) {
  // hoverEpicId, selectedEpicId, epic, hoverHandler, selectHandler
  const [cardClasses, setCardClasses] = useState(
    `${styles[`epic-card-container`]}`
  )
  useEffect(
    function () {
      if (epic.epicId === selectedEpicId && epic.epicId === hoverEpicId) {
        setCardClasses(
          () =>
            `${styles[`epic-card-container`]} ${styles[`is-selected`]} ${
              styles[`is-hovered`]
            }`
        )
      } else if (epic.epicId === selectedEpicId) {
        setCardClasses(
          () => `${styles[`epic-card-container`]} ${styles[`is-selected`]}`
        )
      } else if (epic.epicId === hoverEpicId) {
        setCardClasses(
          () => `${styles[`epic-card-container`]} ${styles[`is-hovered`]}`
        )
      } else {
        setCardClasses(() => `${styles[`epic-card-container`]}`)
      }
    },
    [selectedEpicId, hoverEpicId, epic.epicId]
  )
  return (
    <div
      className={cardClasses}
      onMouseEnter={() => hoverHandler(epic.epicId)}
      onClick={() => selectHandler(epic.epicId)}
      onMouseLeave={() => mouseOutHandler()}
    >
      <div>{epic.name}</div>
      <div>{epic.sumBusinessHours}</div>
      <div>{epic.epicDescription}</div>
    </div>
  )
}

export default EpicCard
