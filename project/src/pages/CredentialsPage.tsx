import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import CredentialsTable from '../components/credentials/CredentialsTable';
import Button from '../components/ui/Button';
import { getCredentials } from '../utils/api';
import { Download, Trash } from 'lucide-react';
import { Credential } from '../types';

const CredentialsPage: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const data = await getCredentials();
      setCredentials(data);
    } catch (error) {
      console.error('Erreur lors du chargement des identifiants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Email', 'Nom d\'utilisateur', 'Date de capture'];
    const csvContent = [
      headers.join(','),
      ...credentials.map(cred => [
        cred.email,
        cred.username,
        new Date(cred.capturedAt).toLocaleString('fr-FR'),
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'identifiants_captures.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <Layout title="Identifiants capturés">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout 
      title="Identifiants capturés" 
      subtitle="Consultez les identifiants capturés lors de la campagne d'hameçonnage"
    >
      <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Identifiants capturés
        </h2>
        
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            icon={<Download size={16} />}
            onClick={handleExportCSV}
          >
            Exporter CSV
          </Button>
          
          <Button 
            variant="danger" 
            icon={<Trash size={16} />}
          >
            Effacer
          </Button>
        </div>
      </div>
      
      <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ce tableau affiche tous les identifiants capturés lors de votre campagne d'hameçonnage.
          </p>
        </div>
        
        <CredentialsTable credentials={credentials} />
      </div>
    </Layout>
  );
};

export default CredentialsPage;