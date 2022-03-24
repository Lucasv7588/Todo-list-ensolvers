import { useState, useEffect } from 'react';
import "./App.css"
import backgroundImage from './img/background.jpg';
import { InsertTodo } from './Component/InsertTodo';
import { TodoList } from './Component/TodoList';
import { TodoListActive } from './Component/TodoListActive';
import { TodoListCompleted } from './Component/TodoListCompleted';

const URL = "http://localhost:3001";



function App() {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    GetTodos();
  }, [])

  const GetTodos = () => {
    fetch(`${URL}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error: ", err));
  }

  const ChangePage = (page) => {
    setPage(page);
  }

  const toggleChecked = async id => {
    const data = await fetch(`${URL}/todo/complete/${id}`)
        .then(res => res.json())
    
    setTodos(todos => todos.map(todo => {
      if(todo._id === data._id){
        todo.complete = data.complete;
      }
      return todo;
    }))
  }

  const addTodo = async () => {
    if(newTodo.length > 0){
      const data = await fetch(`${URL}/todo/new`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          text: newTodo
        })
      }).then(res => res.json());
      setTodos([...todos, data]);
      setNewTodo("")
    }
  }

  const deleteTodo = async id => {
    const data = await fetch(`${URL}/todo/delete/${id}`, { method: 'DELETE' })
        .then(res => res.json())

    setTodos(todos => todos.filter(todo => todo._id != data._id))
  }

  return (
    <div className='app' style={
      {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }
    }>
      <div className='container'>
        <div className='title'>
          <h1>Todo List</h1>
        </div>
        <InsertTodo 
          setNewTodo={setNewTodo}
          newTodo={newTodo}
          addTodo={addTodo}
        />
        {
          page === 1 ? (<TodoList 
                          todo={todos} 
                          ChangePage={ChangePage} 
                          page={page}
                          toggleChecked={toggleChecked}
                          deleteTodo={deleteTodo}
                        />) 
        : ( page===2 ? (<TodoListActive 
                          todo={todos} 
                          ChangePage={ChangePage} 
                          page={page}
                          toggleChecked={toggleChecked}
                          deleteTodo={deleteTodo}
                        />)
                      : <TodoListCompleted 
                          todo={todos} 
                          ChangePage={ChangePage} 
                          page={page}
                          toggleChecked={toggleChecked}
                          deleteTodo={deleteTodo}
                        /> )
        }
        
      </div>
    </div>
  );
}

export default App;
