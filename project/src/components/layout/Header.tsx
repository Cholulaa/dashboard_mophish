import React from 'react';
import { Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/login');
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 pt-6 border-b border-gray-200 dark:border-gray-800">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {subtitle && <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <button 
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <Button
          variant="ghost"
          size="sm"
          className="ml-2"
          icon={<LogOut size={16} />}
          onClick={handleLogout}
        >
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default Header;