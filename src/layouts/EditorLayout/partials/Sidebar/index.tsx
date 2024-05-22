import { ArrowSquareLeft } from '@phosphor-icons/react';
import { EditorMenu } from './partials/EditorMenu';

interface SidebarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Sidebar = ({ onToggleSidebar, sidebarOpen }: SidebarProps) => {
  return (
    <aside
      id="sidebar"
      className={`w-56 shadow-sm border-r dark:border-r-0 bg-white dark:bg-slate-800 space-y-6 fixed inset-y-0 left-0 transform md:relative translate-x-0 transition-all duration-500 flex flex-col
        ${sidebarOpen && '-translate-x-1 w-[0.1px]'}
      `}>
      <div className="p-3 h-full flex flex-col">
        <div className="my-24 overflow-hidden flex-1">
          <div className="space-y-8">
            <EditorMenu />
          </div>
        </div>

        <div className="overflow-hidden flex justify-end">
          <div className="px-3 py-2">
            <button
              className={`xl:hidden hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-0.5`}
              onClick={onToggleSidebar}>
              <ArrowSquareLeft size={22} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
