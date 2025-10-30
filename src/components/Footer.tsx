import { StarIcon } from "@heroicons/react/24/outline";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 pt-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-row justify-between items-center gap-4">
        <span className="flex gap-2 items-center">
          <StarIcon className="w-6 h-6 text-yellow-400 hover:scale-125 transition-transform duration-200" />
          <p className="font-bold text-lg text-gray-800 hover:text-yellow-500 transition-colors">
            Savvy Tech
          </p>
        </span>

        <p className="text-xs text-gray-400 text-center max-md:hidden">
          &copy; {new Date().getFullYear()} Savvy Tech.
        </p>

        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
