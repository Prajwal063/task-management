import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';

const TaskForm = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');

  const handleSave = () => {
    onSave({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('Todo');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      
      <DialogTitle>Add Task</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
      
    </Dialog>
  );
};

export default TaskForm;
