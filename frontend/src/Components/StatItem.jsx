const StatItem = ({ count, label }) =>{
    
return ( <div className="px-4">
    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{count}</div>
    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</div>
  </div>

)}

export default StatItem;