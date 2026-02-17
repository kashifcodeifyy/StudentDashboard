import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, fetchLeads } from "../store/dataSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Users,
  Target,
  LayoutDashboard,
  GraduationCap,
  TrendingUp,
  Filter,
} from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    users = [],
    leads = [],
    students = [],
    loading,
    auth,
  } = useSelector((state) => state.data || {});

  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    if (auth) {
      dispatch(fetchStudents());
      dispatch(fetchLeads());
    }
  }, [dispatch, auth]);

  const filteredLeads =
    filterType === "Leads"
      ? (leads || []).filter((l) => l.status === "Leads")
      : leads || [];

  const filteredStudents =
    filterType === "Active"
      ? (students || []).filter((s) => s.course !== "")
      : students || [];

  const barData = [
    { name: "Users", count: (users || []).length, color: "#6366f1" },
    { name: "Leads", count: (filteredLeads || []).length, color: "#10b981" },
    {
      name: "Students",
      count: (filteredStudents || []).length,
      color: "#8b5cf6",
    },
  ];

  const stats = [
    {
      label: "Total Users",
      count: (users || []).length,
      icon: <Users className="w-6 h-6" />,
      gradient: "from-blue-600 to-indigo-600",
      shadow: "shadow-blue-200",
    },
    {
      label: filterType === "All" ? "Leads" : filterType,
      count: (filteredLeads || []).length,
      icon: <Target className="w-6 h-6" />,
      gradient: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-200",
    },
    {
      label: "Active Students",
      count: (filteredStudents || []).length,
      icon: <GraduationCap className="w-6 h-6" />,
      gradient: "from-purple-500 to-violet-600",
      shadow: "shadow-purple-200",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
                <LayoutDashboard size={24} />
              </div>
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
            <div className="pl-3 text-slate-400">
              <Filter size={18} />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-transparent border-none text-sm font-bold text-slate-700 outline-none pr-8 cursor-pointer focus:ring-0"
            >
              <option value="All">All Records</option>
              <option value="Leads"> Leads </option>
              <option value="Active"> Students </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-white p-6 rounded-3xl shadow-xl ${stat.shadow} border border-slate-100 group transition-all hover:-translate-y-2`}
            >
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <h3 className="text-4xl font-black text-slate-800 mt-2">
                    {stat.count}
                  </h3>
                  <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-2">
                    <TrendingUp size={14} /> Live
                  </div>
                </div>
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                Statistics Overview
              </h2>
              <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-tighter">
                Visual Data
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      padding: "12px",
                    }}
                  />
                  <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={50}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                {/* <h3 className="text-xl font-bold mb-2">Current Filter:</h3> */}
                <p className="text-indigo-400 font-bold mb-4 uppercase tracking-widest">
                  {filterType}
                </p>
                {/* <p className="text-slate-400 text-sm mb-6">
                  Showing  records.
                </p> */}
                <button
                  onClick={() => setFilterType("All")}
                  className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-50 transition"
                >
                  Reset Dashboard
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
