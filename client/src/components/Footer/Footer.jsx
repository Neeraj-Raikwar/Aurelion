import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>AURELION</h2>
          <p className="tagline">Precision, Worn Quietly</p>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <p className="column-title">Explore</p>
            <Link to="/collection">The Collection</Link>
            <Link to="/product/obscura">Obscura</Link>
            <Link to="/product/obscura">Reserve a Consultation</Link>
          </div>

          <div className="footer-column">
            <p className="column-title">Connect</p>
            <a href="mailto:atelier@aurelion.com">atelier@aurelion.com</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>

          <div className="footer-column">
            <p className="column-title">Legal</p>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className="footer-statement">
        <p>Crafted for the hours that matter most.</p>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Aurelion. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
