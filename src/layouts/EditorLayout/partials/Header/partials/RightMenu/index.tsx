import { DotsThree } from '@phosphor-icons/react';

export const RightMenu = () => {
  return (
    <>
      <div className="flex gap-4 items-center justify-center">
        <button className="hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-0.5">
          <DotsThree size={20} weight="bold" />
        </button>
      </div>
    </>
  );
};
