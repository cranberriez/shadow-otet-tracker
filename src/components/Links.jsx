import { FaGithub } from 'react-icons/fa';
import './links.css';

function Links() {
    return (
        <div className="links">
            <a href="https://github.com/cranberriez/shadow-otet-tracker" target="_blank" rel="noopener noreferrer">
                <FaGithub />
            </a>
        </div>
    );
}

export default Links;
