// App.jsx - Main Application Component
import React, { useState, useCallback, useEffect } from 'react';

// Import Components
import Navbar from './components/Navbar';

// Import Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Import User Pages
import UserDashboard from './pages/user/UserDashboard';
import BrowseJobsPage from './pages/user/BrowseJobsPage';
import AppliedJobsPage from './pages/user/AppliedJobsPage';

// Import Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageJobsPage from './pages/admin/ManageJobsPage';
import ViewApplicationsPage from './pages/admin/ViewApplicationsPage';




const JobPortalApp = () => {
  // Main app state
  const [currentScreen, setCurrentScreen] = useState('home');
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Sample data - In real app, this would come from API/database
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Digital Marketing Intern',
      description: 'Support the digital team in social media content, campaign execution, and reporting. Great learning opportunity for freshers interested in marketing.',
      requirements: 'SEO, Google Ads, Canva',
      location: 'Remote',
      salary: '₹10,000/month (Stipend)',
      jobType: 'Internship',
      company: 'SocialFlare Agency',
      postedDate: '2025-06-06',
      isActive: true
      
    },
    {
      id: 2,
      title: 'Backend Developer',
      description: 'Develop robust server-side applications and APIs. Design and implement scalable microservices architecture.',
      requirements: 'Node.js, Python, Database Management, MongoDB, Express.js',
      location: 'Thiruvananthapuram, Kerala',
      salary: '₹6,00,000 - ₹10,00,000',
      jobType: 'Full-time',
      company: 'DataCorp Ltd.',
      postedDate: '2025-06-07',
      isActive: true
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      description: 'Create intuitive and beautiful user experiences. Conduct user research and create design systems.',
      requirements: 'Figma, Adobe Creative Suite, User Research, Prototyping',
      location: 'Calicut, Kerala',
      salary: '₹4,00,000 - ₹7,00,000',
      jobType: 'Part-time',
      company: 'Design Studio Pro',
      postedDate: '2025-06-09',
      isActive: true
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      description: 'Work on both frontend and backend development. Build complete web applications from scratch.',
      requirements: 'React, Node.js, MongoDB, Express.js, TypeScript',
      location: 'Kochi, Kerala',
      salary: '₹7,00,000 - ₹12,00,000',
      jobType: 'Full-time',
      company: 'Innovation Labs',
      postedDate: '2025-06-06',
      isActive: true
    },
{
  id: 5,
      title: 'Backend Developer',
      description: 'Work on both frontend and backend development. Build complete web applications from scratch.',
      requirements: 'Node.js, MongoDB, REST APIs',
      location: 'Bengaluru, Karnataka',
      salary: '₹7,00,000 - ₹12,00,000',
      jobType: 'Full-time',
      company: 'DevCore Labs',
      postedDate: '2025-06-06',
      isActive: true


},

