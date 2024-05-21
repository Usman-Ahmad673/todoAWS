        // components/TodoPage.js

        import React, { useEffect, useState } from 'react';
        import axios from 'axios';
    import { useNavigate } from 'react-router-dom';

        const TodoPage = () => {
        const navigate = useNavigate();
        const [todos, setTodos] = useState([]);
        const [todoText, setTodoText] = useState('');
        const [todoMarked, setTodoMarked] = useState(false);
        const token = localStorage.getItem('token', token);
        useEffect(() => {
        //     if(!token){
        //     navigate('/');
        // }
        getTodos();

        },[token])
        const userId = localStorage.getItem('Id'); 

        const getTodos = async () => {
            try {
            const response = await axios.get('http://54.242.41.61:5000/api/getTodos');
            setTodos(response.data.todos);
            } catch (error) {
            console.error('Error fetching todos:', error);
            }
        };

        const handleAddTodo = async () => {
            try {
            const response = await axios.post('http://54.242.41.61:5000/api/addTodo', { userId: userId, todo: todoText });
            setTodos([...todos, response.data.todo]);
            setTodoText('');
            } catch (error) {
            console.error('Error adding todo:', error);
            }
        };
        
        const handleUpdateTodo = async (todoId, newText) => {
            try {
            await axios.put(`http://54.242.41.61:5000/api/updateTodo`, { userId: userId, todoId: todoId ,todo: newText });
            // Update todos state to reflect the changes
            const updatedTodos = todos.map(todo =>
                todo._id === todoId ? { ...todo, text: newText } : todo
            );
            setTodos(updatedTodos);
            } catch (error) {
            console.error('Error updating todo:', error);
            }
        };
        
        const handleDeleteTodo = async (todoId) => {
            try {
            await axios.delete(`http://54.242.41.61:5000/api/deleteTodo`, { userId: userId, todoId: todoId });
            const updatedTodos = todos.filter(todo => todo._id !== todoId);
            setTodos(updatedTodos);
            } catch (error) {
            console.error('Error deleting todo:', error);
            }
        };
        const handleMarkTodo = async (todoId) => {
            try {
                setTodoMarked(!todoMarked)
            await axios.put(`http://54.242.41.61:5000/api/updateTodo`, { userId: userId, todoId: todoId ,todo: todoMarked })
            setTodoMarked(false)
            } catch (error) {
            console.error('Error deleting todo:', error);
            }
        };

        return (
            <div>
            <h1>Todo Page</h1>
            <div>
                <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
            <ul>
                {todos.map(todo => (
                <li key={todo.id}>
                    {todo.text}
                    <button onClick={() => handleUpdateTodo(todo.id, 'New Text')}>Update</button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    <button value={todo.marked} onClick={() => handleMarkTodo(todo.id)}>Mark</button>
                </li>
                ))}
            </ul>
            </div>
        );
        };

        export default TodoPage;
