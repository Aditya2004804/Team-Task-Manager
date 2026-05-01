const express = require('express');
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

const router = express.Router();

// Project routes
router.get('/', auth, projectController.getProjects);
router.get('/:id', auth, projectController.getProject);
router.post('/', auth, projectController.createProject);
router.put('/:id', auth, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);

// Member routes
router.post('/:id/members', auth, projectController.addProjectMember);
router.delete('/:id/members/:userId', auth, projectController.removeProjectMember);
router.put('/:id/members/:userId', auth, projectController.updateProjectMember);

module.exports = router;
