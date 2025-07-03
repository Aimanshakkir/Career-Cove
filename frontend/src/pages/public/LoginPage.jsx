import React, { useState, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import FormInput from '../../components/FormInput';
import { validateLoginForm } from '../../utils/validation';

const LoginPage = ({ handleLogin, setCurrentScreen }) => {
    const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [loginFormErrors, setLoginFormErrors] = useState({});
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

  // Individual form handlers
  const handleLoginEmailChange = useCallback((value) => {
    setLoginForm(prev => ({ ...prev, email: value }));
    setLoginFormErrors(prev => prev.email ? { ...prev, email: '' } : prev);
  }, []);

  const handleLoginPasswordChange = useCallback((value) => {
    setLoginForm(prev => ({ ...prev, password: value }));
    setLoginFormErrors(prev => prev.password ? { ...prev, password: '' } : prev);
  }, []);

  const submitLogin = async () => {
    setIsLoginSubmitting(true);
    const errors = validateLoginForm(loginForm);
    setLoginFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsLoginSubmitting(false);
      return;
    }

    try {
      await handleLogin(null, loginForm);
      setLoginForm({ email: '', password: '' });
      setLoginFormErrors({});
    } catch (error) {
      setLoginFormErrors({ general: error.message || 'Login failed. Please try again.' });
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-hero h-[400px] min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#66FCF1]">Sign in to your account</h2>
          <p className="mt-2 text-[#45A29E]">Choose your account type</p>
        </div>
        
        <div className="space-y-6">
          {loginFormErrors.general && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-700">{loginFormErrors.general}</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <FormInput
              label="Email Address"
              
              type="email"
              value={loginForm.email}
              onChange={handleLoginEmailChange}
              error={loginFormErrors.email}
              placeholder="Enter your email"
              
              required
              disabled={isLoginSubmitting}
            />
            
            <FormInput 
          
              label="Password"
              type="password"
              value={loginForm.password}
              onChange={handleLoginPasswordChange}
              error={loginFormErrors.password}
              placeholder="Enter your password"
              required
              disabled={isLoginSubmitting}
            />
          </div>
          
          <div className="space-y-3">
            <button
              onClick={submitLogin}
              disabled={isLoginSubmitting}
              className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                isLoginSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-[#7F5AF0] hover:bg-lime-500 text-white'
              }`}
            >
              {isLoginSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-[#45A29E]">
              Don't have an account?{' '}
              <button 
                onClick={() => setCurrentScreen('signup')}
                className="text-[#A3E635] hover:text-red-600 font-semibold"
                disabled={isLoginSubmitting}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;