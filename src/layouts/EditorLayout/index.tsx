import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { EditorProvider } from '@common/providers/EditorProvider';

import { Header } from './partials/Header';
import { Sidebar } from './partials/Sidebar';

// import { DetailSidebar } from './partials/DetailSidebar';

export const EditorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <EditorProvider>
      <div className="relative min-h-screen md:flex" data-dev-hint="container">
        <Header onToggleSidebar={handleToggleSidebar} />

        <Sidebar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={handleToggleSidebar}
        />
        <main id="content" className="flex-1 py-24 lg:px-8">
          <div className="max-w-7xl mx-auto h-full">
            <div className="px-4 py-6 sm:px-0 h-full">
              <div className="rounded-lg h-full">
                <div className="h-full flex justify-center items-center">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* <DetailSidebar /> */}
      </div>
    </EditorProvider>
  );
};
