
import React, { useEffect } from 'react';
import { Plus, Briefcase, FileText, Eye, Clock, Edit2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const AdminDashboard = ({
  userRole,
  currentScreen,
  setCurrentScreen,
  jobs,
  applications,
  loadApplications
}) => {
  useEffect(() => {
    if (loadApplications) {
      loadApplications();
    }
  }, [loadApplications]);
  return (
    <div className="flex">
      <Sidebar userRole={userRole} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      <div className="flex-1 p-8 bg-[#0B0C10] min-h-screen text-white flex flex-col justify-between pt-25">
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#66FCF1]">Recruiter Dashboard</h1>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#1F2833] p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Total Jobs</p>
                  <p className="text-2xl font-bold text-blue-400">{jobs.length}</p>
                </div>
                <Briefcase className="h-10 w-10 text-blue-400" />
              </div>
            </div>
            <div className="bg-[#1F2833] p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Active Jobs</p>
                  <p className="text-2xl font-bold text-green-400">{jobs.filter(j => j.isActive).length}</p>
                </div>
                <Eye className="h-10 w-10 text-green-400" />
              </div>
            </div>
            <div className="bg-[#1F2833] p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Applications</p>
                  <p className="text-2xl font-bold text-purple-400">{applications.length}</p>
                </div>
                <FileText className="h-10 w-10 text-purple-400" />
              </div>
            </div>
            <div className="bg-[#1F2833] p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">Pending Reviews</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {applications.filter(app => app.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-10 w-10 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-[#1F2833] rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#66FCF1]">Recent Job Postings</h2>
              <div className="space-y-4">
                {jobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <div>
                      <h3 className="font-semibold text-white">{job.title}</h3>
                      <p className="text-gray-400 text-sm">{job.company} • {job.location}</p>
                      <p className="text-xs text-gray-500">Posted: {job.postedDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.isActive ? 'bg-green-800 text-green-300' : 'bg-red-800 text-red-300'
                      }`}>
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => setCurrentScreen('manageJobs')}
                        className="p-1 text-blue-400 hover:bg-blue-900 rounded"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1F2833] rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#66FCF1]">Recent Applications</h2>
              <div className="space-y-4">
                {applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <div>
                      <h3 className="font-semibold text-white">{app.userName || (app.userEmail?.split('@')[0]?.charAt(0)?.toUpperCase() + app.userEmail?.split('@')[0]?.slice(1)) || 'User'}</h3>
                      <p className="text-gray-400 text-sm">{app.jobTitle}</p>
                      <p className="text-xs text-gray-500">Applied: {app.appliedDate}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'pending' ? 'bg-yellow-800 text-yellow-300' :
                      app.status === 'reviewed' ? 'bg-blue-800 text-blue-300' :
                      'bg-red-800 text-red-300'
                    }`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setCurrentScreen('manageJobs')}
            className="bg-[#45A29E] hover:bg-[#66FCF1] text-black w-full max-w-md py-3 rounded-2xl text-lg font-semibold flex items-center justify-center space-x-2 shadow-md"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Job</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
