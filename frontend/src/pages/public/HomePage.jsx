
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const particlesInit = async (main) => {
  await loadFull(main); // loads tsparticles features
};


import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const AnimatedCounter = ({ from = 0, to }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const duration = 1000;
    const increment = (to - from) / (duration / 16);
    const interval = setInterval(() => {
      start += increment;
      if (start >= to) {
        start = to;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(interval);
  }, [from, to]);

  return <div className="text-3xl font-bold text-[#66FCF1]">{count}+</div>;
};

const HomePage = ({ 
  jobs, 
  applications, 
  users, 
  setCurrentScreen, 
  searchTerm, 
  setSearchTerm, 
  locationFilter, 
  setLocationFilter, 
  locations 
}) => {
  const companies = [
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      name: 'Google',
      count: 340
    },
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
      name: 'Netflix',
      count: 127
    },
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      name: 'Amazon',
      count: 85
    }
  ];

  return (
    
    <div className="bg-hero h-[400px] min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="font-mono font-bold text-6xl text-[#66FCF1] mb-6">Get free. Get hired</h1>
        <p className="font-mono text-xl text-[#45A29E] mb-12 max-w-2xl mx-auto">
          Looking for the right job? Let top employers find you — with roles that suit your skills and dreams
        </p>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-[#1F2833] p-6 rounded-xl shadow-lg">
            <div className="flex md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search jobs, companies, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-600 rounded-lg bg-[#0B0C10] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
              />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3 border border-gray-600 rounded-lg bg-[#0B0C10] text-white focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <button
                onClick={() => setCurrentScreen('browseJobs')}
                className="bg-[#66FCF1] hover:bg-[#45A29E] text-black px-8 py-3 rounded-lg flex items-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Search Jobs</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mb-16">
          <button 
            onClick={() => setCurrentScreen('signup')}
            className="bg-[#66FCF1] hover:bg-[#45A29E] text-black px-8 py-4 rounded-lg text-lg font-semibold transition duration-200 shadow-lg"
          >
            Get Started
          </button>
          <button 
            onClick={() => setCurrentScreen('login')}
            className="bg-[#0B0C10] hover:bg-[#1F2833] text-[#66FCF1] px-8 py-4 rounded-lg text-lg font-semibold border-2 border-[#66FCF1] transition duration-200 shadow-lg"
          >
            Login
          </button>
        </div>

        {/* Company Recruiter Stats */}
        <div className="grid md:grid-cols-3 gap-10">
          {companies.map(({ logo, name, count }) => (
            <div className="bg-[#1F2833] p-8 rounded-xl shadow-lg text-center" key={name}>
              <img src={logo} alt={`${name} logo`} className="h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{name}</h3>
              <AnimatedCounter to={count} />
              <p className="text-gray-400 text-sm">recruiters active this week</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

