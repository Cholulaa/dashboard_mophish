import React from 'react';
import { PhishingTemplate } from '../../types';
import { Eye, Edit, Trash } from 'lucide-react';
import Button from '../ui/Button';

interface TemplateCardProps {
  template: PhishingTemplate;
  onView: (template: PhishingTemplate) => void;
  onEdit: (template: PhishingTemplate) => void;
  onDelete: (template: PhishingTemplate) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  onView, 
  onEdit,
  onDelete 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{template.name}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(template.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {template.description}
        </p>
        
        <div className="mt-6 flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash size={16} />}
            onClick={() => onDelete(template)}
          >
            Supprimer
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            icon={<Edit size={16} />}
            onClick={() => onEdit(template)}
          >
            Modifier
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            icon={<Eye size={16} />}
            onClick={() => onView(template)}
          >
            Voir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;