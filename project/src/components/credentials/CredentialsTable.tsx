import React, { useState } from 'react';
import Table from '../ui/Table';
import { Credential } from '../../types';
import { Mail, User, Calendar } from 'lucide-react';

interface CredentialsTableProps {
  credentials: Credential[];
}

const CredentialsTable: React.FC<CredentialsTableProps> = ({ credentials }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCredentials = credentials.filter(cred => 
    cred.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cred.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const columns = [
    {
      header: 'Email',
      accessor: 'email',
      cell: (value: string) => (
        <div className="flex items-center">
          <Mail size={16} className="mr-2 text-gray-400" />
          <span>{value}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Nom d\'utilisateur',
      accessor: 'username',
      cell: (value: string) => (
        <div className="flex items-center">
          <User size={16} className="mr-2 text-gray-400" />
          <span>{value}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Date de capture',
      accessor: 'capturedAt',
      cell: (value: string) => (
        <div className="flex items-center">
          <Calendar size={16} className="mr-2 text-gray-400" />
          <span>{new Date(value).toLocaleString('fr-FR')}</span>
        </div>
      ),
      sortable: true,
    },
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher par email ou nom d'utilisateur..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <Table
          data={filteredCredentials}
          columns={columns}
          keyField="id"
        />
      </div>
    </div>
  );
};

export default CredentialsTable;