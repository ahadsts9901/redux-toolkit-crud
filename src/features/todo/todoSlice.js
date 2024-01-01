import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
}



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload.title,
                text: action.payload.text,
                time: `${new Date()}`,
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.text = action.payload.editedText
                    todo.title = action.payload.editedTitle
                }
                return todo
            })
        }
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer