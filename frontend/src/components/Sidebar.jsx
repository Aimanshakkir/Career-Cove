

import React from 'react';
import { User, Search, FileText, Briefcase, Users } from 'lucide-react';

const Sidebar = ({ userRole, currentScreen, setCurrentScreen }) => {
  const userMenuItems = [
    { key: 'userDashboard', label: 'Dashboard', icon: User },
    { key: 'browseJobs', label: 'Browse Career', icon: Search },
    { key: 'appliedJobs', label: 'Applied Jobs', icon: FileText }
  ];

  const adminMenuItems = [
    { key: 'adminDashboard', label: 'Dashboard', icon: User },
    { key: 'manageJobs', label: 'Manage Jobs', icon: Briefcase },
    { key: 'viewApplications', label: 'Applications', icon: Users }
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  return (
    
    <aside className="bg-gradient-to-b from-[#0B0C10] via-[#1F2833] to-[#0B0C10] text-white pt-[100px] w-64 min-h-screen px-8 py-4 shadow-xl border-r border-[#45A29E]/10">
      
      <div className="space-y-4">
        {menuItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setCurrentScreen(key)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition duration-300 font-medium tracking-wide ${
              currentScreen === key
                ? 'bg-[#45A29E]/90 text-white shadow-md'
                : 'hover:bg-[#45A29E]/30 hover:text-[#66FCF1]'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
