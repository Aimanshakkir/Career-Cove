import React, { useState, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import FormInput from '../../components/FormInput';
import { validateSignupForm } from '../../utils/validation';

const RegisterPage = ({ handleSignup, setCurrentScreen, users }) => {
    const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user'
  });
  const [signupFormErrors, setSignupFormErrors] = useState({});
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);

  // Individual form handlers
  const handleSignupNameChange = useCallback((value) => {
    setSignupForm(prev => ({ ...prev, name: value }));
    setSignupFormErrors(prev => prev.name ? { ...prev, name: '' } : prev);
  }, []);

  const handleSignupEmailChange = useCallback((value) => {
    setSignupForm(prev => ({ ...prev, email: value }));
    setSignupFormErrors(prev => prev.email ? { ...prev, email: '' } : prev);
  }, []);

  const handleSignupPhoneChange = useCallback((value) => {
    setSignupForm(prev => ({ ...prev, phone: value }));
    setSignupFormErrors(prev => prev.phone ? { ...prev, phone: '' } : prev);
  }, []);

  const handleSignupPasswordChange = useCallback((value) => {
    setSignupForm(prev => ({ ...prev, password: value }));
    setSignupFormErrors(prev => prev.password ? { ...prev, password: '' } : prev);
  }, []);

  const handleSignupConfirmPasswordChange = useCallback((value) => {
    setSignupForm(prev => ({ ...prev, confirmPassword: value }));
    setSignupFormErrors(prev => prev.confirmPassword ? { ...prev, confirmPassword: '' } : prev);
  }, []);

  const handleRoleChange = useCallback((value) => {
    setSignupForm(prev => ({ ...prev, role: value }));
  }, []);

  const submitSignup = async () => {
    setIsSignupSubmitting(true);
    const errors = validateSignupForm(signupForm, users);
    setSignupFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSignupSubmitting(false);
      return;
    }

    try {
      await handleSignup(signupForm);
      alert('Account created successfully!');
      setSignupForm({ name: '', email: '', password: '', confirmPassword: '', phone: '', role: 'user' });
      setSignupFormErrors({});
    } catch (error) {
      setSignupFormErrors({ general: error.message || 'Signup failed. Please try again.' });
    } finally {
      setIsSignupSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-hero h-[400px] min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-85">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#66FCF1]">Create your account</h2>
          <p className="mt-2 text-[#45A29E]">Be the one of the the thousand job seekers !</p>
        </div>
        
        <div className="space-y-6">
          {signupFormErrors.general && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-700">{signupFormErrors.general}</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <FormInput
              label="Full Name"
              value={signupForm.name}
              onChange={handleSignupNameChange}
              error={signupFormErrors.name}
              placeholder="Enter your full name"
              required
              disabled={isSignupSubmitting}
            />
            
            <FormInput
              label="Email Address"
              type="email"
              value={signupForm.email}
              onChange={handleSignupEmailChange}
              error={signupFormErrors.email}
              placeholder="Enter your email"
              required
              disabled={isSignupSubmitting}
            />
            
            <FormInput
              label="Phone Number"
              type="tel"
              value={signupForm.phone}
              onChange={handleSignupPhoneChange}
              error={signupFormErrors.phone}
              placeholder="Enter your phone number (optional)"
              disabled={isSignupSubmitting}
            />
            
            <FormInput
              label="Password"
              type="password"
              value={signupForm.password}
              onChange={handleSignupPasswordChange}
              error={signupFormErrors.password}
              placeholder="Create a password"
              required
              disabled={isSignupSubmitting}
              showPasswordStrength={true}
            />
            
            <FormInput
              label="Confirm Password"
              type="password"
              value={signupForm.confirmPassword}
              onChange={handleSignupConfirmPasswordChange}
              error={signupFormErrors.confirmPassword}
              placeholder="Confirm your password"
              required
              disabled={isSignupSubmitting}
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Account Type <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 group">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={signupForm.role === 'user'}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    disabled={isSignupSubmitting}
                    className="text-[#7F5AF0] focus:ring-[#7F5AF0]" 
                  />
                  <div>
                    <div className="font-medium text-white group-hover:text-black">Job Seeker</div>
                    <div className="text-sm text-white group-hover:text-black">Browse and apply for jobs</div>
                  </div>
                </label>
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 group">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={signupForm.role === 'admin'}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    disabled={isSignupSubmitting}
                    className="text-[#FF6B6B] focus:ring-[#FF6B6B]"
                  />
                  <div>
                    <div className="font-medium text-white group-hover:text-black">Recruiter</div>
                    <div className="text-sm text-white group-hover:text-black">Post jobs and manage applications</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          <button
            onClick={submitSignup}
            disabled={isSignupSubmitting}
            className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
              isSignupSubmitting
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-[#7F5AF0] hover:bg-red-500 text-white'
            }`}
          >
            {isSignupSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>
          
          <div className="text-center pb-10">
            <p className="text-gray-500">
              Already have an account?{' '}
              <button 
                onClick={() => setCurrentScreen('login')}
                className="text-green-400 hover:text-red-800 font-semibold"
                disabled={isSignupSubmitting}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;