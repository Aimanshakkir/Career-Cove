// Validation utility functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const getPasswordStrength = (password) => {
  if (password.length === 0) return { strength: 0, text: '', color: '' };
  if (password.length < 6) return { strength: 1, text: 'Weak', color: 'text-red-600' };
  if (password.length < 8) return { strength: 2, text: 'Fair', color: 'text-yellow-600' };
  if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { strength: 4, text: 'Strong', color: 'text-green-600' };
  }
  return { strength: 3, text: 'Good', color: 'text-blue-600' };
};

// Job form validation
export const validateJobForm = (form) => {
  const errors = {};

  // Title validation
  if (!form.title.trim()) {
    errors.title = 'Job title is required';
  } else if (form.title.trim().length < 3) {
    errors.title = 'Job title must be at least 3 characters';
  } else if (form.title.trim().length > 100) {
    errors.title = 'Job title must be less than 100 characters';
  }

  // Company validation
  if (!form.company.trim()) {
    errors.company = 'Company name is required';
  } else if (form.company.trim().length < 2) {
    errors.company = 'Company name must be at least 2 characters';
  } else if (form.company.trim().length > 100) {
    errors.company = 'Company name must be less than 100 characters';
  }

  // Location validation
  if (!form.location.trim()) {
    errors.location = 'Location is required';
  } else if (form.location.trim().length < 2) {
    errors.location = 'Location must be at least 2 characters';
  }

  // Job type validation
  if (!form.jobType) {
    errors.jobType = 'Job type is required';
  }

  // Description validation
  if (!form.description.trim()) {
    errors.description = 'Job description is required';
  } else if (form.description.trim().length < 50) {
    errors.description = 'Description must be at least 50 characters';
  } else if (form.description.trim().length > 2000) {
    errors.description = 'Description must be less than 2000 characters';
  }

  // Requirements validation
  if (form.requirements.trim() && form.requirements.trim().length > 500) {
    errors.requirements = 'Requirements must be less than 500 characters';
  }

  // Salary validation (optional but if provided, should be valid)
  if (form.salary.trim() && form.salary.trim().length > 50) {
    errors.salary = 'Salary must be less than 50 characters';
  }

  return errors;
};

// Login form validation
export const validateLoginForm = (form) => {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(form.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

// Signup form validation
export const validateSignupForm = (form, existingUsers = []) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Full name is required';
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (form.name.trim().length > 50) {
    errors.name = 'Name must be less than 50 characters';
  } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
    errors.name = 'Name can only contain letters and spaces';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(form.email)) {
    errors.email = 'Please enter a valid email address';
  } else if (existingUsers.some(user => user.email.toLowerCase() === form.email.toLowerCase())) {
    errors.email = 'Email is already registered';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(form.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (form.phone.trim() && !validatePhone(form.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return errors;
};

// Additional utility functions
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

export const formatCurrency = (amount) => {
  if (!amount) return '';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays} days ago`;
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays <= 365) return `${Math.ceil(diffDays / 30)} months ago`;
  return `${Math.ceil(diffDays / 365)} years ago`;
};

export const generateJobSlug = (title, company) => {
  const slug = `${title}-${company}`
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return slug;
};

export const validateJobSlug = (slug) => {
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 100;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const capitalizeWords = (string) => {
  if (!string) return '';
  return string.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Search and filter utilities
export const searchJobs = (jobs, searchTerm) => {
  if (!searchTerm.trim()) return jobs;
  
  const term = searchTerm.toLowerCase();
  return jobs.filter(job =>
    job.title.toLowerCase().includes(term) ||
    job.company.toLowerCase().includes(term) ||
    job.description.toLowerCase().includes(term) ||
    job.location.toLowerCase().includes(term) ||
    (job.requirements && job.requirements.toLowerCase().includes(term))
  );
};

export const filterJobsByLocation = (jobs, location) => {
  if (!location) return jobs;
  return jobs.filter(job =>
    job.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const filterJobsByType = (jobs, jobType) => {
  if (!jobType) return jobs;
  return jobs.filter(job => job.jobType === jobType);
};

export const sortJobs = (jobs, sortBy) => {
  const sortedJobs = [...jobs];
  
  switch (sortBy) {
    case 'newest':
      return sortedJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    case 'oldest':
      return sortedJobs.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
    case 'title':
      return sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
    case 'company':
      return sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
    case 'location':
      return sortedJobs.sort((a, b) => a.location.localeCompare(b.location));
    default:
      return sortedJobs;
  }
};

// Application status utilities
export const getApplicationStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'reviewed':
      return 'bg-blue-100 text-blue-800';
    case 'accepted':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getApplicationStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending Review';
    case 'reviewed':
      return 'Under Review';
    case 'accepted':
      return 'Accepted';
    case 'rejected':
      return 'Rejected';
    default:
      return 'Unknown';
  }
};

// Form data utilities
export const createFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach(key => {
    if (object[key] !== null && object[key] !== undefined) {
      formData.append(key, object[key]);
    }
  });
  return formData;
};

export const parseFormData = (formData) => {
  const object = {};
  for (let [key, value] of formData.entries()) {
    object[key] = value;
  }
  return object;
};