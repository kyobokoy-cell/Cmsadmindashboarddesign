import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PageContentManagement } from './components/PageContentManagement';
import { WebsiteMonitoring } from './components/WebsiteMonitoring';
import { NewsManagement } from './components/NewsManagement';
import { InformationManagement } from './components/InformationManagement';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'pages':
        return <PageContentManagement />;
      case 'monitoring':
        return <WebsiteMonitoring />;
      case 'news':
        return <NewsManagement />;
      case 'information':
        return <InformationManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 ml-64">
        {renderPage()}
      </main>
    </div>
  );
}