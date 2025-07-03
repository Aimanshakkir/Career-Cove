import React from 'react';
import { AlertCircle } from 'lucide-react';

const FormTextarea = React.memo(({ 
  label, 
  value, 
  onChange, 
  error, 
  required = false, 
  placeholder, 
  rows = 4, 
  maxLength 
}) => (
    <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 resize-vertical ${
        error 
          ? 'border-red-300 focus:ring-red-500 bg-red-50' 
          : 'border-gray-300 focus:ring-blue-500'
      }`}
    />
    <div className="flex justify-between items-center">
      <div>
        {error && (
          <div className="flex items-center space-x-1 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
      {maxLength && (
        <span className="text-xs text-gray-500">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  </div>
));

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;