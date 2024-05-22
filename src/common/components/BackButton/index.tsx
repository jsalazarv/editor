import { useNavigate } from 'react-router-dom';
import { CaretLeft } from '@phosphor-icons/react';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <button
      className="hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-0.5"
      onClick={handleClick}>
      <CaretLeft size={20} weight="bold" />
    </button>
  );
};
