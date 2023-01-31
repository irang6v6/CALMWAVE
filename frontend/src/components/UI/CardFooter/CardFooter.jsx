import { useRef } from "react"
import styles from "./CardFooter.module.css"
import { useCustomWidthHeight } from "../../../hooks/custom/useCustomWidthHeight"
import FooterGraph from "../../Canvas/FooterGraph/FooterGraph"

function CardFooter(data) {
  const footerRef = useRef(null)
  const { width, height } = useCustomWidthHeight(footerRef)
  return (
    <div ref={footerRef} className={`${styles[`card-footer-container`]}`}>
      <FooterGraph
        canvasWidth={width}
        canvasHeight={height}
        bgColor={`rgba(255, 255, 255, 1)`}
        fillColor={`rgba(52, 104, 199, 1)`}
        maxPoint={100}
        nowPoint={77}
      />
    </div>
  )
}

export default CardFooter
