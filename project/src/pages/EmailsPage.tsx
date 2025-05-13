import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import EmailTable from '../components/emails/EmailTable';
import ImportModal from '../components/emails/ImportModal';
import Button from '../components/ui/Button';
import { Download, Upload, Trash, Link } from 'lucide-react';
import { Email } from '../types';

const EmailsPage: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const data = await getEmails();
      setEmails(data);
    } catch (error) {
      console.error('Erreur lors du chargement des emails:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert('Lien copié dans le presse-papiers !');
  };
  
  const handleImportEmails = async (newEmails: string[]) => {
    try {
      const emailObjects = newEmails.map(email => ({ address: email }));
      await importEmails(emailObjects);
      await fetchEmails();
    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      alert('Erreur lors de l\'importation des emails');
    }
  };

  const handleGenerateLinks = async () => {
    try {
      setIsGenerating(true);
      await generateLinks();
      await fetchEmails();
    } catch (error) {
      console.error('Erreur lors de la génération des liens:', error);
      alert('Erreur lors de la génération des liens');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleExportCSV = () => {
    const headers = ['Adresse Email', 'Lien d\'hameçonnage', 'Cliqué', 'Date de clic'];
    const csvContent = [
      headers.join(','),
      ...emails.map(email => [
        email.address,
        email.phishingLink,
        email.clicked ? 'Oui' : 'Non',
        email.clickedAt || '',
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'campagne_hameconnage.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleClearTable = async () => {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les données des emails ? Cette action est irréversible.')) {
      try {
        await deleteAllEmails();
        setEmails([]);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression des emails');
      }
    }
  };
  
  const totalEmails = emails.length;
  const clickedEmails = emails.filter(email => email.clicked).length;
  const clickRate = totalEmails > 0 ? (clickedEmails / totalEmails) * 100 : 0;
  
  if (isLoading) {
    return (
      <Layout title="Gestion des emails">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Gestion des emails" 
      subtitle="Suivez et gérez les emails de votre campagne d'hameçonnage"
    >
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total des emails</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalEmails}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Liens cliqués</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{clickedEmails}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Taux de clics</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{clickRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Cibles des emails
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="primary" 
            icon={<Upload size={16} />}
            onClick={() => setIsImportModalOpen(true)}
          >
            Importer
          </Button>

          <Button
            variant="success"
            icon={<Link size={16} />}
            onClick={handleGenerateLinks}
            disabled={isGenerating || emails.length === 0}
          >
            {isGenerating ? 'Génération...' : 'Générer les liens'}
          </Button>
          
          <Button 
            variant="secondary" 
            icon={<Download size={16} />}
            onClick={handleExportCSV}
            disabled={emails.length === 0}
          >
            Exporter CSV
          </Button>
          
          <Button 
            variant="danger" 
            icon={<Trash size={16} />}
            onClick={handleClearTable}
            disabled={emails.length === 0}
          >
            Effacer
          </Button>
        </div>
      </div>
      
      <div className="mt-4">
        <EmailTable 
          emails={emails} 
          onCopyLink={handleCopyLink} 
        />
      </div>
      
      <ImportModal 
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportEmails}
      />
    </Layout>
  );
};

export default EmailsPage;
