import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
// Custom CSS overrides (must be after bootstrap)
import "./styles/main.css";

// Components
import AppNavbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Activities from "./pages/Activities";
import Contact from "./pages/Contact";
import Forona from "./pages/Forona";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForonaExecutives from "./pages/ForonaExecutives";
import AdminDashboard from "./pages/AdminDashboard";
import MemberDirectory from "./pages/MemberDirectory";

import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

function App() {
  console.log("App Component: Rendering...");
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          {/* Navbar shows on all pages */}
          <AppNavbar />
          {console.log("App: Navbar rendered")}
          <main style={{ minHeight: '80vh' }}>
            <Routes>
              {console.log("App: Routes rendering")}
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/forona" element={<Forona />} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected/Private Routes */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/forona-executives" element={<ForonaExecutives />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/member-directory" element={<MemberDirectory />} />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;