import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'
import Swal from 'sweetalert2'

function AddTodo() {

  const [message, setMessage] = useState()

  const titleRef = useRef()
  const textRef = useRef()
  const dispatch = useDispatch()

  const addTodoHandler = (e) => {
    e.preventDefault()

    if (titleRef.current.value.trim() === "" || textRef.current.value.trim() === "") {
      setMessage("Title and Text are required")
      return
    }

    dispatch(addTodo(titleRef.current.value, textRef.current.value))

    // sweet alert toast
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1200,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      title: "Post Added"
    });

  }

  return (
    <form onSubmit={addTodoHandler}>
      <input
        type="text"
        placeholder="Enter Title..."
        ref={titleRef}
      />
      <textarea ref={textRef} placeholder='Enter Text'></textarea>
      <div>
        <button
          type="submit"
        >
          Post
        </button>
        <p>{message}</p>
      </div>
    </form>
  )
}

export default AddTodo