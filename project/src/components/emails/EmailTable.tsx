import React, { useState } from 'react';
import Table from '../ui/Table';
import { Email } from '../../types';
import { Check, Clock, Clipboard } from 'lucide-react';

interface EmailTableProps {
  emails: Email[];
  onCopyLink: (link: string) => void;
}

const EmailTable: React.FC<EmailTableProps> = ({ emails, onCopyLink }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEmails = emails.filter(email => 
    email.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.phishingLink.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const columns = [
    {
      header: 'Adresse email',
      accessor: 'address',
      sortable: true,
    },
    {
      header: 'Lien d\'hameçonnage',
      accessor: (row: Email) => (
        <div className="flex items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[240px]">
            {row.phishingLink}
          </span>
          <button
            className="ml-2 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
            onClick={(e) => {
              e.stopPropagation();
              onCopyLink(row.phishingLink);
            }}
          >
            <Clipboard size={16} />
          </button>
        </div>
      ),
    },
    {
      header: 'Statut',
      accessor: (row: Email) => (
        <div className="flex items-center">
          <span
            className={`
              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
              ${row.clicked
                ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
              }
            `}
          >
            {row.clicked ? (
              <>
                <Check size={14} className="mr-1" />
                Cliqué
              </>
            ) : (
              <>
                <Clock size={14} className="mr-1" />
                Non cliqué
              </>
            )}
          </span>
        </div>
      ),
    },
    {
      header: 'Date de clic',
      accessor: (row: Email) => (
        <div>
          {row.clickedAt ? (
            <span className="text-gray-600 dark:text-gray-400">
              {new Date(row.clickedAt).toLocaleString('fr-FR')}
            </span>
          ) : (
            <span className="text-gray-400 dark:text-gray-600">—</span>
          )}
        </div>
      ),
    },
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher des emails ou des liens..."
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
          data={filteredEmails}
          columns={columns}
          keyField="id"
        />
      </div>
    </div>
  );
};

export default EmailTable;