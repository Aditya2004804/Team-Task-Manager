const Task = require('../models/Task');
const Project = require('../models/Project');

exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    // Check project access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const isMember = project.members.some(m => m.userId === userId);
    if (!isMember && project.admin !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    const tasks = await Task.find({ projectId });

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get tasks',
      error: error.message,
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const userId = req.user.id;

    // Check project access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const isMember = project.members.some(m => m.userId === userId);
    if (!isMember && project.admin !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get task',
      error: error.message,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, assignedTo, priority, dueDate } = req.body;
    const userId = req.user.id;

    // Check project access and if user is admin
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (project.admin !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Only admin can create tasks',
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required',
      });
    }

    const task = new Task({
      title,
      description,
      projectId,
      assignedTo,
      priority: priority || 'medium',
      dueDate,
      createdBy: userId,
    });

    await task.save();

    // Add task to project
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
      error: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { title, description, status, assignedTo, priority, dueDate } = req.body;
    const userId = req.user.id;

    // Check project access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const isMember = project.members.some(m => m.userId === userId);
    const isAdmin = project.admin === userId;

    if (!isMember && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Check if task belongs to project
    if (task.projectId.toString() !== projectId) {
      return res.status(400).json({
        success: false,
        message: 'Task does not belong to this project',
      });
    }

    // Only admin can update title, description, assignedTo, and priority
    if (isAdmin) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.assignedTo = assignedTo || task.assignedTo;
      task.priority = priority || task.priority;
      task.dueDate = dueDate || task.dueDate;
    }

    // Members can update status
    if (status) {
      task.status = status;
    }

    task.updatedAt = new Date();
    await task.save();

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const userId = req.user.id;

    // Check project access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (project.admin !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Only admin can delete tasks',
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Check if task belongs to project
    if (task.projectId.toString() !== projectId) {
      return res.status(400).json({
        success: false,
        message: 'Task does not belong to this project',
      });
    }

    await Task.findByIdAndDelete(taskId);

    // Remove task from project
    project.tasks = project.tasks.filter(t => t.toString() !== taskId);
    await project.save();

    res.json({
      success: true,
      message: 'Task deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message,
    });
  }
};
