const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

// router.get('/', auth, getTasks);
// router.post('/', auth, createTask);
// router.put('/tasks/:id', auth, updateTask);
// router.delete('/tasks/:id', auth, deleteTask);

module.exports = router;
