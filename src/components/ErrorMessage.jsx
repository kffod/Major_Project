import { motion } from 'framer-motion';

function ErrorMessage({ message }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center"
        >
            {message}
        </motion.div>
    );
}

export default ErrorMessage; 