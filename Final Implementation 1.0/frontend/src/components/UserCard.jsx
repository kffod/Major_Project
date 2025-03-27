import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function UserCard({ user }) {
    const calculateAccountAge = (timestamp) => {
        const now = Math.floor(Date.now() / 1000);
        const ageInSeconds = now - timestamp;
        const ageInDays = Math.floor(ageInSeconds / (24 * 60 * 60));
        return ageInDays;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-purple-500/20 backdrop-blur-sm"
        >
            <div className="flex items-center space-x-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-3xl">👤</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        {user.name}
                    </h2>
                    <p className="text-gray-400 text-lg">u/{user.screen_name}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-purple-500/10"
                >
                    <p className="text-sm text-gray-400 mb-1">📝 Post Karma</p>
                    <p className="text-2xl font-bold text-white">{user.post_karma}</p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-purple-500/10"
                >
                    <p className="text-sm text-gray-400 mb-1">💬 Comment Karma</p>
                    <p className="text-2xl font-bold text-white">{user.comment_karma}</p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-purple-500/10"
                >
                    <p className="text-sm text-gray-400 mb-1">📊 Total Activity</p>
                    <p className="text-2xl font-bold text-white">{user.listed_count}</p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-purple-500/10"
                >
                    <p className="text-sm text-gray-400 mb-1">🎂 Account Age</p>
                    <p className="text-2xl font-bold text-white">
                        {calculateAccountAge(user.cake_day)} days
                    </p>
                </motion.div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                        <span className="mr-2">🏆</span> Achievements
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {user.achievements.map((achievement, index) => (
                            <motion.span
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm backdrop-blur-sm border border-purple-500/10"
                            >
                                {achievement}
                            </motion.span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                        <span className="mr-2">🏅</span> Trophies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {user.trophy_case.map((trophy, index) => (
                            <motion.span
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm backdrop-blur-sm border border-purple-500/10"
                            >
                                {trophy}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {user.verified && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-green-500/20"
                    >
                        <span className="text-xl">✓</span>
                        <span className="font-medium">Verified Account</span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

UserCard.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        screen_name: PropTypes.string.isRequired,
        post_karma: PropTypes.number.isRequired,
        comment_karma: PropTypes.number.isRequired,
        listed_count: PropTypes.number.isRequired,
        cake_day: PropTypes.number.isRequired,
        achievements: PropTypes.arrayOf(PropTypes.string),
        trophy_case: PropTypes.arrayOf(PropTypes.string),
        verified: PropTypes.bool
    }).isRequired
};

export default UserCard; 