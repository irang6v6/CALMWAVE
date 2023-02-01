import { useCallback, useState } from "react"

export const useInput = function (ref) {
  const [input, setInput] = useState("")
  const onChangeHandler = useCallback(
    function () {
      setInput(() => ref.current.value)
    },
    [ref]
  )
  const onSetDataTrigger = useCallback(
    function (originalValue) {
      setInput(originalValue)
      ref.current.value = originalValue
    },
    [ref]
  )
  return [input, onChangeHandler, onSetDataTrigger]
}
