import React from 'react';
import { useDrag } from 'react-dnd';
import { Button, Box, Typography } from '@mui/material';

const Task = ({ task, onEdit, onView, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }), 
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime())
      ? date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : 'Invalid date';
  };

  return (
    <Box
      ref={drag}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '14px',
        margin: '16px',
        borderRadius: '10px',
        backgroundColor: '#B6C4B6',
        border: '1px solid grey',
      }}
    >
      <Box sx={{ fontWeight: 'bold' }}>{task.title}</Box>
      <Box>
  <span style={{ textDecoration: 'underline' }}>Description:</span> {task.description}
</Box>

      <Typography variant="caption" display="block" gutterBottom>
        Created at: {formatDate(task.createdAt)}
        
      </Typography>
      <Box
  mt={1}
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons vertically on small screens, horizontally on larger screens
    gap: 1 // Add spacing between buttons
  }}
>
  <Button
    variant="contained"
    color="secondary"
    sx={{ mb: { xs: 1, sm: 0 }, textTransform: 'none' }} // Margin-bottom for small screens, none for larger screens
    onClick={() => onEdit(task)}
  >
    Edit
  </Button>
  <Button
    variant="contained"
    sx={{ mb: { xs: 1, sm: 0 }, textTransform: 'none' }} // Margin-bottom for small screens, none for larger screens
    onClick={() => onView(task)}
  >
    View Details
  </Button>
  <Button
    variant="contained"
    color="error"
    sx={{ textTransform: 'none' }}
    onClick={() => onDelete(task._id)}
  >
    Delete
  </Button>
</Box>

    </Box>
  );
};

export default Task;