{
  id: 6,
      title: 'Data Analyst',
      description: 'Analyze and interpret data to support business decisions. Must be good with SQL and Excel. Experience with Python for analysis and Tableau for dashboards preferred.',
      requirements: 'Excel, SQL, Tableau, Python',
      location: 'Kochi, Kerala',
      salary: '₹5,50,000 - ₹7,00,000',
      jobType: 'Full-time',
      company: 'Insight Metrics Pvt. Ltd.',
      postedDate: '2025-06-06',
      isActive: true


},
{
  id: 7,
      title: 'Frontend Developer',
      description: 'Build amazing user interfaces with React and modern web technologies. Work with cross-functional teams to deliver high-quality products.',
      requirements: 'React, JavaScript, CSS, HTML, Git, REST APIs',
      location: 'Kochi, Kerala',
      salary: '₹5,00,000 - ₹8,00,000',
      jobType: 'Full-time',
      company: 'Tech Solutions Inc.',
      postedDate: '2025-06-08',
      isActive: true


},

  ]);

  const [users] = useState([
    { id: 1, name: 'Aiman', email: 'Aiman@example.com', phone: '+91 6282292784' },
    { id: 2, name: 'Ajsal', email: 'ajsal@example.com', phone: '+91 8075631859' },
    { id: 3, name: 'Ameen', email: 'Ameen@example.com', phone: '+91 9961665147' }
  ]);

  const [applications, setApplications] = useState([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Load applications from database
  const loadApplications = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('http://localhost:3000/applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const formattedApplications = data.map(app => ({
          id: app._id,
          jobId: app.jobId,
          userId: app.userId,
          jobTitle: app.jobTitle,
          userName: app.userName,
          userEmail: app.userEmail,
          appliedDate: new Date(app.appliedDate).toISOString().split('T')[0],
          status: app.status
        }));
        setApplications(formattedApplications);
      }
    } catch (error) {
      console.error('Failed to load applications:', error);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  // Authentication functions
  const handleLogin = useCallback(async (_, formData) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      console.log('Login response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      localStorage.setItem('token', data.token);
      const user = { email: formData.email, role: data.role, name: data.name, userId: data.userId };
      console.log('Setting currentUser to:', user);
      setUserRole(data.role);
      setIsLoggedIn(true);
      setCurrentUser(user);
      // Route based on actual user role from database, not login button clicked
      setCurrentScreen(data.role === 'admin' ? 'adminDashboard' : 'userDashboard');
      // Load applications after setting user
      setTimeout(() => loadApplications(), 100);
    } catch (error) {
      throw new Error(error.message);
    }
  }, [loadApplications]);

  const handleSignup = useCallback(async (formData) => {
    try {
      console.log('Signup attempt:', formData);
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role || 'user'
        })
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      
      setCurrentScreen('login');
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error.message);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setUserRole(null);
    setIsLoggedIn(false);
    setCurrentUser(null);
    setApplications([]);
    setCurrentScreen('home');
  }, []);

  // Job management functions
  const addJob = useCallback((jobData) => {
    const newJob = {
      id: Date.now(),
      ...jobData,
      postedDate: new Date().toISOString().split('T')[0],
      isActive: true
    };
    setJobs(prev => [newJob, ...prev]);
  }, []);

  const updateJob = useCallback((jobId, jobData) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, ...jobData } : job
    ));
  }, []);

  const deleteJob = useCallback((jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    setApplications(prev => prev.filter(app => app.jobId !== jobId));
  }, []);

  const toggleJobStatus = useCallback((jobId) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, isActive: !job.isActive } : job
    ));
  }, []);

  // Application management
  const applyForJob = useCallback(async (jobId) => {
    if (!currentUser) {
      alert('Please login to apply for jobs');
      return false;
    }

    const existingApplication = applications.find(
      app => app.jobId === jobId && app.userId === currentUser.userId
    );

    if (existingApplication) {
      alert('You have already applied for this job!');
      return false;
    }

    const job = jobs.find(j => j.id === jobId);
    const applicationData = {
      jobId: jobId,
      jobTitle: job.title,
      userName: currentUser.name,
      userEmail: currentUser.email
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(applicationData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      // Reload applications to get the actual database ID
      await loadApplications();
      alert('Successfully applied for the job!');
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  }, [currentUser, applications, jobs]);

  const updateApplicationStatus = useCallback(async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update application status');
      }

      // Update local state
      setApplications(prev => prev.map(app =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));
      alert(`Application status updated to ${newStatus}`);
    } catch (error) {
      alert('Failed to update application status. Please try again.');
    }
  }, []);

  // Filter and search functions
  const getFilteredJobs = useCallback(() => {
    let filtered = jobs.filter(job => job.isActive);

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (jobTypeFilter) {
      filtered = filtered.filter(job => job.jobType === jobTypeFilter);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [jobs, searchTerm, locationFilter, jobTypeFilter, sortBy]);

  const getUserApplications = useCallback(() => {
    if (!currentUser) return [];
    return applications.filter(app => app.userId === currentUser.userId);
  }, [currentUser, applications]);

  const locations = [...new Set(jobs.map(job => job.location))];
  const jobTypes = [...new Set(jobs.map(job => job.jobType))];

  // Screen rendering logic
  const renderCurrentScreen = () => {
    const commonProps = {
      currentScreen,
      setCurrentScreen,
      userRole,
      isLoggedIn,
      currentUser,
      jobs,
      applications,
      users,
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
      handleLogin,
      handleSignup,
      handleLogout,
      addJob,
      updateJob,
      deleteJob,
      toggleJobStatus,
      applyForJob,
      updateApplicationStatus,
      getFilteredJobs,
      getUserApplications,
      loadApplications
    };

    switch (currentScreen) {
      case 'home':
        return <HomePage {...commonProps} />;
      case 'login':
        return <LoginPage {...commonProps} />;
      case 'signup':
        return <RegisterPage {...commonProps} />;
      case 'userDashboard':
        return <UserDashboard {...commonProps} currentUser={currentUser} />;
      case 'browseJobs':
        return <BrowseJobsPage {...commonProps} />;
      case 'appliedJobs':
        return <AppliedJobsPage {...commonProps} />;
      case 'adminDashboard':
        return <AdminDashboard {...commonProps} />;
      case 'manageJobs':
        return <ManageJobsPage {...commonProps} />;
      case 'viewApplications':
        return <ViewApplicationsPage {...commonProps} />;
      default:
        return <HomePage {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
        setCurrentScreen={setCurrentScreen}
        
      />
      {renderCurrentScreen()}
      

    </div>
    
  );
};

export default JobPortalApp;