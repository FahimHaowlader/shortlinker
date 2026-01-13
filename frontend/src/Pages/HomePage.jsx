import React, { useState } from "react";
import { Link,useNavigate } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import ReviewCard from "../Components/ReviewCard";
import StatItem from "../Components/StatItem";
import Pricing from "../Components/Pricing";
import FeatureCard from "../Components/FeatureCard";
import Step from "../Components/Step";
import { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const { user, userSignOut,limit,setLimit } = useAuth();
  const [longUrl, setLongUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
           const response = await axios.post(`http://localhost:5200/api/v1/login`, {
        mail: user.email,
      });
      console.log("Login response:", response.data);
      setLimit(response.data.data.user.credits);
        // console.log("User is logged in on HomePage:", user);
      } else {
        console.log("No user is logged in on HomePage");
      }
    };

    fetchUserData();  
  }, [user]);

  const handleShorten = async (e) => {
    e.preventDefault();
    if(!user){
      navigate("/login");
      return;
    }
    if (!limit){
      alert("You have reached your link creation limit. Please upgrade your plan to create more links.");
      return;
    }
    if (!longUrl) return;

    setIsShortening(true);
    // Simulate an API call delay
    
    try {  
        const shortCode = Math.random().toString(36).substring(7);
      setShortenedUrl(`http://localhost:5200/api/v1/url/${shortCode}`);
      const response = await axios.post(`http://localhost:5200/api/v1/update-user`, { 
        mail: user.email,
      });
      setLimit(response.data.data?.credits);
      console.log("User credits after shortening:", response.data.data?.credits);
      const res = await axios.post("http://localhost:5200/api/v1/links", {  
        originalUrl: longUrl,
        shortCode: shortCode,
        mail: user.email,
      });
      setIsShortening(false);
    } catch (err) {
      console.error("Error shortening URL:", err);
      setIsShortening(false);
    }
  };
 
