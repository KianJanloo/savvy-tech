import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { getCurrentYear } from "../../utils/getCurrentYear";

function Footer() {
  return (
    <footer className="w-full border-t max-md:fixed bottom-0 left-0 max-md:pb-6 max-md:bg-gray-100 dark:max-md:bg-gray-800 border-gray-300 dark:border-gray-700 pt-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-row justify-between items-center gap-4">
        <span className="flex gap-2 items-center">
          @
          <p className="font-bold text-lg text-gray-800 dark:text-white transition-colors">
            Savvy Tech
          </p>
        </span>

        <p className="text-xs text-gray-400 text-center max-md:hidden">
          &copy; {getCurrentYear()} Savvy Tech.
        </p>

        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 dark:text-white transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 dark:text-white transition-colors"
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
