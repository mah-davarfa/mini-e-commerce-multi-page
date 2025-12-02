
import { FaRoute, FaLock, FaDatabase, FaClock, FaBug, FaSmile } from "react-icons/fa";

export default function Footer () {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>Mini E-Commerce App</h4>
          <p>Built with React Router, Context, and clean side-effects.</p>
        </div>

        <ul className="footer-col checklist">
          <li><FaRoute /> Multi-page routing with nested layouts</li>
          <li><FaLock /> Protected route for checkout flow</li>
          <li><FaDatabase /> Data fetching via FakeStore API</li>
          <li><FaClock /> Effect cleanup + timeout management</li>
          <li><FaBug /> Error + loading states per page</li>
          <li><FaSmile /> LocalStorage carts & login merge</li>
        </ul>

        <div className="footer-col tiny">
          <p>API: fakestoreapi.com</p>
          <p>© {new Date().getFullYear()} Mahmoud Davarfara</p>
        </div>
      </div>
    </footer>
  );
}