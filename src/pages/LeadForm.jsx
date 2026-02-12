import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLead, updateLead, deleteLead } from "../store/dataSlice";
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

  const leads = useSelector((state) => state.data.leads);
  const dispatch = useDispatch();

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateLead({ id: editingId, ...formData }));
      toast.success("Lead updated");
      setEditingId(null);
    } else {
      dispatch(addLead({ id: Date.now(), ...formData }));
      toast.success("New lead ");
    }
    setFormData(initialForm);
  };

  const stats = [
    { label: "Total Leads", count: leads.length, color: "bg-blue-500" },
    {
      label: "Converted",
      count: leads.filter((l) => l.status === "Converted").length,
      color: "bg-green-500",
    },
    {
      label: "Pending",
      count: leads.filter((l) => l.status === "Pending").length,
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
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl shadow-sm border flex-1 md:w-32"
              >
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
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
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                {editingId ? (
                  <Edit2 className="text-amber-500" />
                ) : (
                  <PlusCircle className="text-blue-600" />
                )}
                {editingId ? "Edit Lead Details" : "Capture New Lead"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Company"
                    value={formData.companyName}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
                    <input
                      type="email"
                      className="w-full pl-9 pr-3 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Email"
                      value={formData.email}
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
                    <input
                      className="w-full pl-9 pr-3 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <select
                  className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-600"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Pending"> Pending</option>
                  <option value="Contacted"> Contacted</option>
                  <option value="Interested"> Interested</option>
                  <option value="Converted">Converted</option>
                </select>

                <button
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 active:scale-95
                  ${
                    editingId
                      ? "bg-amber-500 shadow-amber-200"
                      : "bg-blue-600 shadow-blue-200 hover:bg-blue-700"
                  }`}
                >
                  {editingId ? "Save Changes" : "Create Opportunity"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData(initialForm);
                    }}
                    className="w-full text-slate-400 text-sm font-semibold hover:text-slate-600 transition"
                  >
                    Discard Changes
                  </button>
                )}
              </form>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-800">
                  Leads Listing
                </h3>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                  <input
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Search leads or companies..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="p-5 text-xs font-bold text-slate-400 uppercase">
                        Information
                      </th>
                      <th className="p-5 text-xs font-bold text-slate-400 uppercase">
                        Status
                      </th>
                      <th className="p-5 text-xs font-bold text-slate-400 uppercase text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="group hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                              {lead.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 leading-tight">
                                {lead.name}
                              </p>
                              <p className="text-xs text-slate-400 flex items-center gap-1">
                                <Briefcase size={12} /> {lead.companyName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5">
                          <span
                            className={`px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5
                            ${
                              lead.status === "Converted"
                                ? "bg-green-100 text-green-700"
                                : lead.status === "Pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-indigo-100 text-indigo-700"
                            }`}
                          >
                            {lead.status === "Converted" && (
                              <CheckCircle size={12} />
                            )}
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-5">
                          <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEdit(lead)}
                              className="p-2 bg-white shadow-sm border rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => {
                                dispatch(deleteLead(lead.id));
                                toast.error("Lead removed");
                              }}
                              className="p-2 bg-white shadow-sm border rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredLeads.length === 0 && (
                  <div className="p-20 text-center">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="text-slate-200 w-10 h-10" />
                    </div>
                    <p className="text-slate-400 font-medium">
                      Not found "{searchTerm}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
