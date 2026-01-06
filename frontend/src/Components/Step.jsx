const Step = ({ icon, number, title, desc }) => {
    return (
  <div className="flex flex-col items-center text-center group">
    <div className="w-16 h-16 bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative">
      <span className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white dark:border-surface-dark">{number}</span>
      <span className="material-symbols-outlined text-3xl text-primary">{icon}</span>
    </div>
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">{desc}</p>
  </div>
)};

export default Step;