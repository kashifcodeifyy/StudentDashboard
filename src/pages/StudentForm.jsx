import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent, deleteStudent } from "../store/dataSlice";
import {
  UserPlus,
  Edit2,
  Trash2,
  GraduationCap,
  X,
  Search,
  BookOpen,
  Mail,
  User,
  School,
} from "lucide-react";
import toast from "react-hot-toast";

const StudentForm = () => {
  const initialForm = { name: "", email: "", course: "" };
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const students = useSelector((state) => state.data.students);
  const dispatch = useDispatch();

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateStudent({ id: editingId, ...formData }));
      toast.success("Student updated");
      setEditingId(null);
    } else {
      dispatch(addStudent({ id: Date.now(), ...formData }));
      toast.success("New student");
    }
    setFormData(initialForm);
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
    });
    toast("Editing mode active", { icon: "📝" });
  };

  const stats = [
    { label: "Total Students", count: students.length, color: "bg-indigo-500" },
    {
      label: "Courses Active",
      count: [...new Set(students.map((s) => s.course))].length,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-4 md:p-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
              <GraduationCap className="text-indigo-600 w-10 h-10" />
              Student
            </h1>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl shadow-sm border flex-1 md:w-40"
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
                  <UserPlus className="text-indigo-600" />
                )}
                {editingId ? "Modify " : "New Student"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    placeholder="Course Name"
                    value={formData.course}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                  />
                </div>

                <button
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 active:scale-95
                  ${
                    editingId
                      ? "bg-amber-500 shadow-amber-200"
                      : "bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700"
                  }`}
                >
                  {editingId ? "Update Student" : "Register Student"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData(initialForm);
                    }}
                    className="w-full text-slate-400 text-sm font-semibold hover:text-slate-600 transition flex items-center justify-center gap-1"
                  >
                    <X size={14} /> Cancel
                  </button>
                )}
              </form>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-800">
                  Students Listing
                </h3>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                  <input
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Search students or courses..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="p-5 text-xs font-bold text-slate-400 uppercase">
                        Student
                      </th>
                      <th className="p-5 text-xs font-bold text-slate-400 uppercase">
                        Course
                      </th>
                      <th className="p-5 text-xs font-bold text-slate-400 uppercase text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredStudents.map((s) => (
                      <tr
                        key={s.id}
                        className="group hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                              {s.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 leading-tight">
                                {s.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                {s.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {s.course}
                          </span>
                        </td>
                        <td className="p-5">
                          <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(s)}
                              className="p-2 bg-white shadow-sm border rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => {
                                dispatch(deleteStudent(s.id));
                                toast.error("Student deleted");
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
                {filteredStudents.length === 0 && (
                  <div className="p-20 text-center">
                    <School className="text-slate-200 w-16 h-16 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">
                      Record Not found.
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

export default StudentForm;
