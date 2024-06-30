import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import './links.css';

function Links({ isMobileSidebarOpen, toggleMobileSidebar }) {
    return (
        <div className="links">
            <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer">
                <FaGithub />
            </a>
        </div>
    );
}

export default Links;
