import React from 'react';
import { AlertCircle } from 'lucide-react';

const FormSelect = React.memo(({ 
  label, 
  value, 
  onChange, 
  options, 
  error, 
  required = false, 
  placeholder 
}) => (
    <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
        error 
          ? 'border-red-300 focus:ring-red-500 bg-red-50' 
          : 'border-gray-300 focus:ring-blue-500'
      }`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <div className="flex items-center space-x-1 text-red-600 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    )}
  </div>
));

FormSelect.displayName = 'FormSelect';

export default FormSelect;