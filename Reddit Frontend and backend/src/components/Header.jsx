import { motion } from 'framer-motion';

function Header() {
    return (
        <header className="bg-gray-900 border-b border-gray-800">
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="container mx-auto px-4 py-6"
            >
                <motion.h1
                    className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                >
                    Reddit Bot Detection
                </motion.h1>
            </motion.div>
        </header>
    );
}

export default Header; 