        import React, { useEffect, useState } from 'react';
        import axios from 'axios';
        import UpdateDialog from './UpdateDialog.js';
        import { useNavigate } from 'react-router-dom';
        function TodoForm() {
        const [addTodo, setAddTodo] = useState('');
        const [todos, setTodos] = useState([]);
        const [completetodos, setCompleteTodos] = useState([]);
        const [uncompletetodos, setUncompleteTodos] = useState([]);
        const [showDialog, setShowDialog] = useState(false);
        const [selectedTodoId, setSelectedTodoId] = useState(null);
        const [showCompleted, setShowCompleted] = useState(false);
        const [showUncompleted, setShowUncompleted] = useState(false);
        const [showAll, setShowAll] = useState(false);
        const [del, setDel] = useState(false);
        const [upd, setUpd] = useState(false);
        const [add, setAdd] = useState(false);
        const [mark, setMark] = useState(false);

        const userId = localStorage.getItem('userId')
        const navigate = useNavigate()
        
        useEffect(() => {
            if(!userId){
                navigate('/')
            }
            getTodos()
        },[showAll, showUncompleted, showCompleted , add , upd , del , mark])
        
        const getTodos = async() => {

            // const respnose = axios.get('http://localhost:5000/api/getTodos',{params: { userId }})
            const respnose = axios.get('http://54.242.41.61:5000/api/getTodos',{params: { userId }})
            .then(response => {
                // console.log('Todo added successfully:', response.data.success);
                // console.log('Todo added successfully:', response.data.todos);
                // setTodos(todos => [...todos, response.data.todos[0]])
                setTodos(response.data.todos);
                // console.log('Todo added successfullysadasd:', todos);
            })
            .catch(error => {
                // Handle error
                console.error('Error adding todo:', error);
            });
            
        }

        const handleTodoSubmit = (e) => {
            e.preventDefault();
            // console.log('Todo added successfully:');
            const config = {
                headers: {"Content-Type":"application/json"}
            }
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('todo', addTodo);
            
            // const respnose = axios.get('http://localhost:5000/api/getTodos')
            const respnose = axios.post('http://54.242.41.61:5000/api/addTodo', formData , config)
            .then(response => {
                // Handle success
                // console.log('Todo added successfully:', response.data.success);
                // console.log('Todo added successfully:', response.data.todos);
                getTodos();
                setAddTodo('')
                setAdd(!add)
                
            })
            .catch(error => {
                    // Handle error
                    console.error('Error adding todo:', error);
                });
                
            };

        const deleteHandler = async(id) => {
            // console.log('Todo Deleted id',id)                
            
            
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('todoId', id);

            const response = await axios.delete('http://54.242.41.61:5000/api/deleteTodo', {
                headers: {"Content-Type":"application/json"},
                data: formData
            });
            setDel(!del)
            };

        const markHandler = async(id , marked) => {
            // console.log('Todo updated id',id)                
            // console.log('Todo updated id',marked)                
            
                    
            const response = await axios.put(
                'http://54.242.41.61:5000/api/updateTodo',
                {
                    userId: userId,
                    todoId: id,
                    marked: !marked, // Toggle the marked value
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            setMark(!mark)
            };

            const handleUpdateClick = (id) => {
                setShowDialog(true);
                setSelectedTodoId(id);
            };
            
            const handleCloseDialog = () => {
                setShowDialog(false);
                setSelectedTodoId(null);
            };
            
            const handleSaveNewTodo = (newTodoText) => {
                updateHandler(selectedTodoId, newTodoText);
            };

            const updateHandler = async(id , newTodo) => {
                console.log('Todo updated id',id)                
                
                
                const response = await axios.put(
                    'http://54.242.41.61:5000/api/updateTodo',
                    {
                        userId: userId,
                        todoId: id,
                        todo: newTodo, 
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                setUpd(!upd)
                };
        
                const handleCompletedClick = () => {
                    setShowAll(true);
                    setShowUncompleted(false);
                    setShowCompleted(true);
                    const completed = todos.filter(todo => todo.marked == true);
                    setCompleteTodos(completed);
                };
                const handleUnompletedClick = () => {
                    
                    setShowAll(true);
                    setShowCompleted(false);
                    setShowUncompleted(true);
                    const uncompleted = todos.filter(todo => todo.marked == false);
                        setUncompleteTodos(uncompleted);
                    };

                const handleShowAll = () => {
                    
                    setShowAll(false);
                    setShowCompleted(false);
                    setShowUncompleted(false);
                    
                    };
                    const handleLogout = () => {
                        localStorage.removeItem('userId');
                        navigate('/'); 
                    };
        return (
            <div className="todoapp stack-large">
            <div className="logout-btn">
                <button onClick={handleLogout}>Logout</button>
            </div>
        <h1>Todo App</h1>
        <form onSubmit={handleTodoSubmit}>
            <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
                What needs to be done?
            </label>
            </h2>
            <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="Add Todo"
            value={addTodo}
            onChange={(e) => setAddTodo(e.target.value)}
            autoComplete="off"
            />
            <button type="submit" className="btn btn__primary btn__lg">
            Add
            </button>
        </form>
        <div className="filters btn-group stack-exception">
                <button type="button" className="btn toggle-btn" aria-pressed="true" onClick={handleShowAll}>
                    <span className="visually-hidden">Show </span>
                    <span>All</span>
                    <span className="visually-hidden"> tasks</span>
                </button>
                <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={handleUnompletedClick}>
                    <span className="visually-hidden">Show </span>
                    <span>Incomplete</span>
                    <span className="visually-hidden"> tasks</span>
                </button>
                <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={handleCompletedClick}>
                    <span className="visually-hidden">Show </span>
                    <span>Completed</span>
                    <span className="visually-hidden"> tasks</span>
                </button>
            </div>
            {showAll ? showUncompleted ? <h2 id="list-heading">{uncompletetodos.length} Task(s) Remaining</h2> : <h2 id="list-heading">{completetodos.length} Task(s) Completed</h2> : <h2 id="list-heading">Total Task(s) : {todos.length}</h2>}
        <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading">
            {showAll ? showUncompleted ? uncompletetodos.map(todo => (
                <li key={todo._id} className="todo stack-small">
                    <div className="c-cb">
                        <input onChange={() => markHandler(todo._id , todo.marked)} id={`todo-${todo._id}`} type="checkbox" defaultChecked={todo.marked} />
                        <label className="todo-label" htmlFor={`todo-${todo._id}`}>
                            {todo.todo}
                        </label>
                    </div>
                    <div className="btn-group">
                    <button onClick={() => handleUpdateClick(todo._id)}>Update</button>
                        <button onClick={() => deleteHandler(todo._id)} type="button" className="btn btn__danger">
                            Delete <span className="visually-hidden">{todo._id}</span>
                        </button>
                    </div>
                </li>
            )) : completetodos.map(todo => (
                <li key={todo._id} className="todo stack-small">
                    <div className="c-cb">
                        <input onChange={() => markHandler(todo._id , todo.marked)} id={`todo-${todo._id}`} type="checkbox" defaultChecked={todo.marked} />
                        <label className="todo-label" htmlFor={`todo-${todo._id}`}>
                            {todo.todo}
                        </label>
                    </div>
                    <div className="btn-group">
                    <button onClick={() => handleUpdateClick(todo._id)}>Update</button>
                        <button onClick={() => deleteHandler(todo._id)} type="button" className="btn btn__danger">
                            Delete <span className="visually-hidden">{todo._id}</span>
                        </button>
                    </div>
                </li>
            )) : todos.map(todo => (
                <li key={todo._id} className="todo stack-small">
                    <div className="c-cb">
                        <input onChange={() => markHandler(todo._id , todo.marked)} id={`todo-${todo._id}`} type="checkbox" defaultChecked={todo.marked} />
                        <label className="todo-label" htmlFor={`todo-${todo._id}`}>
                            {todo.todo}
                        </label>
                    </div>
                    <div className="btn-group">
                    <button onClick={() => handleUpdateClick(todo._id)}>Update</button>
                        <button onClick={() => deleteHandler(todo._id)} type="button" className="btn btn__danger">
                            Delete <span className="visually-hidden">{todo._id}</span>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
        {showDialog && (
        <UpdateDialog onClose={handleCloseDialog} onSave={handleSaveNewTodo} />
        )}
        </div>
    );
        }

        export default TodoForm;