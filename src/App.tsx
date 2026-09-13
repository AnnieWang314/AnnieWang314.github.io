import { useEffect, useState } from "react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Work from "./Work";
import ProjectPage from "./ProjectPage";
import { pageMeta } from "./seo";
import { BANANA, BananaSeed } from "./banana";
import Bananas from "./Bananas";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [bananaSeed, setBananaSeed] = useState<number | null>(null);

  // A fresh random seed on every page load, set after hydration so the
  // pre-built HTML still matches what React renders first.
  useEffect(() => {
    if (BANANA) setBananaSeed((Math.random() * 2 ** 32) >>> 0);
  }, []);

  // Close the mobile menu, return to the top, and keep the tab title in step
  // with the page whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    document.title = pageMeta(location.pathname).title;
  }, [location.pathname]);

  return (
    <BananaSeed.Provider value={bananaSeed}>
    <div className={BANANA ? "app app--banana" : "app"}>
      <Bananas />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="navbar">
        <div className="navbar-brand">
          <NavLink to="/">{BANANA ? "Banannie Wang" : "Annie Wang"}</NavLink>
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
    </BananaSeed.Provider>
  );
}

export default App;
