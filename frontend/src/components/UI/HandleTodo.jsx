import { useDispatch } from "react-redux"
import { todoActions } from "../../store/todos-slice"
import { useState, useRef } from "react"
import { useSelector } from "react-redux"

export default function HandleTodo(props) {

  const todos = useSelector(state => state.todos.todos)

  const [id, setId] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()

  const [idRef, titleRef, descriptionRef] = [useRef(), useRef(), useRef()]

  const onInputIdHandler = () => {
    setId(idRef.current.value)
  }

  const onInputTitleHandler = () => {
    setTitle(titleRef.current.value)
  }

  const onInputDescriptionHandler = () => {
    setDescription(descriptionRef.current.value)
  }

  const dispatch = useDispatch()
  const submitTodo = () => {
    const prevState = todos
    const nowId = parseInt(id)
    if ( prevState.find(e => e.id === nowId) ){
      console.log("YES")
      console.log(idRef.current.value)
      dispatch(todoActions.changeTodos(
        prevState.map((e) => {
          return {
            ...e,
            title: e.id === nowId ? title : e.title,
            description: e.id === nowId ? description : e.description,
          }
        })
      ))
    } else {
      dispatch(todoActions.changeTodos(
        [...prevState,
        {
        id: id,
        title: title,
        description: description,
        column: "To do",
      }]))
    }
    idRef.current.value = ""
    titleRef.current.value = ""
    descriptionRef.current.value = ""
    console.log(todos)
  }
  return (
    <>
    <label htmlFor="id">ID</label>
    <input ref={idRef} onChange={onInputIdHandler} type="text" id="id" maxLength="255"  />
    <label htmlFor="title">TITLE</label>
    <input ref={titleRef} onChange={onInputTitleHandler} type="text" id="title" maxLength="255" />
    <label htmlFor="description">DESCRIPTION</label>
    <input ref={descriptionRef} onChange={onInputDescriptionHandler} type="text" id="description" maxLength="255" />
    <button onClick={submitTodo}>SUBMIT</button>
    </>
  )
}