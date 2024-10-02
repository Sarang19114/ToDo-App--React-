import React, { useState } from "react";

const Todo = () => {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const addTodo = () => {
        if (input.trim() !== '') {
            const newTodo = {
                id: new Date().getTime(),
                text: input,
            };

            setTodos([...todos, newTodo]);
            setInput('');
        }
    };

    const deleteTodo = (id) => {
        const updateTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updateTodos);
    };

    const enterEditMode = (id, text) => {
        setEdit(true);
        setEditId(id);
        setEditValue(text);
    }

    const updateTodo = () => {
        const updateTodos = todos.map((todo) => {
            if(todo.id === editId) {
                return {...todo, text:editValue}
            }
            return todo;
        });

        setTodos(updateTodos);
        setEdit(false)
        setEditId(null);
        setEditValue('')
    }

    return (
        <div className="todo-container">
            <h2>ToDo List</h2>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {
                    edit ? (
                        <div>
                            <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                            <button onClick={updateTodo} className="edit-button">Update</button>
                        </div>
                    ): (
                        <button onClick={addTodo} className="add-button">Add</button>
                    )
                }
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <div>
                            <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
                            <button onClick={() => enterEditMode(todo.id, todo.text)} className="edit-button">Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;

