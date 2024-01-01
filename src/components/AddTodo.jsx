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
      return
    }

    dispatch(addTodo({
      title: titleRef.current.value,
      text: textRef.current.value
    }))

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

    e.target.reset()

  }

  return (
    <form onSubmit={addTodoHandler} className='flex flex-col justify-start items-center gap-[1em] w-[100%]'>
      <input
        type="text"
        placeholder="Enter Title..."
        ref={titleRef}
        className='w-[80%] p-[0.5em] rounded-[3px] border-[1px]'
      />
      <textarea
        ref={textRef}
        placeholder='Enter Text...'
        className='w-[80%] p-[0.5em] rounded-[3px] border-[1px]'
      >
      </textarea>
      <div className='w-[80%]'>
        <button
          type="submit"
          className='rounded-[3px] bg-[#8361be] text-[#f0f1f4] font-bold p-[0.5em] w-[5em]'
        >
          Post
        </button>
      </div>
    </form>
  )
}

export default AddTodo