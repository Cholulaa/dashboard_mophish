import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import { Mail, UserCheck, TrendingUp, ShieldAlert } from 'lucide-react';
import { mockEmails, mockCredentials, mockStats } from '../utils/mockData';
import EmailTable from '../components/emails/EmailTable';

const Dashboard: React.FC = () => {
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert('Lien copié dans le presse-papiers !');
  };
  
  const recentClicks = mockEmails
    .filter(email => email.clicked)
    .sort((a, b) => {
      if (!a.clickedAt || !b.clickedAt) return 0;
      return new Date(b.clickedAt).getTime() - new Date(a.clickedAt).getTime();
    })
    .slice(0, 5);
  
  return (
    <Layout 
      title="Tableau de bord" 
      subtitle="Aperçu de votre campagne d'hameçonnage"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <Card 
          title="Total des emails" 
          value={mockStats.totalEmails.toString()} 
          icon={<Mail size={20} className="text-blue-500" />}
          colorClass="bg-blue-500"
        />
        
        <Card 
          title="Liens cliqués" 
          value={mockStats.totalClicks.toString()} 
          icon={<UserCheck size={20} className="text-red-500" />}
          colorClass="bg-red-500"
          change={{ value: 12, isPositive: true }}
        />
        
        <Card 
          title="Taux de clics" 
          value={`${mockStats.clickRate.toFixed(1)}%`} 
          icon={<TrendingUp size={20} className="text-green-500" />}
          colorClass="bg-green-500"
          change={{ value: 5.2, isPositive: true }}
        />
        
        <Card 
          title="Identifiants capturés" 
          value={mockStats.totalCredentialsCaptured.toString()} 
          icon={<ShieldAlert size={20} className="text-purple-500" />}
          colorClass="bg-purple-500"
          change={{ value: 8, isPositive: true }}
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Clics récents
        </h2>
        
        <EmailTable emails={recentClicks} onCopyLink={handleCopyLink} />
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Activité des clics
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p>Le graphique sera affiché ici</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            État de la campagne
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progression totale
                </span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  68%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Emails envoyés
                </span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  100%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Liens cliqués
                </span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  {Math.round(mockStats.clickRate)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${mockStats.clickRate}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Identifiants capturés
                </span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {Math.round((mockCredentials.length / mockEmails.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: `${(mockCredentials.length / mockEmails.length) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;