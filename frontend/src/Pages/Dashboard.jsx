
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import { useAuth } from "../Contexts/AuthContext";
import Pagination from "../Components/Pagination";

const API = "http://localhost:5200/api/v1";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, userSignOut, limit, setLimit } = useAuth();

  const [longUrl, setLongUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [link,setLink] = useState([])
  const [totalDocs,setTotalDocs] = useState(0)

  // SUCCESS CARD COPY
  const [copied, setCopied] = useState(false);

  // TABLE COPY (PER ROW)
  const [copiedRowId, setCopiedRowId] = useState(null);

  const [links] = useState([
    {
      id: 1,
      originalUrl:
        "https://figma.com/file/LKj8923dxxddcdvdgvfgghfghbfttgftgtrgrtgr",
      shortCode: "shrt.url/ds-v22",
      clicks: 1234,
      createdAt: "2026-01-08T18:33:48.747+00:00",
    },
    {
      id: 2,
      originalUrl: "https://figma.com/file/LKj8923",
      shortCode: "shrt.url/ds-v2",
      clicks: 1234,
      createdAt: "2026-01-08T18:33:48.747+00:00",
    },
  ]);

  // ---------------- COPY (SUCCESS CARD) ----------------
  const copyToClipboard = async (url) => {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
  };

  // ---------------- COPY (TABLE ROW) ----------------
  const copyToClipboardForTr = async (url, id) => {
    if (!url) return;
    await navigator.clipboard.writeText(`${API}/url/${url}`);
    setCopiedRowId(id);
    setTimeout(() => setCopiedRowId(null), 800);
  };

  // ---------------- SHORTEN ----------------
  const handleShorten = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (limit <= 0) {
      alert("Link limit reached");
      return;
    }

    setIsShortening(true);
    setShowSuccess(false);

    try {
      const shortCode = Math.random().toString(36).substring(2, 8);
      const shortUrl = `${API}/url/${shortCode}`;
      setShortenedUrl(shortUrl);

      await axios.post(`${API}/links`, {
        originalUrl: longUrl,
        shortCode,
        mail: user.email,
      });

      const creditRes = await axios.post(`${API}/update-user`, {
        mail: user.email,
      });
      setLimit(creditRes.data.data.credits);

      setShowSuccess(true);
      setLongUrl("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsShortening(false);
    }
  };

  // ---------------- FETCH USER ----------------
  useEffect(() => {
    if (!user) return;

    const fetchUser = async () => {
      const res = await axios.post(`${API}/login`, {
        mail: user.email,
      });
      setLimit(res.data.data.user.credits);
    };

    fetchUser();
  }, [user, setLimit]);

  useEffect(() => {

    const fetchLinks = async () => {
      
  try {
    const res = await axios.post(`${API}/all-links`, {
      mail: user?.email,
      page: currentPage,
    });
    setTotalDocs(res.data.data.totalLinks);
    setLink(res.data.data.shortLinks); // assuming your backend sends `data` in apiResponse
  } catch (err) {
    console.error("Error fetching links:", err);
  }
};

    fetchLinks();
      
  }, [user,currentPage]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* HEADER */}
      <header className="fixed top-0 backdrop-blur-sm shadow-lg flex items-center justify-between px-6 py-4  w-full z-50 ">
        <div className=" max-w-7xl mx-auto w-full flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <a className="flex gap-3 items-center" href="/">
              <div className="size-10 text-primary flex items-center justify-center bg-white dark:bg-surface-dark shadow-sm rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="material-symbols-outlined text-3xl">link</span>
              </div>
              <h2 className="text-xl hidden lg:block font-bold tracking-tight text-slate-900 dark:text-white">
                ShortLinker
              </h2>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {/* <span className="text-sm font-medium hidden sm:block text-slate-600 dark:text-slate-300">
                          {user.displayName || user.email}
                        </span> */}
                <div className="flex items-center gap-6">
                  <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <Link
                      className="hover:text-slate-900 dark:text-white transition-colors"
                      to={"/dashboard/" + user?.email}
                    >
                      Dashboard
                    </Link>
                    <Link
                      className="hidden lg:block hover:text-slate-900 dark:hover:text-white transition-colors"
                      to="/"
                    >
                      Analytics
                    </Link>
                    <Link
                      className="hidden lg:block hover:text-slate-900 dark:hover:text-white transition-colors"
                      href="/"
                    >
                      Settings
                    </Link>
                  </nav>
                  <div className="flex items-center gap-4 pl-6 sm:border-l border-slate-200 dark:border-slate-700">
                    <button
                      onClick={userSignOut}
                      className="text-sm cursor-pointer font-medium text-red-500 hover:text-red-600 transition-colors"
                    >
                      Log out
                    </button>
                    <div
                      className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-slate-100 dark:ring-slate-700 cursor-pointer"
                      style={{
                        backgroundImage: `url(${
                          user?.photoURL ||
                          "https://lh3.googleusercontent.com/aida-public/AB6AXuChHIWtw-d_qGMDO7r6akX77_dtXTwle_wqqB0ptGkpwPSdbE_XG4mfekjMPT2Y9dOqFk5LuItBK-5wdlU2h0UArPt4GT0_Nu5IKtBrqhVuS3IqKLvdTPFnH9RtAqiP3j4qjgaD1NXJJA1wiW1n5eCIs8fg0MLNkLJ_JRzAtt6d3R54Eo8xPqjYfAqmCgJl7jNoOUX3m1aCwSWkf9OGOtCCLEmLSWKlhK8NkU5U1dsqacG6diZW-22pVcpYy8ZaV2YARyWtseF58g"
                        })`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  to="/login"
                >
                  Log in
                </Link>
                <Link
                  className="hidden sm:flex bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg"
                  to="/register"
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10 mt-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Manage your links and track performance.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-surface-dark px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex md:flex-col gap-5 md:gap-0 items-center">
                <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  Plan Usage
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {100 - limit}{" "}
                  <span className="text-slate-400 font-normal">
                    / 100 links
                  </span>
                </span>
              </div>
              <div className="flex flex-col md:flex-row  gap-5 md:gap-2 items-center">
                <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${100 - limit}%` }}
                  ></div>
                </div>
                <Link
                  to="/"
                  className="ml-2 cursor-pointer text-xs font-medium text-primary hover:text-primary-dark whitespace-nowrap"
                >
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SHORTENER */}
        <section className="flex flex-col gap-6 py-10">
          <div className="w-full mx-auto relative group z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <form
              onSubmit={handleShorten}
              className="relative bg-white dark:bg-surface-dark p-2 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400">
                    link
                  </span>
                </div>
                <input
                  className="block w-full pl-12 pr-4 py-4 bg-transparent border-none rounded-xl text-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 focus:outline-none"
                  placeholder="Paste your long link here..."
                  type="url"
                  required
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                />
              </div>
              <button
                disabled={isShortening}
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold shadow-glow flex items-center justify-center gap-2 group/btn disabled:opacity-70 active:scale-95 transition-transform"
              >
                <span>{isShortening ? "Processing..." : "Shorten URL"}</span>
                <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </form>
          </div>

          {showSuccess && (
            <div className="bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-4 overflow-hidden w-full">
                <div className="bg-white dark:bg-green-900/20 p-2.5 rounded-lg border border-green-100 dark:border-green-800/30 text-green-600 dark:text-green-400 shrink-0">
                  <span className="material-symbols-outlined text-xl">
                    check_circle
                  </span>
                </div>
                <div className="min-w-0 flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
                    Success!
                  </span>
                  <div className="flex items-baseline gap-2 overflow-hidden">
                    <Link
                      to={`${shortenedUrl}`}
                      target="_blank"
                      className="text-lg font-semibold text-slate-900 hover:underline dark:text-white hover:text-primary truncate"
                      href="#"
                    >
                      {shortenedUrl}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0   w-full sm:w-auto">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="ml-4 px-4 py-2 hover:text-primary text-sm bg-slate-100 
                 rounded-lg cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                {/* <button className="p-2 bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors shadow-sm" title="QR Code">
                       <span className="material-symbols-outlined text-lg">qr_code_2</span>
                     </button> */}
                <button
                  onClick={() => setShowSuccess(false)}
                  className="hover:text-red-400 p-2 text-slate-400 dark:hover:text-slate-200"
                >
                  <span className="material-symbols-outlined text-lg cursor-pointer">
                    close
                  </span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* TABLE */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-slate-200 dark:border-slate-700 overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700/50">
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-surface-dark">
                    Original URL
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-surface-dark">
                    Short Link
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-surface-dark text-center">
                    Clicks
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-surface-dark">
                    Created
                  </th>
                  <th className="flex justify-center items-center py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-surface-dark text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {link &&  link.map((link) => (
                  <tr
                    key={link._id}
                    className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-4 max-w-xs">
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-primary hover:underline font-medium text-sm block truncate"
                        title={link.originalUrl} // optional: show full URL on hover
                      >
                        {link.originalUrl}
                      </a>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 items-center">
                        <span className="w-11 text-end">{link.shortCode}</span>
                        <button
                          onClick={() =>
                            copyToClipboardForTr(link.shortCode, link._id)
                          }
                         className="w-20 ml-4 px-4 py-2 text-sm bg-slate-100 hover:text-primary hover:underline
                rounded-lg cursor-pointer"
               >
                          {copiedRowId === link._id ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 text-center">
                      {link.clicks}
                    </td>
                    <td className="py-2 px-6 text-sm text-slate-500 dark:text-slate-400">
                      {link.createdAt
                        ? new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(new Date(link.createdAt))
                        : "Date N/A"}
                    </td>
                    <td className="flex justify-center items-center p-4 text-right text-red-500">
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4">
          <Pagination
            page={currentPage}
            setPage={setCurrentPage}
            totalDocs={totalDocs}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
