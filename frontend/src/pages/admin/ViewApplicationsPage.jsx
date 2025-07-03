import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const StatusBadge = ({ status }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    reviewed: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return (
    <span className={`px-4 py-1 rounded-full text-sm font-semibold text-center ${statusColors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ViewApplicationsPage = ({
  userRole,
  currentScreen,
  setCurrentScreen,
  applications,
  updateApplicationStatus,
  loadApplications
}) => {
  useEffect(() => {
    if (loadApplications) {
      loadApplications();
    }
  }, [loadApplications]);
  const [filterStatus, setFilterStatus] = useState('');

  const filteredApplications = filterStatus
    ? applications.filter(app => app.status === filterStatus)
    : applications;

  return (
    <div className="flex">
      <Sidebar userRole={userRole} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      <div className="flex-1 p-8 bg-[#0B0C10] text-white min-h-screen pt-25">
        <h1 className="text-3xl font-bold mb-8">Job Applications</h1>

        <div className="bg-[#1F2833] rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Applications</h2>
            <select
              className="px-4 py-2 border border-gray-600 bg-[#0B0C10] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="space-y-6">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No Applications Yet</h3>
                <p className="text-gray-400">Applications will appear here once job seekers start applying.</p>
              </div>
            ) : (
              filteredApplications.map((application) => (
                <div key={application.id} className="border border-gray-700 bg-[#0B0C10] rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        {application.jobTitle}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-400">Applicant Name</p>
                          <p className="font-medium text-white">{application.userName || (application.userEmail?.split('@')[0]?.charAt(0)?.toUpperCase() + application.userEmail?.split('@')[0]?.slice(1)) || 'User'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p className="font-medium text-white">{application.userEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Applied Date</p>
                          <p className="font-medium text-white">{application.appliedDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 flex flex-col space-y-2 items-end">
                      <StatusBadge status={application.status} />
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateApplicationStatus(application.id, 'reviewed')}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
                          >
                            Accept & Review
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicationsPage;
