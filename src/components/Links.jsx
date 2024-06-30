import { FaGithub } from 'react-icons/fa'; // Import the GitHub icon

function Links() {
    return (
        <div className="links">
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} /> {/* Use the GitHub icon with a size of 30px */}
            </a>
        </div>
    );
}

export default Links;