const copyToClipboard = async () => {
  console.log("Attempting to copy:", shortenedUrl);
  if (!shortenedUrl) return;

  try {
    // Copy full URL including https://
    await navigator.clipboard.writeText(`${shortenedUrl}`);
    setCopied(true);

    // Reset copied state after 1.5s for button feedback
    setTimeout(() => setCopied(false), 500);
  } catch (err) {
    console.error("Copy failed:", err);
    alert("Failed to copy. Please copy manually.");
  }
};


  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display antialiased selection:bg-primary/20 selection:text-primary">
      <div className="relative flex min-h-screen w-full flex-col">
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

            <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
              <a
                className="hover:text-primary dark:hover:text-white transition-colors"
                href="#features"
              >
                Features
              </a>
              <a
                className="hover:text-primary dark:hover:text-white transition-colors"
                href="#how-it-works"
              >
                How it works
              </a>
              <a
                className="hover:text-primary dark:hover:text-white transition-colors"
                href="#pricing"
              >
                Pricing
              </a>
            </nav>


            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  {/* <span className="text-sm font-medium hidden sm:block text-slate-600 dark:text-slate-300">
                    {user.displayName || user.email}
                  </span> */}
                  <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
              <Link className="hover:text-slate-900 dark:text-white transition-colors" to={'/dashboard/'+ user?.email}>Dashboard</Link>
              <Link className="hidden lg:block hover:text-slate-900 dark:hover:text-white transition-colors" to='/'>Analytics</Link>
              <Link className="hidden lg:block hover:text-slate-900 dark:hover:text-white transition-colors" href='/'>Settings</Link>
            </nav>
            <div className="flex items-center gap-4 pl-6 sm:border-l border-slate-200 dark:border-slate-700">
              <button
                    onClick={userSignOut}
                    className="text-sm cursor-pointer font-medium text-red-500 hover:text-red-600 transition-colors"
                  >
                    Log out
                  </button>
              <Link to={`/dashboard/${user?.email}`}>
                                 <div
                                   className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-slate-100 dark:ring-slate-700 cursor-pointer"
                                   style={{
                                     backgroundImage: `url(${
                                       user?.photoURL ||
                                       "https://lh3.googleusercontent.com/aida-public/AB6AXuChHIWtw-d_qGMDO7r6akX77_dtXTwle_wqqB0ptGkpwPSdbE_XG4mfekjMPT2Y9dOqFk5LuItBK-5wdlU2h0UArPt4GT0_Nu5IKtBrqhVuS3IqKLvdTPFnH9RtAqiP3j4qjgaD1NXJJA1wiW1n5eCIs8fg0MLNkLJ_JRzAtt6d3R54Eo8xPqjYfAqmCgJl7jNoOUX3m1aCwSWkf9OGOtCCLEmLSWKlhK8NkU5U1dsqacG6diZW-22pVcpYy8ZaV2YARyWtseF58g"
                                     })`,
                                   }}
                                 > 
                                 {/* <img src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuChHIWtw-d_qGMDO7r6akX77_dtXTwle_wqqB0ptGkpwPSdbE_XG4mfekjMPT2Y9dOqFk5LuItBK-5wdlU2h0UArPt4GT0_Nu5IKtBrqhVuS3IqKLvdTPFnH9RtAqiP3j4qjgaD1NXJJA1wiW1n5eCIs8fg0MLNkLJ_JRzAtt6d3R54Eo8xPqjYfAqmCgJl7jNoOUX3m1aCwSWkf9OGOtCCLEmLSWKlhK8NkU5U1dsqacG6diZW-22pVcpYy8ZaV2YARyWtseF58g"} alt="" /> */}
                                 </div>
                                 </Link>
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

        <main className="flex-1 w-full relative overflow-hidden pt-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none -z-10"></div>
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                New: Enhanced analytics dashboard
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
              Make every connection <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                count.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Create short, branded links that drive clicks and track
              performance. Join thousands of marketers creating millions of
              links each month.
            </p>
            { user && (
        
              <div className="flex items-center gap-4 bg-white dark:bg-surface-dark px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm mb-10">
                <div className="flex md:flex-col gap-5 md:gap-0 items-center">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{100 -(limit) 
                    } <span className="text-slate-400 font-normal">/ 100 links</span></span>
                </div>
                 <div className="flex  gap-5 md:gap-2 items-center">

                
                <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${100 -(limit)}%` }}></div>
                </div>
                <a href="#pricing"> 
                <button className="ml-2 cursor-pointer text-xs font-medium text-primary hover:text-primary-dark whitespace-nowrap">Upgrade</button></a>
              </div>
               </div>
                   )}
<div className="w-full max-w-2xl relative group">


          {/* FIXED overlay */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 
          rounded-2xl blur opacity-20 group-hover:opacity-40 transition pointer-events-none"></div>

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
      className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold shadow-glow transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-70"
    >
      <span>{isShortening ? "Processing..." : "Shorten URL"}</span>
      <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">
        arrow_forward
      </span>
    </button>
  </form>

          {shortenedUrl && (
           <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500 bg-white dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex flex-col text-left overflow-hidden w-full">
        <span className="text-xs text-slate-500 mb-1">Your short link</span>
        <Link
          className="text-primary font-medium hover:underline truncate"
          to={`${shortenedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          {shortenedUrl}
        </Link>
      </div>

              {/* FIXED BUTTON */}
              <button
                type="button"
                onClick={copyToClipboard}
                className="ml-4 px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 
                rounded-lg cursor-pointer"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
        </div>


            <p className="mt-6 text-sm text-slate-400 dark:text-slate-500">
              By clicking Shorten URL, you agree to our{" "}
              <Link
                className="underline hover:text-slate-600 dark:hover:text-slate-300"
                to="/terms"
              >
                Terms of Service
              </Link>
              .
            </p>
          </section>

          <section
            id="features"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon="analytics"
                title="Advanced Analytics"
                desc="Track clicks, geographic data, and referring channels in real-time."
                iconBg="bg-blue-50 dark:bg-blue-900/20"
                iconColor="text-blue-600 dark:text-blue-400"
              />
              <FeatureCard
                icon="edit"
                title="Custom Aliases"
                desc="Create meaningful links that look professional and match your brand."
                iconBg="bg-purple-50 dark:bg-purple-900/20"
                iconColor="text-purple-600 dark:text-purple-400"
              />
              <FeatureCard
                icon="qr_code_2"
                title="QR Code Generation"
                desc="Generate QR codes for any short link instantly for offline engagement."
                iconBg="bg-emerald-50 dark:bg-emerald-900/20"
                iconColor="text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </section>
          <section
            id="how-it-works"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12 relative"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                How it works
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                Get started in seconds. No technical knowledge required.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <Step
                icon="content_paste"
                number="1"
                title="Paste Your Link"
                desc="Copy your long URL and paste it into our shortening tool."
              />
              <Step
                icon="auto_fix_high"
                number="2"
                title="Click Shorten"
                desc="Hit the button. Our system instantly generates a secure link."
              />
              <Step
                icon="rocket_launch"
                number="3"
                title="Share & Track"
                desc="Share your link everywhere and watch clicks roll in."
              />
            </div>
          </section>
          <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100 dark:divide-slate-800/50">
                <StatItem count="10M+" label="Links Created" />
                <StatItem count="500M+" label="Clicks Tracked" />
                <StatItem count="99.9%" label="Uptime" />
                <StatItem count="24/7" label="Support" />
              </div>
            </div>
          </section>

          <section className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Loved by marketing teams
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                  Don't just take our word for it. Here's what our users have to
                  say.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ReviewCard
                  initials="SJ"
                  name="Sarah Jenkins"
                  role="Digital Marketing Lead"
                  text="ShortURL has completely transformed how we track our social media campaigns. The analytics are incredibly detailed."
                  color="blue"
                />
                <ReviewCard
                  initials="DC"
                  name="David Chen"
                  role="Product Manager"
                  text="The custom aliases feature is a game-changer for branding. Our click-through rates improved by 35%."
                  color="purple"
                />
                <ReviewCard
                  initials="ER"
                  name="Elena Rodriguez"
                  role="Freelance Designer"
                  text="Simple, fast, and reliable. I use it for everything from client proposals to sharing videos with friends."
                  color="emerald"
                />
              </div>
            </div>
          </section>

          <Pricing />

          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to boost your connections?
                </h2>
                <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                  Get started for free today and take control of your links.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-all shadow-glow"
                  >
                    Get Started for Free
                  </Link>
                  <Link
                    to="/"
                    className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold backdrop-blur-sm transition-all border border-white/10"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-slate-400">
              © 2026 ShortURL Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};



export default HomePage;

const HomePage1 = () => {
  const [limit, setLimit] = useState(0);
  const { user, userSignOut } = useAuth();
  const [longUrl, setLongUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const response = await axios.post("http://localhost:5200/api/v1/login", {
        mail: user.email,
      });
      setLimit(response.data.data.user.credits);
    };
    fetchUserData();
  }, [user]);

  const handleShorten = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!limit) {
      alert("You have reached your link creation limit.");
      return;
    }

    setIsShortening(true);
    setTimeout(() => {
      setShortenedUrl(`shrt.url/${Math.random().toString(36).substring(7)}`);
      setIsShortening(false);
    }, 300);
  };

  const copyToClipboard = async () => {
    if (!shortenedUrl) return;
    try {
      await navigator.clipboard.writeText(`https://${shortenedUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      alert("Copy failed");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <main className="pt-32 flex justify-center">
        <div className="w-full max-w-2xl relative group">

          {/* FIXED overlay */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 
          rounded-2xl blur opacity-20 group-hover:opacity-40 transition pointer-events-none"></div>

          <form
            onSubmit={handleShorten}
            className="relative bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-xl flex gap-2"
          >
            <input
              type="url"
              required
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Paste your long link here..."
              className="flex-1 px-4 py-3 rounded-xl border outline-none"
            />

            <button
              type="submit"
              disabled={isShortening}
              className="px-6 py-3 bg-primary text-white rounded-xl"
            >
              {isShortening ? "Processing..." : "Shorten"}
            </button>
          </form>

          {shortenedUrl && (
            <div className="mt-6 bg-white dark:bg-surface-dark rounded-xl p-4 flex items-center justify-between">
              <a
                href={`https://${shortenedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary truncate"
              >
                {shortenedUrl}
              </a>

              {/* FIXED BUTTON */}
              <button
                type="button"
                onClick={copyToClipboard}
                className="ml-4 px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 
                rounded-lg cursor-pointer"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

