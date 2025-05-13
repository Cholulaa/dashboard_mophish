import React, { useState } from 'react';
import Button from '../ui/Button';
import { Upload, X } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (emails: string[]) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };
  
  const processFile = (file: File) => {
    setFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split(/\r\n|\n/);
      
      const validEmails: string[] = [];
      const invalidEmails: string[] = [];
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      lines.forEach((line) => {
        const trimmedLine = line.trim();
        if (trimmedLine && emailRegex.test(trimmedLine)) {
          validEmails.push(trimmedLine);
        } else if (trimmedLine) {
          invalidEmails.push(trimmedLine);
        }
      });
      
      setEmails(validEmails);
      setErrors(invalidEmails);
    };
    
    reader.readAsText(file);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      processFile(droppedFile);
    }
  };
  
  const handleImport = () => {
    onImport(emails);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xl w-full mx-4 overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Importer des adresses email</h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center
              ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'}
              ${file ? 'bg-gray-50 dark:bg-gray-900/50' : ''}
              transition-colors duration-200
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Glissez et déposez votre fichier CSV ici, ou{' '}
                  <label className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer">
                    parcourez
                    <input
                      type="file"
                      className="hidden"
                      accept=".csv,.txt"
                      onChange={handleFileChange}
                    />
                  </label>
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  Le fichier doit contenir une adresse email par ligne
                </p>
              </>
            ) : (
              <>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Fichier :</strong> {file.name}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <strong>Emails valides :</strong> {emails.length}
                </div>
                {errors.length > 0 && (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                    <strong>Entrées invalides :</strong> {errors.length}
                  </div>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-3"
                  onClick={() => {
                    setFile(null);
                    setEmails([]);
                    setErrors([]);
                  }}
                >
                  Réinitialiser
                </Button>
              </>
            )}
          </div>
          
          {errors.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Entrées invalides :</h3>
              <div className="mt-2 max-h-32 overflow-y-auto text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700">
                {errors.map((error, index) => (
                  <div key={index} className="py-1">{error}</div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="ghost" onClick={onClose}>
              Annuler
            </Button>
            <Button
              variant="primary"
              disabled={emails.length === 0}
              onClick={handleImport}
            >
              Importer {emails.length} emails
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;