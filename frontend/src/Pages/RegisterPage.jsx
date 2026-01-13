import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';

const RegisterPage = () => {
  const { createEmailUser, userInfoUpdate, googleUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError("Please agree to the Terms and Conditions.");
      return;
    }

    setError('');
    setLoading(true);

try {
  await createEmailUser(email, password);
  await userInfoUpdate({ displayName: username });
  // console.log("User created in Firebase:", email);
  // Backend sync (non-blocking for UX)
  try {
   const res =  await axios.post("http://localhost:5200/api/v1/register", {
      mail: email,
    });
    // console.log("Backend registration response:", res.data);
  } catch (apiErr) {
    console.warn(
      "User created in Firebase but backend sync failed:",
      apiErr.response?.data
    );
  }

  navigate("/");
} catch (err) {
  if (err.code === "auth/email-already-in-use") {
    setError("This email is already in use.");
  } else {
    setError(err.message || "Failed to create account.");
  }
} finally {
  setLoading(false);
  }};

  const handleGoogleSignUp = async () => {
    setError('');
    try {
     const res =  await googleUser();
      // console.log("Google sign-up user:", res.user);
      const email = res.user.email;
      try {
       const response =  await axios.post(`http://localhost:5200/api/v1/register`, { mail: email });// Register if not exists
        // console.log("Google sign-up response:", response.data);
        navigate('/');
      } catch (regErr) {
        if(regErr.response && regErr.response.status === 409){
          // User already exists, proceed to home
          navigate('/');
          return;
        }
        console.error("Google sign-up registration error:", regErr);
      }
    } catch (err) {
      setError('Google sign-up failed. Please try again.');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white antialiased">
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
       
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center mb-8">
          {/* <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-blue-500/30 mb-4">
            <span className="material-symbols-outlined text-3xl">link</span>
          </div> */}
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Start managing your links with <span className="font-semibold text-primary">ShortLinker</span>
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-[500px] ">
          <div className="bg-white dark:bg-surface-dark px-6 py-10 shadow-xl shadow-gray-200/50 dark:shadow-none sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-800">

           

           
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium text-center border border-red-100 dark:border-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-1.5" htmlFor="username">Username</label>
                <input 
                  className="block w-full p-5 rounded-lg border-0 py-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-[#252f3e] sm:text-sm transition-all" 
                  id="username" 
                  type="text" 
                  required
                  placeholder="e.g. linkmaster" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-1.5" htmlFor="email">Email address</label>
                <input 
                  className="block p-5 w-full rounded-lg border-0 py-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-[#252f3e] sm:text-sm transition-all" 
                  id="email" 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-1.5" htmlFor="password">Password</label>
                <div className="relative">
                  <input 
                    className="block p-5 w-full rounded-lg border-0 py-3 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-[#252f3e] sm:text-sm transition-all" 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="Min. 8 characters" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start pt-2">
                <div className="flex h-6 items-center">
                  <input 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary bg-transparent" 
                    id="terms" 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label className="font-medium text-gray-600 dark:text-gray-300" htmlFor="terms">
                    I agree to the <Link to="/terms" className="font-semibold text-primary hover:text-blue-600 transition-colors">Terms</Link> and <Link to="/privacy" className="font-semibold text-primary hover:text-blue-600 transition-colors">Privacy Policy</Link>.
                  </label>
                </div>
              </div>
              <div className='inline-block w-full mt-5'>
                <button 
                  disabled={loading}
                  className="flex w-full justify-center rounded-lg bg-primary/80 px-3 py-3 text-sm font-bold leading-6 text-white shadow-md hover:bg-primary focus-visible:outline-primary transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed" 
                  type="submit"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
             <div className="relative mt-5 mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm leading-6">
                <span className="bg-white dark:bg-surface-dark px-4 text-gray-500 dark:text-gray-400">or continue with google</span>
              </div>
            </div>
             <div>
              <button 
                onClick={handleGoogleSignUp}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#252f3e] transition-all" 
                type="button"
              >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
                Sign up with Google
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?
              <Link to="/login" className="font-semibold text-primary/90 hover:text-primary  hover:underline transition-colors ml-1">Log in</Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;