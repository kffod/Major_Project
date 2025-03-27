import { motion } from 'framer-motion';

function ErrorMessage({ message }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center"
        >
            <div className="flex items-center justify-center space-x-2">
                <svg
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <p className="text-red-400 font-medium">{message}</p>
            </div>
            <p className="text-red-400/80 text-sm mt-2">
                Please try again or check if the username is correct.
            </p>
        </motion.div>
    );
}

export default ErrorMessage; 