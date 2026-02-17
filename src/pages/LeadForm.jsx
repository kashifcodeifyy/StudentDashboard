import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeads,
  addLeadAsync,
  updateLeadAsync,
  deleteLeadAsync,
} from "../store/dataSlice";
import {
  Target,
  Edit2,
  Trash2,
  PlusCircle,
  Search,
  Briefcase,
  Mail,
  Phone,
  User,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const LeadForm = () => {
  const initialForm = {
    name: "",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    status: "Pending",
  };

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { leads, loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const safeLeads = leads || [];

  const filteredLeads = safeLeads.filter(
    (lead) =>
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This lead will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLeadAsync(id));
        Swal.fire({
          title: "Deleted!",
          text: "Lead has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const startEdit = (lead) => {
    setEditingId(lead._id || lead.id);
    setFormData({
      name: lead.name || "",
      companyName: lead.companyName || "",
      contactPerson: lead.contactPerson || "",
      email: lead.email || "",
      phone: lead.phone || "",
      status: lead.status || "Pending",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateLeadAsync({ id: editingId, ...formData }));
      toast.success("Lead updated successfully");
      setEditingId(null);
    } else {
      dispatch(addLeadAsync(formData));
      toast.success("Lead saved successfully");
    }
    setFormData(initialForm);
  };

  const stats = [
    { label: "Total Leads", count: safeLeads.length, color: "bg-blue-500" },
    {
      label: "Converted",
      count: safeLeads.filter((l) => l.status === "Converted").length,
      color: "bg-green-500",
    },
    {
      label: "Pending",
      count: safeLeads.filter((l) => l.status === "Pending").length,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="p-4 md:p-10 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
              <Target className="text-blue-600 w-10 h-10" />
              Leads
            </h1>
            {loading && (
              <p className="text-blue-500 text-sm animate-pulse">Loading...</p>
            )}
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl shadow-sm border flex-1 md:w-32"
              >
                <p className="text-xs font-bold text-slate-400 uppercase">
                  {stat.label}
                </p>
                <p className="text-2xl font-black text-slate-800">
                  {stat.count}
                </p>
                <div
                  className={`h-1 w-8 rounded-full mt-2 ${stat.color}`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                {editingId ? (
                  <Edit2 className="text-amber-500" />
                ) : (
                  <PlusCircle className="text-blue-600" />
                )}
                {editingId ? "Edit Lead" : "New Lead"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Lead Name"
                    value={formData.name}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="relative">
                  <Briefcase className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company"
                    value={formData.companyName}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    value={formData.email}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <select
                  className="w-full p-3 bg-slate-50 rounded-xl outline-none font-medium text-slate-600"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Interested">Interested</option>
                  <option value="Converted">Converted</option>
                </select>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${
                    editingId ? "bg-amber-500" : "bg-blue-600 hover:bg-blue-700"
                  } ${loading ? "opacity-50" : ""}`}
                >
                  {editingId ? "Update Lead" : "Create Lead"}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-lg font-bold">All Leads</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                  <input
                    className="pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-sm outline-none"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase">
                        Lead
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase">
                        Status
                      </th>
                      <th className="p-4 text-center text-xs font-bold text-slate-400 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead._id || lead.id}
                        className="border-b hover:bg-slate-50"
                      >
                        <td className="p-4">
                          <p className="font-bold text-slate-800">
                            {lead.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {lead.companyName}
                          </p>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              lead.status === "Converted"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 text-center flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(lead)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(lead._id || lead.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
