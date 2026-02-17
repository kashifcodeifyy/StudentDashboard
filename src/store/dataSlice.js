import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiStudents = axios.create({ baseURL: "/api/students" });
const apiLeads = axios.create({ baseURL: "/api/leads" });
const apiAuth = axios.create({ baseURL: "/api/auth" });

const getAuthConfig = (getState) => {
  const token = getState().data.auth?.token;
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const signupAsync = createAsyncThunk(
  "data/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiAuth.post("/signup", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "data/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiAuth.post("/login", credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// --- STUDENTS ---
export const fetchStudents = createAsyncThunk(
  "data/fetchStudents",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await apiStudents.get("/", getAuthConfig(getState));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addStudentAsync = createAsyncThunk(
  "data/addStudent",
  async (studentData, { getState, rejectWithValue }) => {
    try {
      const response = await apiStudents.post(
        "/",
        studentData,
        getAuthConfig(getState)
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const updateStudentAsync = createAsyncThunk(
  "data/updateStudent",
  async ({ id, ...data }, { getState, rejectWithValue }) => {
    try {
      const response = await apiStudents.put(
        `/${id}`,
        data,
        getAuthConfig(getState)
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "data/deleteStudent",
  async (id, { getState, rejectWithValue }) => {
    try {
      await apiStudents.delete(`/${id}`, getAuthConfig(getState));
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// --- LEADS ---
export const fetchLeads = createAsyncThunk(
  "data/fetchLeads",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await apiLeads.get("/", getAuthConfig(getState));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addLeadAsync = createAsyncThunk(
  "data/addLead",
  async (leadData, { getState, rejectWithValue }) => {
    try {
      const response = await apiLeads.post(
        "/",
        leadData,
        getAuthConfig(getState)
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const updateLeadAsync = createAsyncThunk(
  "data/updateLead",
  async ({ id, ...data }, { getState, rejectWithValue }) => {
    try {
      const response = await apiLeads.put(
        `/${id}`,
        data,
        getAuthConfig(getState)
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteLeadAsync = createAsyncThunk(
  "data/deleteLead",
  async (id, { getState, rejectWithValue }) => {
    try {
      await apiLeads.delete(`/${id}`, getAuthConfig(getState));
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    auth: JSON.parse(localStorage.getItem("auth")) || null,
    leads: [],
    students: [],
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.auth = null;
      localStorage.removeItem("auth");
    },
    clearError: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
        localStorage.setItem("auth", JSON.stringify(action.payload));
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.students.unshift(action.payload);
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (s) => (s._id || s.id) === (action.payload._id || action.payload.id)
        );
        if (index !== -1) state.students[index] = action.payload;
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (s) => (s._id || s.id) !== action.payload
        );
      })
      // Leads
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addLeadAsync.fulfilled, (state, action) => {
        state.leads.unshift(action.payload);
      })
      .addCase(updateLeadAsync.fulfilled, (state, action) => {
        const index = state.leads.findIndex(
          (l) => (l._id || l.id) === (action.payload._id || action.payload.id)
        );
        if (index !== -1) state.leads[index] = action.payload;
      })
      .addCase(deleteLeadAsync.fulfilled, (state, action) => {
        state.leads = state.leads.filter(
          (l) => (l._id || l.id) !== action.payload
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout, clearError } = dataSlice.actions;
export default dataSlice.reducer;
