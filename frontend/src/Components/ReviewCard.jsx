const ReviewCard = ({ initials, name, role, text, color }) => {
  const avatarColors = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"
  };

  return (
    <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 relative hover:shadow-lg transition-all duration-300">
      <span className="material-symbols-outlined absolute top-8 right-8 text-slate-100 dark:text-slate-700/50 text-6xl select-none -z-0">format_quote</span>
      <div className="relative z-10">
        <div className="flex items-center gap-1 text-amber-400 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="material-symbols-outlined text-lg fill-current">star</span>
          ))}
        </div>
        <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed italic">"{text}"</p>
        <div className="flex items-center gap-4">
          <div className={`size-12 rounded-full flex items-center justify-center font-bold text-lg ring-2 ring-white dark:ring-surface-dark ${avatarColors[color]}`}>
            {initials}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">{name}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;