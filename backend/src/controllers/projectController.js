const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get projects where user is a member or admin
    const projects = await Project.find({
      $or: [
        { admin: userId },
        { 'members.userId': userId },
      ],
    });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get projects',
      error: error.message,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check if user has access
    const isMember = project.members.some(m => m.userId === userId);
    const isAdmin = project.admin === userId;

    if (!isMember && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get project',
      error: error.message,
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Project name is required',
      });
    }

    const project = new Project({
      name,
      description,
      admin: userId,
      members: [{ userId, role: 'admin' }],
    });

    await project.save();

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check if user is admin
    if (project.admin !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Only admin can update project',
      });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.updatedAt = new Date();

    await project.save();

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check if user is admin
    if (project.admin !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Only admin can delete project',
      });
    }

    await Project.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Project deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message,
    });
  }
};

exports.addProjectMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body;
    const currentUserId = req.user.id;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check if current user is admin
    if (project.admin !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Only admin can add members',
      });
    }

    // Check if user already a member
    const isMember = project.members.some(m => m.userId === userId);
    if (isMember) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member',
      });
    }

    project.members.push({ userId, role: role || 'member' });
    await project.save();

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add member',
      error: error.message,
    });
  }
};

exports.removeProjectMember = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const currentUserId = req.user.id;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check if current user is admin
    if (project.admin !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Only admin can remove members',
      });
    }

    project.members = project.members.filter(m => m.userId !== userId);
    await project.save();

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove member',
      error: error.message,
    });
  }
};

exports.updateProjectMember = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { role } = req.body;
    const currentUserId = req.user.id;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check if current user is admin
    if (project.admin !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Only admin can update members',
      });
    }

    const member = project.members.find(m => m.userId === userId);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found',
      });
    }

    member.role = role;
    await project.save();

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update member',
      error: error.message,
    });
  }
};
