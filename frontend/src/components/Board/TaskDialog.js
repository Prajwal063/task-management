import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import api from '../../services/api';

const TaskDialog = ({ task, open, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  const handleSave = async () => {
    try {
      const updatedTask = await api.put(`/tasks/${task._id}`, { title, description, status });
      onSave(updatedTask.data);
      onClose();
    } catch (err) {
      console.error('Error updating task:', err.response?.data?.msg || err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          select
          SelectProps={{
            native: true,
          }}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </TextField>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
