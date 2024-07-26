import React, { useState, useEffect } from 'react';
import Column from './Column';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TaskForm from './TaskForm';
import TaskDialog from './TaskDialog';
import api from '../../services/api';

const statuses = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err.response?.data?.msg || err.message);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskDrop = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error('Error updating task status:', err.response?.data?.msg || err.message);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await api.post('/tasks', newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (err) {
      console.error('Error creating task:', err.response?.data?.msg || err.message);
    }
  };

  const handleSearch = () => {
    const filteredTasks = tasks.filter((task) => task.title.includes(searchTerm));
    setTasks(filteredTasks);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      await api.delete(`/tasks/${taskId}`);
    } catch (err) {
      console.error('Error deleting task:', err.response?.data?.msg || err.message);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleTaskDialogClose = () => {
    setIsTaskDialogOpen(false);
    setSelectedTask(null);
  };

  const handleTaskDialogSave = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    handleTaskDialogClose();
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    } else if (sortBy === 'createdAt') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px' }}>
        <Typography variant="h4" sx={{ padding: '8px', borderRadius: '10px' }}>
          Todo List
        </Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
        <TextField
          fullWidth
          label="Search Tasks"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '8px' }}
        />

        <IconButton color="primary" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>

        <FormControl variant="outlined" style={{ marginLeft: '16px', minWidth: '150px' }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="createdAt">Recent</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>

      </div>
      <div style={{ margin: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsTaskFormOpen(true)}
          fullWidth
          style={{ marginBottom: '16px' }}
        >
          Add Task
        </Button>
      </div>
      <div style={{
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    borderRadius: '10px',
    maxWidth: '1200px'  
  }}>
  {statuses.map((status) => (
    <div key={status} style={{
      flex: '1 1 300px',  
      maxWidth: 'calc(33.333% - 16px)',  
      minWidth: '300px', 
    }}>
      <Column
        status={status}
        tasks={sortedTasks.filter((task) => task.status === status)}
        onTaskDrop={handleTaskDrop}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        onViewTask={handleViewTask}
      />
    </div>
  ))}
</div>

      <TaskForm
        open={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSave={handleAddTask}
      />
      {selectedTask && (
        <TaskDialog
          task={selectedTask}
          open={isTaskDialogOpen}
          onClose={handleTaskDialogClose}
          onSave={handleTaskDialogSave}
        />
      )}
    </DndProvider>
  );
};

export default Board;
