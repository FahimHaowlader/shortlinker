import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccess, setShowSuccess] = useState(true); // Set to false by default in production

  // Mock Data for the Links Table
  const [links] = useState([
    {
      id: 1,
      title: "Design System 2.0 - Final Review",
      originalUrl: "https://figma.com/file/LKj8923...",
      shortUrl: "shrt.url/ds-v2",
      clicks: "1,234",
      trend: "+12%",
      date: "Oct 24, 2023",
      icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhzXl3FGaDSAfJk8nXw5V0f3dGUu3YGMxAPQ-yPS4WTARfpJUB-CcB831zrl6eFZacoaCxVr2ltA3YnQbJqrDAJoKqpCta-YSTnNrfyKLy_gxcI7VM_IBl9jV0kPAQ3k4M4QJCu0i-6Pmo-RBQYiPLMJCpaY4ePDMm9ohER8-5mgWca8PlUK3-zZsRDmo31Omh3ejysUWykNKgEKGboFUQOS7lRrUU1FiRogU3LXGWvpkAdO1_1SFTcniR3ZIC1YIr9It3acYWEA"
    },
    {
      id: 2,
      title: "Product Demo Video",
      originalUrl: "https://youtube.com/watch?v=...",
      shortUrl: "shrt.url/demo-vid",
      clicks: "856",
      trend: null,
      date: "Oct 22, 2023",
      icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq769c2-r3KVlrl6gCK5L8hP7C1u89gde5cbzfQNkAT19y8mXAMzuHo2cjfAia4sUpgqqZs0Z44O_uAfX9OUHx0xNV7M57hWZS2OZbUFU2gsBbPsGh9h-prYWhz1fCEW92eMeegVNiMv86OH1OlvY58DA-P9Ih5kCkTRMz4PgjTtIOC7sh1-XAU5Y85W_pSxV_BfCseA72_PFMwxqlAcnUbPEhD7b1J8RZF0nBalB0MB7kagIJzdP7GIHv9wbUoRlEBEn7RK1BrQ"
    },
    {
      id: 3,
      title: "Understanding Modern UI Trends",
      originalUrl: "https://medium.com/@user/ui-trends...",
      shortUrl: "shrt.url/ui-trends",
      clicks: "42",
      trend: null,
      date: "Oct 20, 2023",
      icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5ptHoxM6CRxYL8o3iNtAssuVtWpWZuw3XoU64LvaEfZMCuqkqjsG1d4-3zMg41RVA4btNI_ofzNhSqtaHCN04_RlaSDKJhKJZ1263rSrPCXTCiQPrzLyLFEeqvah2gcoxBMR0Quz8Ny8tIhFM-hDNfWxHTzoVGPO9SY9gLv9q-UlCIhGVCBBLyYyFcB-AJngVyNIiuLEHfaGfyW6tjIdhBvB_LCXQ3v507eCjuTujjsRD4ZY9HQi0iN_R8YmV8kEdqsWsioyqIQ"
    }
  ]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display antialiased min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="size-8 text-primary flex items-center justify-center bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-2xl">link</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">ShortURL</h2>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
              <a className="text-slate-900 dark:text-white transition-colors" href="#">Dashboard</a>
              <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#">Analytics</a>
              <a className="hover:text-slate-900 dark:hover:text-white transition-colors" href="#">Settings</a>
            </nav>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-700">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-slate-100 dark:ring-slate-700 cursor-pointer" 
                style={{ backgroundImage: `url(${user?.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuChHIWtw-d_qGMDO7r6akX77_dtXTwle_wqqB0ptGkpwPSdbE_XG4mfekjMPT2Y9dOqFk5LuItBK-5wdlU2h0UArPt4GT0_Nu5IKtBrqhVuS3IqKLvdTPFnH9RtAqiP3j4qjgaD1NXJJA1wiW1n5eCIs8fg0MLNkLJ_JRzAtt6d3R54Eo8xPqjYfAqmCgJl7jNoOUX3m1aCwSWkf9OGOtCCLEmLSWKlhK8NkU5U1dsqacG6diZW-22pVcpYy8ZaV2YARyWtseF58g'})` }}
              ></div>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-10">
            
            {/* --- DASHBOARD TITLE & USAGE --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your links and track performance.</p>
              </div>
              <div className="flex items-center gap-4 bg-white dark:bg-surface-dark px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Plan Usage</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">45 <span className="text-slate-400 font-normal">/ 100 links</span></span>
                </div>
                <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "45%" }}></div>
                </div>
                <button className="ml-2 text-xs font-medium text-primary hover:text-primary-dark whitespace-nowrap">Upgrade</button>
              </div>
            </div>

            {/* --- INPUT SECTION --- */}
            <section className="flex flex-col gap-6">
              <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-soft p-1 border border-slate-100 dark:border-slate-700/50">
                <div className="relative flex items-center">
                  <div className="absolute left-6 text-slate-400">
                    <span className="material-symbols-outlined text-2xl">add_link</span>
                  </div>
                  <input 
                    className="w-full pl-16 pr-40 py-5 bg-transparent border-none rounded-xl text-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 focus:outline-none" 
                    placeholder="Paste a long URL here to shorten it..." 
                    type="url"
                  />
                  <div className="absolute right-2 top-2 bottom-2">
                    <button className="h-full bg-primary hover:bg-primary-dark text-white px-8 rounded-lg font-medium shadow-md shadow-primary/20 transition-all flex items-center gap-2">
                      <span>Shorten</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Success Alert */}
              {showSuccess && (
                <div className="bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-4 overflow-hidden w-full">
                    <div className="bg-white dark:bg-green-900/20 p-2.5 rounded-lg border border-green-100 dark:border-green-800/30 text-green-600 dark:text-green-400 shrink-0">
                      <span className="material-symbols-outlined text-xl">check_circle</span>
                    </div>
                    <div className="min-w-0 flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">Success!</span>
                      <div className="flex items-baseline gap-2 overflow-hidden">
                        <a className="text-lg font-semibold text-slate-900 dark:text-white hover:text-primary truncate" href="#">shrt.url/github-repo</a>
                        <span className="text-sm text-slate-400 truncate hidden sm:inline">→ https://github.com/repository...</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-lg">content_copy</span> Copy
                    </button>
                    <button className="p-2 bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors shadow-sm" title="QR Code">
                      <span className="material-symbols-outlined text-lg">qr_code_2</span>
                    </button>
                    <button 
                      onClick={() => setShowSuccess(false)}
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* --- TABLE SECTION --- */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Links</h3>
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">search</span>
                    <input 
                      className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white placeholder:text-slate-400 transition-all w-full sm:w-64 shadow-sm" 
                      placeholder="Search links..." 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">filter_list</span> Filter
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-700/50">
                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-surface-dark">Original URL</th>
                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-surface-dark">Short Link</th>
                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-surface-dark text-center">Clicks</th>
                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-surface-dark">Created</th>
                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-surface-dark text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {links.map((link) => (
                        <tr key={link.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="py-5 px-6 max-w-[300px]">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                                <img alt={link.title} className="size-4 opacity-80" src={link.icon} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{link.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{link.originalUrl}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-2">
                              <span className="text-primary font-medium text-sm">{link.shortUrl}</span>
                              <button className="text-slate-400 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-primary/10">
                                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                              </button>
                            </div>
                          </td>
                          <td className="py-5 px-6 text-center">
                            <div className="inline-flex flex-col items-center">
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{link.clicks}</span>
                              {link.trend && (
                                <span className="text-[10px] text-green-600 font-medium flex items-center gap-0.5">
                                  <span className="material-symbols-outlined text-[10px]">trending_up</span> {link.trend}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-5 px-6 text-sm text-slate-500 dark:text-slate-400">
                            {link.date}
                          </td>
                          <td className="py-5 px-6 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                              </button>
                              <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* --- PAGINATION --- */}
                <div className="px-6 py-4 bg-slate-50/50 dark:bg-surface-dark border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Showing <span className="font-semibold text-slate-900 dark:text-white">1-3</span> of 45 links</span>
                  <div className="flex gap-2">
                    <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-500 transition-colors disabled:opacity-50" disabled>
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;