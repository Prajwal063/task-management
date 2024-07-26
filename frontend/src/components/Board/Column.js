import React from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';
import { Box, Typography } from '@mui/material';

const Column = ({ status, tasks, onTaskDrop, onDeleteTask, onEditTask, onViewTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onTaskDrop(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
   

  return (
    <Box
      ref={drop}
      sx={{
        padding: '16px',
        backgroundColor: isOver ? '#E3F4F4' : 'white',
        border: '1px solid grey',
        borderRadius: '10px',
        minHeight: '400px',
        height: 'auto'
      }}
    >
      <Typography variant="h6" align="center" sx={{ backgroundColor: '#B6E3F4', padding: '8px', borderRadius: '4px' }}>
        {status}
      </Typography>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onEdit={onEditTask}
          onView={onViewTask}
          onDelete={onDeleteTask}
        />
      ))}
    </Box>
  );
};

export default Column;
