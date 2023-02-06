import { useEffect, useState } from "react"

// 아직 미완성
// 렌더링 조건 을 props로 받고
// transition이 end 되었냐? 를 state로 가지고
// transitionendHandler 이후 dispatch로 없애준다.......
function useAnimation(opened) {
  const [isTransition, setIsTransition] = useState(false)

  useEffect(() => {
    if (opened) {
      setIsTransition(true)
    }
  }, [opened])

  const isRender = opened || isTransition
  const animationTrigger = opened && isTransition

  const transitionEndHandler = function () {
    if (!opened) {
      setIsTransition(false)
    }
  }

  return [isRender, transitionEndHandler, animationTrigger]
}

export default useAnimation

/*
import { useEffect, useState } from "react"

// 아직 미완성
// 렌더링 조건 을 props로 받고
// transition start 할가요? state
// transition이 end 되었냐? 를 state로 가지고
// transitionendHandler 이후 dispatch로 없애준다.......
function useAnimation(opened) {
  const [transitionEnd, setTransitionEnd] = useState(false)
  
  const shouldRender = opened || transitionEnd
  const transitionTrigger = function() {
    setTransitionEnd(true)
  }


  return [shouldRender, handleTransitionEnd, animationTrigger]
}

export default useAnimation
*/
