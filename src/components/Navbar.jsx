import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/dataSlice";
import {
  Menu,
  X,
  LayoutDashboard,
  GraduationCap,
  Target,
  LogOut,
  User,
  Bell,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const auth = useSelector((state) => state.data.auth);
  const user = useSelector((state) => state.data.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!auth) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Students", path: "/students", icon: <GraduationCap size={18} /> },
    { name: "Leads", path: "/leads", icon: <Target size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200 py-2"
          : "bg-white border-b border-slate-100 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="group flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                <LayoutDashboard size={22} />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
                DevDash
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            <div className="h-6 w-[1px] bg-slate-200 mx-4"></div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
                <div className="hidden lg:block text-right">
                  <p className="text-xs font-black text-slate-800 leading-none">
                    {user?.email?.split("@")[0]}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu  */}
          <div className="md:hidden flex items-center gap-4">
            <div className="bg-indigo-50 p-2 rounded-full text-indigo-600">
              <User size={18} />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-bold transition-all ${
                  isActive(link.path)
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-4 text-red-500 font-black hover:bg-red-50 rounded-2xl transition"
              >
                <LogOut size={20} /> Logout Account
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
