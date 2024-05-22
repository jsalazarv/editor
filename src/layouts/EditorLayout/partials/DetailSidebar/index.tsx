export const DetailSidebar = () => {
  return (
    <div>
      <div className="lg:sticky lg:top-16 bg-slate-50 dark:bg-slate-800/20 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 w-56 lg:w-[70] lg:h-[calc(100dvh-64px)]">
        <div className="py-8 px-4 flex flex-col h-full">
          <div>
            <h2 className="text-sm text-slate-800 dark:text-slate-100 font-medium mb-6">
              Detalles
            </h2>
            <div className="space-y-6"></div>
            <div className="space-y-2">
              <button className="btn-sm text-xs uppercase w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-primary-500 shadow-none">
                Descargar Original
              </button>
              <button className="btn-sm text-xs uppercase w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-primary-500 shadow-none">
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
