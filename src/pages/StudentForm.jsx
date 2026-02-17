import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  addStudentAsync,
  updateStudentAsync,
  deleteStudentAsync,
} from "../store/dataSlice";
import {
  User,
  Mail,
  BookOpen,
  PlusCircle,
  Edit2,
  Trash2,
  Search,
  GraduationCap,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const StudentForm = () => {
  const initialForm = {
    name: "",
    email: "",
    course: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { students, loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const safeStudents = Array.isArray(students) ? students : [];

  const filteredStudents = safeStudents.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Student record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete student!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStudentAsync(id));
        Swal.fire("Deleted!", "Record has been removed.", "success");
      }
    });
  };

  const startEdit = (student) => {
    // MongoDB ki _id ya standard id dono ko support karne ke liye
    const id = student._id || student.id;
    setEditingId(id);
    setFormData({
      name: student.name || "",
      email: student.email || "",
      course: student.course || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      try {
        // .unwrap() use karne se error handling behtar ho jati hai
        await dispatch(
          updateStudentAsync({ id: editingId, ...formData })
        ).unwrap();
        toast.success("Student updated successfully");
        setEditingId(null);
        setFormData(initialForm);
      } catch (error) {
        toast.error(error || "Failed to update student");
      }
    } else {
      try {
        await dispatch(addStudentAsync(formData)).unwrap();
        toast.success("Student added successfully");
        setFormData(initialForm);
      } catch (error) {
        toast.error(error || "Failed to add student");
      }
    }
  };

  return (
    <div className="p-4 md:p-10 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
              <GraduationCap className="text-indigo-600 w-10 h-10" />
              Students Portal
            </h1>
            {loading && (
              <p className="text-indigo-500 text-sm animate-pulse mt-1 font-medium">
                Processing Request...
              </p>
            )}
          </div>
          <div className="hidden md:flex flex-col items-end bg-white px-6 py-2 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Total Enrolled
            </span>
            <span className="text-2xl font-black text-slate-800">
              {safeStudents.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Card */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                {editingId ? (
                  <Edit2 className="text-amber-500" />
                ) : (
                  <PlusCircle className="text-indigo-600" />
                )}
                {editingId ? "Edit Student Info" : "Register Student"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Full Name"
                    value={formData.name}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Email Address"
                    value={formData.email}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="relative">
                  <BookOpen className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Enrolled Course"
                    value={formData.course}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 transform ${
                    editingId
                      ? "bg-amber-500 shadow-amber-200 hover:bg-amber-600"
                      : "bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {editingId ? "Save Changes" : "Confirm Admission"}
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
                    Discard Edit
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Table Card */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-800">
                  Database Records
                </h3>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                  <input
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Quick search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Student Details
                      </th>
                      <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="p-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr
                          key={student._id || student.id}
                          className="hover:bg-indigo-50/30 transition-colors group"
                        >
                          <td className="p-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                {student.name?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 leading-tight">
                                  {student.name}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {student.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-5">
                            <span className="px-3 py-1 bg-white border border-slate-100 text-slate-600 rounded-lg text-xs font-bold shadow-sm">
                              {student.course}
                            </span>
                          </td>
                          <td className="p-5">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => startEdit(student)}
                                className="p-2 bg-white shadow-sm border border-slate-100 rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110"
                                title="Edit Record"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(student._id || student.id)
                                }
                                className="p-2 bg-white shadow-sm border border-slate-100 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                                title="Delete Record"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="p-20 text-center">
                          <div className="flex flex-col items-center gap-2 text-slate-300">
                            <Search size={40} className="opacity-20" />
                            <p className="text-sm font-medium">
                              No matching students found
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
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

export default StudentForm;
