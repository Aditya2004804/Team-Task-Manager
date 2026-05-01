import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api';
import type { Project, Task } from '../types';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Check, ArrowLeft, Users } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    if (!projectId) return;
    try {
      const [projectRes, tasksRes] = await Promise.all([
        apiClient.getProject(projectId),
        apiClient.getTasks(projectId),
      ]);
      if (projectRes.success) {
        setProject(projectRes.data);
      }
      if (tasksRes.success) {
        setTasks(tasksRes.data);
      }
    } catch (err) {
      setError('Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = project?.admin === user?._id;

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;
    setIsSubmitting(true);

    try {
      const response = await apiClient.createTask(projectId, taskFormData);
      if (response.success) {
        setTasks([...tasks, response.data]);
        setTaskFormData({
          title: '',
          description: '',
          assignedTo: '',
          priority: 'medium',
          dueDate: '',
        });
        setShowTaskForm(false);
      }
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: string) => {
    if (!projectId) return;
    try {
      const response = await apiClient.updateTask(projectId, taskId, { status: newStatus });
      if (response.success) {
        setTasks(tasks.map((t) => (t._id === taskId ? { ...t, status: newStatus as any } : t)));
      }
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!projectId || !window.confirm('Delete this task?')) return;
    try {
      await apiClient.deleteTask(projectId, taskId);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-danger mb-4">Project not found</p>
        <button
          onClick={() => navigate('/projects')}
          className="text-primary hover:underline"
        >
          Back to projects
        </button>
      </div>
    );
  }

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/projects')}
          className="p-2 hover:bg-gray-100 rounded transition"
        >
          <ArrowLeft size={24} className="text-dark" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-dark">{project.name}</h1>
          <p className="text-gray-600 mt-1">{project.description}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={18} />
          <span>{project.members.length} members</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-danger text-danger px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Members Section (if admin) */}
      {isAdmin && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-dark mb-4">Team Members</h2>
          <div className="space-y-2">
            {project.members.map((member) => (
              <div key={member.userId} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-dark font-medium">{member.userId}</span>
                <span className="px-3 py-1 bg-primary text-white text-sm rounded capitalize">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Task Button */}
      {isAdmin && (
        <div className="mb-8">
          <button
            onClick={() => setShowTaskForm(!showTaskForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Plus size={20} />
            New Task
          </button>
        </div>
      )}

      {/* Create Task Form */}
      {showTaskForm && isAdmin && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-dark mb-4">Create New Task</h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                Task Title
              </label>
              <input
                type="text"
                value={taskFormData.title}
                onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                Description
              </label>
              <textarea
                value={taskFormData.description}
                onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter task description"
                rows={3}
              ></textarea>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Assign To
                </label>
                <select
                  value={taskFormData.assignedTo}
                  onChange={(e) => setTaskFormData({ ...taskFormData, assignedTo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select member</option>
                  {project.members.map((m) => (
                    <option key={m.userId} value={m.userId}>
                      {m.userId}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Priority
                </label>
                <select
                  value={taskFormData.priority}
                  onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={taskFormData.dueDate}
                  onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Task'}
              </button>
              <button
                type="button"
                onClick={() => setShowTaskForm(false)}
                className="px-6 py-2 border border-gray-300 text-dark rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* To Do */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-bold text-dark mb-4">To Do ({todoTasks.length})</h3>
          <div className="space-y-3">
            {todoTasks.map((task) => (
              <div key={task._id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-dark">{task.title}</h4>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-danger hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className={`px-2 py-1 rounded ${
                    task.priority === 'high' ? 'bg-red-100 text-danger' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-warning' :
                    'bg-green-100 text-success'
                  }`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => handleUpdateTaskStatus(task._id, 'in-progress')}
                    className="text-primary hover:underline"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-bold text-dark mb-4">In Progress ({inProgressTasks.length})</h3>
          <div className="space-y-3">
            {inProgressTasks.map((task) => (
              <div key={task._id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-dark">{task.title}</h4>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-danger hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded ${
                    task.priority === 'high' ? 'bg-red-100 text-danger' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-warning' :
                    'bg-green-100 text-success'
                  }`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => handleUpdateTaskStatus(task._id, 'completed')}
                    className="text-success hover:underline flex items-center gap-1"
                  >
                    <Check size={14} />
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="font-bold text-dark mb-4">Completed ({completedTasks.length})</h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div key={task._id} className="bg-white rounded-lg p-4 shadow-sm opacity-75">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-dark line-through">{task.title}</h4>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-danger hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                <span className="px-2 py-1 rounded bg-green-100 text-success text-xs inline-block">
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
