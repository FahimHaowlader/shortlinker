import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router';

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
      
      console.log("Account created successfully!");
      navigate('/'); 
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use.');
      } else {
        setError(err.message || 'Failed to create account.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    try {
      await googleUser();
      navigate('/');
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

            <div>
              <button 
                onClick={handleGoogleSignUp}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#252f3e] transition-all" 
                type="button"
              >
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M12.0003 20.45c4.6667 0 8.5833-3.25 9.9167-7.7167H12.0003v-4.0666h13.25c.1667 1.3.25 2.65.25 4.0833 0 7.4167-5.0833 12.75-12.5 12.75C5.642 25.5.5003 20.3583.5003 14 .5003 7.6417 5.642 2.5 13.0003 2.5c3.3333 0 6.4167 1.25 8.75 3.4167l-3.3333 3.3333c-1.25-1.1667-2.9167-1.9167-5.4167-1.9167-4.3333 0-7.9167 3.5833-7.9167 7.9167s3.5833 7.9167 7.9167 7.9167z" fill="currentColor"></path>
                </svg>
                Sign up with Google
              </button>
            </div>

            <div className="relative mt-8 mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm leading-6">
                <span className="bg-white dark:bg-surface-dark px-4 text-gray-500 dark:text-gray-400">or continue with email</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium text-center border border-red-100 dark:border-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-1.5" htmlFor="username">Username</label>
                <input 
                  className="block w-full rounded-lg border-0 py-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-[#252f3e] sm:text-sm transition-all" 
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
                  className="block w-full rounded-lg border-0 py-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-[#252f3e] sm:text-sm transition-all" 
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
                    className="block w-full rounded-lg border-0 py-3 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-[#252f3e] sm:text-sm transition-all" 
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
              <div>
                <button 
                  disabled={loading}
                  className="flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-sm font-bold leading-6 text-white shadow-md hover:bg-blue-600 focus-visible:outline-primary transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed" 
                  type="submit"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?
              <Link to="/login" className="font-semibold text-primary hover:text-blue-500 transition-colors ml-1">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;