import { BackButton } from '@common/components/BackButton';
import { EditorToolsMenu } from './partials/EditorToolsMenu';
import { RightMenu } from './partials/RightMenu';
import { List } from '@phosphor-icons/react';
import ThemeToggle from '@common/components/ThemeToggle';

interface IHeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: IHeaderProps) => {
  return (
    <header className="px-5 h-16 w-full fixed bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <nav className="h-full flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <BackButton />
          <button
            onClick={onToggleSidebar}
            className="xl:hidden hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-0.5">
            <List size={20} weight="bold" />
          </button>
        </div>
        <EditorToolsMenu />
        <div className="flex items-center space-x-3">
          <RightMenu />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
