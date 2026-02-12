import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  leads: JSON.parse(localStorage.getItem("leads")) || [],
  students: JSON.parse(localStorage.getItem("students")) || [],
  auth: JSON.parse(localStorage.getItem("auth")) || null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    login: (state, action) => {
      state.auth = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.auth = null;
      localStorage.removeItem("auth");
    },

    addStudent: (state, action) => {
      state.students.push(action.payload);
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    updateStudent: (state, action) => {
      const ind = state.students.findIndex((s) => s.id === action.payload.id);
      if (ind !== -1) state.students[ind] = action.payload;
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
      localStorage.setItem("students", JSON.stringify(state.students));
    },

    addLead: (state, action) => {
      state.leads.push(action.payload);
      localStorage.setItem("leads", JSON.stringify(state.leads));
    },
    updateLead: (state, action) => {
      const index = state.leads.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) state.leads[index] = action.payload;
      localStorage.setItem("leads", JSON.stringify(state.leads));
    },
    deleteLead: (state, action) => {
      state.leads = state.leads.filter((l) => l.id !== action.payload);
      localStorage.setItem("leads", JSON.stringify(state.leads));
    },
  },
});

export const {
  signup,
  login,
  logout,
  addStudent,
  updateStudent,
  deleteStudent,
  addLead,
  updateLead,
  deleteLead,
} = dataSlice.actions;

export default dataSlice.reducer;
