const RadiantGradient = () => {
  return (
    <div
      className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square"
      aria-hidden="true">
      <div className="absolute inset-0 translate-z-0 bg-primary-500 rounded-full blur-[120px] opacity-30"></div>
      <div className="absolute w-64 h-64 translate-z-0 bg-primary-400 rounded-full blur-[80px] opacity-70"></div>
    </div>
  );
};

export default RadiantGradient;
