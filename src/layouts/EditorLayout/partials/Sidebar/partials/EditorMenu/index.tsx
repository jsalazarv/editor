import { NavLink, useLocation } from 'react-router-dom';

export const EditorMenu = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <ul>
      <li
        className={`
            px-3 py-1 rounded-sm mb-0.5 last:mb-0 
            ${pathname.includes('messages') && 'bg-slate-900'}
        `}>
        <NavLink to="/designs/designs">
          <div className="flex items-center justify-between">
            <div className="grow flex items-center">
              <span className="text-sm font-medium ml-3">Diseños</span>
            </div>
          </div>
        </NavLink>
      </li>
      <li
        className={`
            px-3 py-1 rounded-sm mb-0.5 last:mb-0 
            ${pathname.includes('messages') && 'bg-slate-900'}
        `}>
        <NavLink to="/designs/materials">
          <div className="flex items-center justify-between">
            <div className="grow flex items-center">
              <span className="text-sm font-medium ml-3">Materiales</span>
            </div>
          </div>
        </NavLink>
      </li>

      <li
        className={`
            px-3 py-1 rounded-sm mb-0.5 last:mb-0 
            ${pathname.includes('messages') && 'bg-slate-900'}
        `}>
        <NavLink to="/designs/artwork">
          <div className="flex items-center justify-between">
            <div className="grow flex items-center">
              <span className="text-sm font-medium ml-3">Obra de arte</span>
            </div>
          </div>
        </NavLink>
      </li>
    </ul>
  );
};
