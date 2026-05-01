import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../services/api';
import { CheckCircle, AlertCircle, Clock, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  recentProjects: any[];
  recentTasks: any[];
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.getDashboardStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (err) {
        setError('Failed to load dashboard stats');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here&apos;s your task management overview</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-danger text-danger px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Projects */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Projects</p>
              <p className="text-3xl font-bold text-dark mt-2">{stats?.totalProjects || 0}</p>
            </div>
            <TrendingUp className="text-primary" size={32} />
          </div>
        </div>

        {/* Total Tasks */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-dark mt-2">{stats?.totalTasks || 0}</p>
            </div>
            <Clock className="text-secondary" size={32} />
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed Tasks</p>
              <p className="text-3xl font-bold text-dark mt-2">{stats?.completedTasks || 0}</p>
            </div>
            <CheckCircle className="text-success" size={32} />
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-danger">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Overdue Tasks</p>
              <p className="text-3xl font-bold text-dark mt-2">{stats?.overdueTasks || 0}</p>
            </div>
            <AlertCircle className="text-danger" size={32} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-dark mb-4">Recent Projects</h2>
          {stats?.recentProjects && stats.recentProjects.length > 0 ? (
            <ul className="space-y-3">
              {stats.recentProjects.map((project: any) => (
                <li key={project._id}>
                  <Link
                    to={`/projects/${project._id}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {project.name}
                  </Link>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No projects yet</p>
          )}
          <Link to="/projects" className="text-primary font-medium mt-4 inline-block">
            View all projects →
          </Link>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-dark mb-4">Recent Tasks</h2>
          {stats?.recentTasks && stats.recentTasks.length > 0 ? (
            <ul className="space-y-3">
              {stats.recentTasks.map((task: any) => (
                <li key={task._id} className="flex items-start gap-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    task.status === 'completed' ? 'bg-green-100 text-success' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-primary' :
                    'bg-gray-100 text-dark'
                  }`}>
                    {task.status}
                  </span>
                  <div>
                    <p className="font-medium text-dark">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.projectId}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No tasks yet</p>
          )}
        </div>
      </div>
    </div>
  );
};
