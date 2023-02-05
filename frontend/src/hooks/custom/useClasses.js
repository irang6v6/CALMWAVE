import { useCallback, useEffect, useState } from "react"

export const useClasses = function (styles, baseClassName) {
  const [isHover, setIsHover] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [classes, setClasses] = useState(styles[baseClassName])
  useEffect(
    function () {
      if (isHover && isSelected) {
        setClasses(
          `${styles[baseClassName]} ${styles[`hover`]} ${styles[`select`]}`
        )
      } else if (isHover && !isSelected) {
        setClasses(`${styles[baseClassName]} ${styles[`hover`]}`)
      } else if (!isHover && isSelected) {
        setClasses(`${styles[baseClassName]} ${styles[`select`]}`)
      } else {
        setClasses(`${styles[baseClassName]}`)
      }
    },
    [isHover, isSelected, styles, baseClassName]
  )
  const toggleHover = useCallback(function () {
    setIsHover((val) => !val)
  }, [])
  const toggleSelect = useCallback(function () {
    setIsSelected((val) => !val)
  }, [])
  const customSelect = useCallback(function (selected) {
    setIsSelected((val) => selected)
  }, [])

  return [toggleHover, toggleSelect, customSelect, classes]
}
