const FeatureCard = ({ icon, title, desc, iconBg, iconColor }) => {
    return (
  <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
    <div className={`size-12 ${iconBg} ${iconColor} rounded-2xl flex items-center justify-center mb-6`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
  </div>
)
};

export default FeatureCard;
