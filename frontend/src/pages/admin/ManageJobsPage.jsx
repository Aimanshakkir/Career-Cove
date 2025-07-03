import React, { useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, Eye, X, AlertCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import FormTextarea from '../../components/FormTextarea';
import { validateJobForm } from '../../utils/validation';

const ManageJobsPage = ({ userRole, currentScreen, setCurrentScreen, jobs, addJob, updateJob, deleteJob, toggleJobStatus }) => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '', company: '', location: '', salary: '', jobType: '', requirements: '', description: ''
  });
  const [jobFormErrors, setJobFormErrors] = useState({});
  const [isJobFormSubmitting, setIsJobFormSubmitting] = useState(false);

  const handleChange = useCallback((field, value) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
    setJobFormErrors(prev => prev[field] ? { ...prev, [field]: '' } : prev);
  }, []);

  const resetJobForm = () => {
    setEditingJob(null);
    setJobForm({ title: '', company: '', location: '', salary: '', jobType: '', requirements: '', description: '' });
    setJobFormErrors({});
    setShowJobForm(false);
  };

  const editJobHandler = (job) => {
    setEditingJob(job);
    setJobForm(job);
    setJobFormErrors({});
    setShowJobForm(true);
  };

  const submitJobForm = async () => {
    setIsJobFormSubmitting(true);
    const errors = validateJobForm(jobForm);
    setJobFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setIsJobFormSubmitting(false);
      return;
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      editingJob ? updateJob(editingJob.id, jobForm) : addJob(jobForm);
      alert(editingJob ? 'Job updated successfully!' : 'Job added successfully!');
      resetJobForm();
    } catch {
      setJobFormErrors({ general: 'Failed to save job. Please try again.' });
    } finally {
      setIsJobFormSubmitting(false);
    }
  };

  const JobFormModal = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1F2833] text-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#66FCF1]">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
          <button onClick={resetJobForm} className="hover:text-red-400">
            <X className="h-6 w-6" />
          </button>
        </div>

        {jobFormErrors.general && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-xl text-red-800">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>{jobFormErrors.general}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormInput label="Job Title" value={jobForm.title} onChange={(val) => handleChange('title', val)} error={jobFormErrors.title} placeholder="e.g. Frontend Developer" required dark />
          <FormInput label="Company Name" value={jobForm.company} onChange={(val) => handleChange('company', val)} error={jobFormErrors.company} placeholder="e.g. Tech Solutions Inc." required dark />
          <FormInput label="Location" value={jobForm.location} onChange={(val) => handleChange('location', val)} error={jobFormErrors.location} placeholder="e.g. Kochi, Kerala" required dark />
          <FormInput label="Salary Range" value={jobForm.salary} onChange={(val) => handleChange('salary', val)} error={jobFormErrors.salary} placeholder="e.g. ₹5,00,000 - ₹8,00,000" dark />
          <FormSelect label="Job Type" value={jobForm.jobType} onChange={(val) => handleChange('jobType', val)} error={jobFormErrors.jobType} placeholder="Select Job Type" options={[{ value: 'Full-time', label: 'Full-time' }, { value: 'Part-time', label: 'Part-time' }, { value: 'Contract', label: 'Contract' }, { value: 'Internship', label: 'Internship' }]} required dark />
          <FormInput label="Requirements" value={jobForm.requirements} onChange={(val) => handleChange('requirements', val)} error={jobFormErrors.requirements} placeholder="e.g. React, JavaScript, CSS" maxLength={500} dark />
        </div>

        <div className="mb-6">
          <FormTextarea label="Job Description" value={jobForm.description} onChange={(val) => handleChange('description', val)} error={jobFormErrors.description} placeholder="Detailed job description..." rows={6} maxLength={2000} required dark />
        </div>

        <div className="flex space-x-4">
          <button onClick={submitJobForm} disabled={isJobFormSubmitting} className={`px-6 py-3 rounded-xl font-semibold transition duration-200 ${isJobFormSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#45A29E] hover:bg-[#66FCF1] text-black'}`}>
            {isJobFormSubmitting ? <div className="flex items-center space-x-2"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div><span>{editingJob ? 'Updating...' : 'Adding...'}</span></div> : editingJob ? 'Update Job' : 'Add Job'}
          </button>
          <button onClick={resetJobForm} disabled={isJobFormSubmitting} className="bg-[#0B0C10] border border-gray-600 hover:bg-[#1F2833] text-white px-6 py-3 rounded-xl">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-[#0B0C10] text-white min-h-screen">
      <Sidebar userRole={userRole} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      <div className="flex-1 p-8 pb-24 pt-25">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#66FCF1]">Manage Jobs</h1>
        </div>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-[#1F2833] rounded-xl shadow-xl p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.isActive ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>{job.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                  <p className="text-[#66FCF1] font-medium mb-2">{job.company}</p>
                  <p className="text-gray-300 mb-4">{job.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-gray-400 mb-3">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary || 'Not specified'}</span>
                    <span>⏰ {job.jobType}</span>
                    <span>🗓️ Posted: {job.postedDate}</span>
                  </div>
                  <p className="text-sm text-gray-400"><strong>Requirements:</strong> {job.requirements || 'Not specified'}</p>
                </div>
                <div className="ml-6 flex flex-col space-y-2">
                  <button onClick={() => editJobHandler(job)} className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-xl flex items-center space-x-1">
                    <Edit2 className="h-4 w-4" /> <span>Edit</span>
                  </button>
                  <button onClick={() => toggleJobStatus(job.id)} className={`px-4 py-2 rounded-xl flex items-center space-x-1 ${job.isActive ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'bg-green-500 text-black hover:bg-green-600'}`}>
                    <Eye className="h-4 w-4" /> <span>{job.isActive ? 'Deactivate' : 'Activate'}</span>
                  </button>
                  <button onClick={() => window.confirm('Are you sure you want to delete this job?') && deleteJob(job.id)} className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-xl flex items-center space-x-1">
                    <Trash2 className="h-4 w-4" /> <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showJobForm && <JobFormModal />}
      <button
        onClick={() => setShowJobForm(true)}
        className="fixed bottom-6 z-40 w-[90%] max-w-md mx-auto left-0 right-0 bg-[#45A29E] hover:bg-[#66FCF1] text-black font-semibold py-3 px-6 rounded-2xl shadow-lg flex items-center justify-center space-x-2"
      >
        <Plus className="h-5 w-5" />
        <span>Add New Job</span>
      </button>
    </div>
  );
};

export default ManageJobsPage;
