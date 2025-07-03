
import React from 'react';
import { Search, MapPin, DollarSign, Clock } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const BrowseJobsPage = ({
  userRole,
  currentScreen,
  setCurrentScreen,
  getFilteredJobs,
  getUserApplications,
  applyForJob,
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  jobTypeFilter,
  setJobTypeFilter,
  sortBy,
  setSortBy,
  locations,
  jobTypes,
  jobs
}) => {
  const filteredJobs = getFilteredJobs();

  return (
    <div className="flex">
      <Sidebar userRole={userRole} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      <div className="flex-1 p-8 bg-[#0B0C10] min-h-screen text-white pt-25">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#66FCF1] mb-4">Browse the Career You Want</h1>

          {/* Search & Filters */}
          <div className="bg-[#1F2833] p-6 rounded-xl shadow-md mb-6 border border-[#45A29E]">
            <div className="grid md:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="col-span-2 px-4 py-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
              />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="px-4 py-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
              >
                <option value="">All Job Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-[#0B0C10] border border-[#45A29E] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">By Title</option>
              </select>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-400">
                Showing {filteredJobs.length} of {jobs.filter(j => j.isActive).length} jobs
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                  setJobTypeFilter('');
                  setSortBy('newest');
                }}
                className="text-[#66FCF1] hover:text-[#45A29E] font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="bg-[#1F2833] rounded-xl shadow-md p-8 text-center border border-gray-700">
              <Search className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-300 mb-2">No jobs found</h2>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-[#1F2833] rounded-xl shadow-lg p-6 border border-[#45A29E] transition duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h2 className="text-xl font-bold text-white">{job.title}</h2>
                      <span className="bg-[#66FCF1] text-black px-2 py-1 rounded-full text-xs font-medium">New</span>
                    </div>
                    <p className="text-[#66FCF1] mb-3 font-medium">{job.company}</p>
                    <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">{job.salary || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{job.jobType}</span>
                      </div>
                    </div>

                    <div className="mb-4 text-gray-400 text-sm">
                      <p><strong>Requirements:</strong> {job.requirements || 'Not specified'}</p>
                      <p className="mt-2 text-xs">Posted: {job.postedDate}</p>
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    <button
                      onClick={() => applyForJob(job.id)}
                      disabled={getUserApplications().find(app => app.jobId === job.id)}
                      className={`px-6 py-2 rounded-lg font-semibold transition duration-200 ${
                        getUserApplications().find(app => app.jobId === job.id)
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-[#66FCF1] hover:bg-[#45A29E] text-black'
                      }`}
                    >
                      {getUserApplications().find(app => app.jobId === job.id) ? 'Applied' : 'Apply Now'}
                    </button>
                    <button className="px-6 py-2 border border-gray-500 rounded-lg text-white hover:bg-gray-700 transition duration-200">
                      Save Job
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseJobsPage;
