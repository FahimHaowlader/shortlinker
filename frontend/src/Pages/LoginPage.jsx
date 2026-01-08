import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext"; // Adjust path to your context file
import { useNavigate, Link } from "react-router";
import axios from "axios";

const LoginPage = () => {
  const { emailUserSignIn, googleUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setBtnLoading(true);

    try {
      await emailUserSignIn(email, password);
      const response = await axios.post(`http://localhost:5200/api/v1/login`, {
        mail: email,
      });
      console.log("Login response:", response.data);

      navigate("/"); // Redirect to home/dashboard on success
    } catch (err) {
      // Map Firebase error codes to user-friendly messages
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setBtnLoading(false);
    }
  };

const handleGoogleLogin = async () => {
  setError("");

  try {
    // Google authentication
    const result = await googleUser();
    const email = result?.user?.email;
    console.log("Google sign-in email:", email);

    if (!email) {
      throw new Error("Email not found from Google");
    }

    try {
      // Try to login user
      const res = await axios.post("http://localhost:5200/api/v1/login", {
        mail: email,
      });
      console.log("Existing user logged in via Google:", res.data);
    } catch (err) {
      // If user does NOT exist → create new user
      if (err.response?.status === 404) {
          const res = await axios.post("http://localhost:5200/api/v1/register", {
          mail: email,
        });
        console.log("New user registered via Google:", res.data);
      }
    }

    // ✅ Navigate for BOTH existing & new users
    navigate("/");

  } catch (err) {
    console.error(err);
    setError("Google sign-in failed. Please try again.");
  }
};

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen flex flex-col items-center justify-center font-display antialiased p-4">
      <main className="w-full max-w-[500px]">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-slate-100 dark:border-gray-700 p-8 sm:p-10 transition-all">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600 dark:text-gray-400 uppercase tracking-wide ml-1">
                Email
              </label>
              <input
                className="form-input w-full p-5 rounded-xl border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/30 h-11 transition-colors text-sm"
                placeholder="name@company.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-slate-600 dark:text-gray-400 uppercase tracking-wide">
                  Password
                </label>
                {/* <Link to="/forgot-password" size="xs" className="text-xs font-medium text-primary hover:text-primary-hover hover:underline transition-colors">Forgot password?</Link> */}
              </div>
              <div className="relative group">
                <input
                  className="form-input w-full p-5 rounded-xl border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/30 h-11 transition-colors text-sm pr-10"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 group-focus-within:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <button
              disabled={btnLoading}
              className="w-full mt-2 py-2.5 px-4 bg-primary/80 hover:bg-primary text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
            >
              {btnLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-slate-100 dark:bg-gray-700"></div>
            <p className="text-slate-400 dark:text-gray-500 text-xs font-medium">
              OR
            </p>
            <div className="h-px flex-1 bg-slate-100 dark:bg-gray-700"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-4 text-sm font-medium text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors"
            type="button"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              ></path>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-gray-400">
              New to ShortLinker?
              <Link
                to="/register"
                className="text-primary/80 hover:text-primary font-semibold transition-colors ml-1 "
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
