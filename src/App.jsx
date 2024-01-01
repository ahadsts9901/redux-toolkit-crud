import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {

  return (
    <>
      <h1 className='text-[2em] text-center font-bold pt-[1em] text-[#f0f1f4]'>Redux Toolkit <span className='text-[#8361be]'>CRUD</span></h1>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App