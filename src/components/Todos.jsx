import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'
import Swal from 'sweetalert2'

function Todos() {
  const todos = useSelector(state => state.todos)
  console.log(todos);
  const dispatch = useDispatch()

  const delTodo = (id) => {
    Swal.fire({
      title: 'Delete Post',
      showCancelButton: true,
      cancelButtonColor: "#24232c",
      confirmButtonText: 'Delete',
      confirmButtonColor: "#24232c",
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

  const editTodo = (id) => {

    Swal.fire({
      title: 'Edit Post',
      html: `
      <input type="text" id="editTitle" class="swal2-input" placeholder="Post Title" value="${"d"}" required>
      <textarea id="editText" class="swal2-input text" placeholder="Post Text" required>${"d"}</textarea>
    `,
      showCancelButton: true,
      cancelButtonColor: "#24232c",
      confirmButtonText: 'Update',
      confirmButtonColor: "#24232c",
      preConfirm: () => {

        const editedTitle = document.getElementById('editTitle').value;
        const editedText = document.getElementById('editText').value;

        if (!editedTitle.trim() || !editedText.trim()) {
          Swal.showValidationMessage('Title and text are required');
          return false;
        }

        try {
          dispatch(updateTodo(id, editedTitle, editedText))

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
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
          >
            <div>{todo.text}</div>
            <button onClick={() => delTodo(todo.id)}>Delete</button>
            <button onClick={() => editTodo(todo.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos