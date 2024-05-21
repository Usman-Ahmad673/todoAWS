import React, { useState } from 'react';

const UpdateDialog = ({ onClose, onSave }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSave = () => {
    onSave(newTodo);
    setNewTodo('');
    onClose();
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="dialog">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={handleSave}>Save</button>
      <button className='btn-close' onClick={handleClose}>Close</button>
    </div>
  );
};

export default UpdateDialog;
