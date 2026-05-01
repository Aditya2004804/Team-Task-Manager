const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Task routes
router.get('/', auth, taskController.getTasks);
router.get('/:taskId', auth, taskController.getTask);
router.post('/', auth, taskController.createTask);
router.put('/:taskId', auth, taskController.updateTask);
router.delete('/:taskId', auth, taskController.deleteTask);

module.exports = router;
