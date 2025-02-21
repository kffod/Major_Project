import { motion } from 'framer-motion';

function UserCard({ user }) {
    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-xl p-6 shadow-xl"
        >
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <InfoItem label="Username" value={user.screen_name} />
                    <InfoItem label="Cake Day" value={formatDate(user.cake_day)} />
                    <InfoItem label="Post Karma" value={user.post_karma.toLocaleString()} />
                    <InfoItem label="Comment Karma" value={user.comment_karma.toLocaleString()} />
                </div>

                <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-medium mb-2">Achievements</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.achievements.map((achievement, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                                {achievement}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-medium mb-2">Trophy Case</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.trophy_case.map((trophy, index) => (
                            <span key={index} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                                {trophy}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function InfoItem({ label, value }) {
    return (
        <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400">{label}</div>
            <div className="font-medium mt-1">{value}</div>
        </div>
    );
}

export default UserCard; 