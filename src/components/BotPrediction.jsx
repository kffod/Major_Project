import { motion } from 'framer-motion';

function BotPrediction({ isBot, onReport }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-8 text-center"
        >
            <motion.div
                className={`inline-block px-6 py-3 rounded-lg ${isBot ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                    }`}
            >
                <p className="text-xl font-medium">
                    {isBot ? 'This account seems to be a bot 🤖' : 'This account does not seem to be a bot 👨🏻'}
                </p>
            </motion.div>

            {isBot && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReport}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Report Bot
                </motion.button>
            )}
        </motion.div>
    );
}

export default BotPrediction; 