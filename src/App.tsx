import { useEffect, useState } from "react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Work from "./Work";
import ProjectPage from "./ProjectPage";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu and return to the top whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="navbar">
        <div className="navbar-brand">
          <NavLink to="/">Annie Wang</NavLink>
        </div>

        <button
          className={`hamburger ${menuOpen ? "rotated" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/">home</NavLink>
          <NavLink to="/work">work</NavLink>
        </nav>
      </header>

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          {/* The old URL is in the wild; keep it working. */}
          <Route path="/projects" element={<Navigate to="/work" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
