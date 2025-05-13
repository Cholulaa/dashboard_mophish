import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import TemplateCard from '../components/templates/TemplateCard';
import Button from '../components/ui/Button';
import { PhishingTemplate } from '../types';
import { mockTemplates } from '../utils/mockData';
import { Plus } from 'lucide-react';

const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<PhishingTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewTemplate = (template: PhishingTemplate) => {
    window.open(template.previewUrl, '_blank');
  };
  
  const handleEditTemplate = (template: PhishingTemplate) => {
    alert(`Modification du modèle : ${template.name}`);
  };
  
  const handleDeleteTemplate = (template: PhishingTemplate) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le modèle "${template.name}" ?`)) {
      setTemplates(templates.filter(t => t.id !== template.id));
    }
  };
  
  return (
    <Layout 
      title="Modèles d'hameçonnage" 
      subtitle="Gérez vos modèles d'emails d'hameçonnage"
    >
      <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Rechercher des modèles..."
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
        
        <Button 
          variant="primary" 
          icon={<Plus size={16} />}
        >
          Créer un modèle
        </Button>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onView={handleViewTemplate}
            onEdit={handleEditTemplate}
            onDelete={handleDeleteTemplate}
          />
        ))}
        
        {filteredTemplates.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Aucun modèle ne correspond à votre recherche.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TemplatesPage;