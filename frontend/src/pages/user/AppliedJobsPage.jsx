

import React from 'react';
import { FileText, MapPin, DollarSign, Clock } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const AppliedJobsPage = ({
  userRole,
  currentScreen,
  setCurrentScreen,
  getUserApplications,
  jobs
}) => {
  const userApplications = getUserApplications();

  return (
    <div className="flex">
      <Sidebar userRole={userRole} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      <div className="flex-1 p-8 bg-[#0B0C10] min-h-screen text-white pt-25">
        <h1 className="text-3xl font-bold text-[#66FCF1] mb-8">Jobs that you've Applied</h1>

        {userApplications.length === 0 ? (
          <div className="bg-[#1F2833] rounded-xl shadow-md p-8 text-center border border-gray-700">
            <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-300 mb-2">No Applications Yet</h2>
            <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
            <button
              onClick={() => setCurrentScreen('browseJobs')}
              className="bg-[#66FCF1] hover:bg-[#45A29E] text-black px-6 py-2 rounded-lg font-semibold"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {userApplications.map((app) => {
              const job = jobs.find(j => j.id === app.jobId);
              return (
                <div key={app.id} className="bg-[#1F2833] rounded-xl shadow-md p-6 border border-[#45A29E]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white mb-2">{app.jobTitle}</h2>
                      <p className="text-[#66FCF1] mb-2 font-medium">{job?.company}</p>
                      <p className="text-gray-300 mb-4">{job?.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{job?.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-sm">{job?.salary || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">Applied: {app.appliedDate}</span>
                        </div>
                      </div>

                      {job?.requirements && (
                        <p className="text-sm text-gray-400 mb-4">
                          <strong>Requirements:</strong> {job.requirements}
                        </p>
                      )}
                    </div>

                    <div className="ml-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                        ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-green-100 text-green-800'}`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobsPage;
