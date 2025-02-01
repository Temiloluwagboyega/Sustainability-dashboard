import React from 'react'
  import { Menu, Home, BarChart, Settings, Users, FileText, Menu as MenuIcon } from 'lucide-react';



  const Sidebar = ({ darkMode, isSidebarOpen, setIsSidebarOpen }) => {
    const navItems = [
      { icon: Home, label: 'Home', path: '/' },
      { icon: BarChart, label: 'Statistics', path: '/statistics', active: true },
      { icon: Users, label: 'Team', path: '/team' },
      { icon: FileText, label: 'Reports', path: '/reports' },
      { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
      <>
        <button 
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MenuIcon size={24} />
        </button>

        <div className={`
          fixed top-0 left-0 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform duration-300 ease-in-out
          w-64 min-h-screen
          ${darkMode ? 'bg-gray-800' : 'bg-white '}
          border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}
          pt-16 px-4 pb-4 lg:pt-4
          lg:static
          z-40
        `}>
          <div className="flex items-center gap-2 mb-8 p-2">
            <Menu className={darkMode ? 'text-white' : 'text-gray-800'} />
            <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>CalTech</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className={`
                  flex items-center gap-2 p-3 rounded-lg
                  ${item.active 
                    ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                    : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')}
                  transition-colors
                `}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </>
    );
  };


export default Sidebar