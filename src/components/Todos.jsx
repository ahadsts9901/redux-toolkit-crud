import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'
import Swal from 'sweetalert2'
import moment from 'moment'
import "../App.css"

function Todos() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  const delTodo = (id) => {
    Swal.fire({
      title: 'Delete Post',
      showCancelButton: true,
      cancelButtonColor: "#1b1b1b",
      confirmButtonText: 'Delete',
      confirmButtonColor: "#1b1b1b",
      preConfirm: () => {

        try {

          dispatch(removeTodo(id))
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
            title: "Post Deleted"
          });

        } catch (error) {

          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to delete post',
            // text: error.response.data,
            showConfirmButton: false
          });

        }
      }
    });
  }

  const editTodo = (event, id) => {

    Swal.fire({
      title: 'Edit Post',
      html: `
      <input type="text" id="editTitle" class="swal2-input" placeholder="Post Title" value="${event.target.parentNode.parentNode.firstElementChild.textContent}" required>
      <textarea id="editText" class="swal2-input text" placeholder="Post Text" required>${event.target.parentNode.parentNode.firstElementChild.nextElementSibling.textContent}</textarea>
    `,
      showCancelButton: true,
      cancelButtonColor: "#1b1b1b",
      confirmButtonText: 'Update',
      confirmButtonColor: "#1b1b1b",
      preConfirm: () => {

        const editedTitle = document.getElementById('editTitle').value;
        const editedText = document.getElementById('editText').value;

        if (!editedTitle.trim() || !editedText.trim()) {
          Swal.showValidationMessage('Title and text are required');
          return false;
        }

        try {
          dispatch(updateTodo({ id: id, editedTitle: editedTitle, editedText: editedText }))

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
            title: "Post Updated"
          });

        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to update post',
            // text: error.response.data,
            showConfirmButton: false
          });
        }
      }
    });

  }

  return (
    <>
      <div className='posts w-[80%] h-[100%] flex flex-wrap justify-center items-start gap-[1em]'>
        {
          todos.length > 0 ?
            todos.map((todo) => (
              <div key={todo.id} className='w-[15em] h-[15em] flex flex-col gap-[1em] p-[1em] border-[2px] border-[#f0f1f4] bg-[#1e1e1e] rounded-[10px]'>
                <h2 className='h-[1.5em] postHeading text-[1.8em] w-[100%] text-left text-[#8361be] font-bold'>{todo.title}</h2>
                <p className='postText text-[#f0f1f4] text-[0.9em] text-left w-[100%] h-[5em]'>{todo.text}</p>
                <div className='flex justify-end items-center w-[100%] gap-[0.7em]'>
                  <button onClick={() => delTodo(todo.id)} className='bg-[#8361be] text-[#f0f1f4] rounded-[3px] p-[0.3em] text-center w-[5em] text-[0.7em]' >Delete</button>
                  <button onClick={(event) => editTodo(event, todo.id)} className='bg-[#8361be] text-[#f0f1f4] rounded-[3px] p-[0.3em] text-center w-[5em] text-[0.7em]' >Edit</button>
                </div>
                <p className='text-[0.7em] text-[#f0f1f4] w-[100%] text-right'>{moment(todo.time).fromNow()}</p>
              </div>
            )) : 
            <h1 className='w-[100%] text-center m-[auto] text-[#f0f1f4] text-[2em] font-bold'>No Post Found...</h1>
        }
      </div>
    </>
  )
}

export default Todos