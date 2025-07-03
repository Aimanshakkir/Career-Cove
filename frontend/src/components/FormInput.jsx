import { AlertCircle } from 'lucide-react';
import React from 'react';

const FormInput = React.memo(({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required = false, 
  placeholder, 
  disabled = false,
  showPasswordStrength = false,
  ...props 
}) => {
    const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 1, text: 'Weak', color: 'text-red-600' };
    if (password.length < 8) return { strength: 2, text: 'Fair', color: 'text-yellow-600' };
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 4, text: 'Strong', color: 'text-green-600' };
    }
    return { strength: 3, text: 'Good', color: 'text-blue-600' };
  };

  const passwordStrength = showPasswordStrength ? getPasswordStrength(value) : null;
  
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-[#C9D6DF]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 
          placeholder:text-gray-500
          text-[#66FCF1]
          ${
          error 
            ? 'border-red-300 focus:ring-red-500 bg-red-50' 
            : 'border-gray-300 focus:ring-blue-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        {...props}
      />
      {showPasswordStrength && value && (
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                passwordStrength.strength === 1 ? 'bg-red-500 w-1/4' :
                passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/4' :
                passwordStrength.strength === 3 ? 'bg-blue-500 w-3/4' :
                passwordStrength.strength === 4 ? 'bg-green-500 w-full' : 'w-0'
              }`}
            />
          </div>
          <span className={`text-xs font-medium ${passwordStrength.color}`}>
            {passwordStrength.text}
          </span>
        </div>
      )}
      {error && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

export default FormInput;