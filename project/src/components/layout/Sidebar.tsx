import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  PieChart, 
  Mail, 
  UserRound, 
  FileText,
  ShieldAlert, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    navigate('/login');
  };
  
  const navItems = [
    { path: '/', label: 'Tableau de bord', icon: <PieChart size={20} /> },
    { path: '/emails', label: 'Gestion des emails', icon: <Mail size={20} /> },
    { path: '/credentials', label: 'Identifiants capturés', icon: <UserRound size={20} /> },
    { path: '/templates', label: 'Modèles d\'hameçonnage', icon: <FileText size={20} /> },
  ];
  
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg z-30
          transition-all duration-300 ease-in-out
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 flex flex-col
        `}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="text-blue-600 dark:text-blue-500" />
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">MoPhish</h1>
          </div>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 text-sm
                    ${isActive(item.path) 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500 font-medium border-r-4 border-blue-600 dark:border-blue-500' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}
                    transition-colors duration-200
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Déconnexion
          </button>
        </div>
      </aside>
      
      <button 
        className="fixed bottom-4 right-4 z-10 lg:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
    </>
  );
};

export default Sidebar;