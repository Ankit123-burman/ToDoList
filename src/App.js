import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  let [todolist, setTodolist] = useState([]);
  
  let showtodolist = (event) => {
    event.preventDefault();
    let todoname = event.target.todoname.value.trim();
    
    if (todoname && !todolist.includes(todoname)) {
      let finaltodolist = [...todolist, todoname];
      setTodolist(finaltodolist);
      toast.success('Task Added...');
      event.target.reset();
    } else {
      toast.error('Task Already Added or Empty!!');
    }
  };

  let list = todolist.map((value, index) => (
    <ToDoListItem
      value={value}
      key={index}
      indexNumber={index}
      todolist={todolist}
      setTodolist={setTodolist}
    />
  ));

  return (
    <div className='min-h-screen w-full bg-black flex flex-col'>
      <nav>
        <header className='text-center bg-purple-600 text-white py-4'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>ToDo List</h1>
        </header>
      </nav>
      <main className='flex-grow flex flex-col items-center p-4'>
        <form className='w-full max-w-md mt-5' onSubmit={showtodolist}>
          <div className='flex flex-col sm:flex-row  gap-4'>
            <input
              type="text"
              placeholder='Enter your today work....'
              className='flex-grow h-12 w-96 rounded-full  p-4'
              name='todoname'
            />
            <button className='px-6 py-2 bg-purple-600 text-white rounded-full' type='submit'>
              Save
            </button>
          </div>
        </form>
        <div className="w-full max-w-2xl">
          {list}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;

function ToDoListItem({value, indexNumber, todolist, setTodolist}) {
  let [status, setStatus] = useState(false);
  
  let deleteRow = (e) => {
    e.stopPropagation();
    let finalData = todolist.filter((v, i) => i !== indexNumber);
    setTodolist(finalData);
  }

  let checkStatus = () => {
    setStatus(!status);
  }

  return (
    <div className='mb-4'>
      <div 
        onClick={checkStatus} 
        className={`p-3 rounded-2xl text-xl sm:text-2xl md:text-3xl cursor-pointer relative
          ${status ? 'text-red-600 line-through' : 'text-white bg-gray-800'}`}
      >
        <span className="mr-2">{indexNumber + 1}</span>
        <span>{value}</span>
        <button 
          onClick={deleteRow} 
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl sm:text-3xl'
        >
          ×
        </button>
      </div>
    </div>
  );
}