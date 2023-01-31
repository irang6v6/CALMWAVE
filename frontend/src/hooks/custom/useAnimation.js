import { useEffect, useState } from "react"

// 아직 미완성

function useAnimation(condition) {
  const [isComplete, setComplete] = useState(false)

  useEffect(() => {
    if (condition) {
      setComplete(true)
    }
  }, [condition])

  const shouldRender = condition || isComplete
  const animationTrigger = condition && isComplete

  const handleTransitionEnd = function () {
    if (!condition) {
      setComplete(false)
    }
  }

  return [shouldRender, handleTransitionEnd, animationTrigger]
}

export default useAnimation
