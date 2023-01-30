import EpicCard from "../../../components/UI/EpicCard/EpicCard"
import styles from "./Epic.module.css"

function Epic({
  epicList,
  hoverEpicId,
  selectedEpicId,
  hoverHandler,
  selectHandler,
  mouseOutHandler,
}) {
  // hoverEpicId, SelectedEpicId, hoverHandler, selectHandler, mouseOutHandler
  return (
    <>
      <div className={`${styles[`cam-container`]}`}>캠임</div>
      <div className={`${styles[`epic-container`]}`}>
        {epicList.map((val) => {
          return (
            <EpicCard
              hoverEpicId={hoverEpicId}
              selectedEpicId={selectedEpicId}
              epic={val}
              key={`epic-${val.epicId}`}
              hoverHandler={hoverHandler}
              selectHandler={selectHandler}
              mouseOutHandler={mouseOutHandler}
            />
          )
        })}
      </div>
    </>
  )
}

export default Epic
