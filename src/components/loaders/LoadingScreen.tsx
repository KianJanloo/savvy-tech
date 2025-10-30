import { motion } from "framer-motion";
import savvyLogo from "../../assets/react.svg";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={savvyLogo}
        alt="SavvyTech Logo"
        className="w-20 h-20 mb-4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300"
      >
        SavvyTech Frontend
      </motion.h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
        Crafted with ❤️
      </p>
    </motion.div>
  );
};

export default LoadingScreen;
