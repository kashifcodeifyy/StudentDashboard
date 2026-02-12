import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, login } from "../store/dataSlice";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  LogIn,
  UserPlus,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import toast from "react-hot-toast";

const AuthPage = ({ isSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.data.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      const userExists = users.find((e) => e.email === email);
      if (userExists) return toast.error("User already exists!");

      dispatch(signup({ email, password }));
      toast.success("Account created! Please login.");
      navigate("/signin");
    } else {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        dispatch(login(user));
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error("Something went wriong!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>

      <div className="max-w-md w-full mx-4 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-xl shadow-blue-200 text-white mb-4">
            <LayoutDashboard size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            DevDash
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            {isSignup
              ? "Start your journey with us"
              : "Manage your business with ease"}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-white">
          <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            {isSignup ? (
              <UserPlus className="text-blue-600" size={20} />
            ) : (
              <LogIn className="text-blue-600" size={20} />
            )}
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-700"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-700"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 transform transition hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSignup ? "Get Started" : "Sign In Now"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium">
              {isSignup ? "Already have an account?" : "New to DevDash?"}
              <button
                onClick={() => navigate(isSignup ? "/signin" : "/signup")}
                className="text-blue-600 font-bold ml-2 hover:underline underline-offset-4"
              >
                {isSignup ? "Log In" : "Create Account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
