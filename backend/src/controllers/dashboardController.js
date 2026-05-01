const Project = require('../models/Project');
const Task = require('../models/Task');

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all projects for this user
    const projects = await Project.find({
      $or: [
        { admin: userId },
        { 'members.userId': userId },
      ],
    });

    const projectIds = projects.map(p => p._id);

    // Get all tasks for these projects
    const allTasks = await Task.find({ projectId: { $in: projectIds } });
    
    // Get all tasks assigned to this user
    const userTasks = await Task.find({ 
      projectId: { $in: projectIds },
      assignedTo: userId 
    });

    // Calculate stats
    const totalProjects = projects.length;
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(t => t.status === 'completed').length;
    const overdueTasks = allTasks.filter(t => {
      return t.status !== 'completed' && t.dueDate && new Date(t.dueDate) < new Date();
    }).length;

    // Get recent projects
    const recentProjects = projects.slice(0, 5);

    // Get recent tasks
    const recentTasks = allTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    res.json({
      success: true,
      data: {
        totalProjects,
        totalTasks,
        completedTasks,
        overdueTasks,
        recentProjects,
        recentTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get stats',
      error: error.message,
    });
  }
};
