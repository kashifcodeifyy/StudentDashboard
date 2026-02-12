import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/Auth";
import StudentForm from "./pages/StudentForm";
import LeadForm from "./pages/LeadForm";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
function App() {
  const auth = useSelector((state) => state.data.auth);
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      {auth && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={<Navigate to={auth ? "/dashboard" : "/signin"} />}
        />

        <Route path="/signup" element={<AuthPage isSignup={true} />} />
        <Route path="/signin" element={<AuthPage isSignup={false} />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<LeadForm />} />
          <Route path="/students" element={<StudentForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
