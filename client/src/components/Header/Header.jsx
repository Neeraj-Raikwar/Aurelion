import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  // Tracks whether the mobile menu is currently open.
  // false = closed (default), true = open.
  const [menuOpen, setMenuOpen] = useState(false);

  // Clicking a nav link on mobile should also close the menu,
  // otherwise it stays open after navigating to the new page.
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={closeMenu}>AURELION</Link>

      {/* The hamburger icon — only visible on mobile (see Header.css).
          Clicking it flips menuOpen between true/false. */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* We add the "open" class conditionally based on menuOpen.
          On desktop this class doesn't matter (nav is always visible via CSS).
          On mobile, .nav is hidden by default and only shown when "open" is present. */}
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/collection" onClick={closeMenu}>Collection</Link>
        <Link to="/#movement" onClick={closeMenu}>Movement</Link>
        <Link to="/product/obscura" onClick={closeMenu}>Obscura</Link>
        {/* Reserve is included inside the mobile menu too, so it's
            reachable even when the desktop-only button is hidden. */}
        <Link to="/product/obscura" className="reserve-btn-mobile" onClick={closeMenu}>Reserve</Link>
      </nav>

      <Link to="/product/obscura" className="reserve-btn">Reserve</Link>
    </header>
  );
}

export default Header;
