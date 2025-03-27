import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer
} from 'recharts';

export function UserComparison({ userData }) {
    // Calculate additional metrics
    const accountAge = Math.floor((Date.now()/1000 - userData.cake_day) / (24 * 60 * 60));
    const karmaPerDay = Math.round(userData.listed_count / accountAge);
    const postRatio = (userData.post_karma / userData.listed_count) * 100;
    const commentRatio = (userData.comment_karma / userData.listed_count) * 100;

    // Prepare data for radar chart
    const radarData = [
        { metric: 'Post Karma', value: userData.post_karma / 1000 },
        { metric: 'Comment Karma', value: userData.comment_karma / 1000 },
        { metric: 'Total Karma', value: userData.listed_count / 1000 },
        { metric: 'Karma/Day', value: karmaPerDay },
        { metric: 'Post Ratio', value: postRatio },
        { metric: 'Comment Ratio', value: commentRatio }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20"
        >
            <h3 className="text-2xl font-bold text-purple-400 mb-8 flex items-center gap-2">
                <span>📈</span> Advanced Analytics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Radar Chart */}
                <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/10">
                    <h4 className="text-lg font-semibold text-purple-300 mb-4">Activity Distribution</h4>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="#374151" />
                                <PolarAngleAxis
                                    dataKey="metric"
                                    stroke="#A855F7"
                                    tick={{ fill: '#E5E7EB' }}
                                />
                                <PolarRadiusAxis
                                    stroke="#A855F7"
                                    tick={{ fill: '#E5E7EB' }}
                                />
                                <Radar
                                    name="Metrics"
                                    dataKey="value"
                                    stroke="#A855F7"
                                    fill="#A855F7"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/10">
                        <h4 className="text-lg font-semibold text-purple-300 mb-4">Account Statistics</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Account Age</span>
                                <span className="text-purple-300 font-semibold">{accountAge} days</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Karma per Day</span>
                                <span className="text-purple-300 font-semibold">{karmaPerDay}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Post Ratio</span>
                                <span className="text-purple-300 font-semibold">{postRatio.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Comment Ratio</span>
                                <span className="text-purple-300 font-semibold">{commentRatio.toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/10">
                        <h4 className="text-lg font-semibold text-purple-300 mb-4">Achievement Analysis</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏆</span>
                                <span className="text-gray-400">Total Achievements</span>
                                <span className="text-purple-300 font-semibold ml-auto">{userData.achievements.length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏅</span>
                                <span className="text-gray-400">Total Trophies</span>
                                <span className="text-purple-300 font-semibold ml-auto">{userData.trophy_case.length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✓</span>
                                <span className="text-gray-400">Verification Status</span>
                                <span className={`font-semibold ml-auto ${userData.verified ? 'text-green-400' : 'text-red-400'}`}>
                                    {userData.verified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Insights */}
            <div className="mt-8 bg-gray-900/50 rounded-xl p-4 border border-purple-500/10">
                <h4 className="text-lg font-semibold text-purple-300 mb-4">Activity Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p className="text-gray-400">
                            This account has been active for <span className="text-purple-300">{accountAge}</span> days,
                            averaging <span className="text-purple-300">{karmaPerDay}</span> karma points per day.
                        </p>
                        <p className="text-gray-400">
                            The user primarily engages through <span className="text-purple-300">
                                {postRatio > commentRatio ? 'posts' : 'comments'}
                            </span>, with a {postRatio > commentRatio ? 'post' : 'comment'}-to-{postRatio > commentRatio ? 'comment' : 'post'} ratio of{' '}
                            <span className="text-purple-300">{postRatio > commentRatio ? (postRatio / commentRatio).toFixed(1) : (commentRatio / postRatio).toFixed(1)}:1</span>.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-400">
                            With <span className="text-purple-300">{userData.achievements.length}</span> achievements and{' '}
                            <span className="text-purple-300">{userData.trophy_case.length}</span> trophies, this account shows{' '}
                            <span className="text-purple-300">{userData.verified ? 'verified' : 'unverified'}</span> status.
                        </p>
                        <p className="text-gray-400">
                            The account's total karma of <span className="text-purple-300">{userData.listed_count.toLocaleString()}</span> places it in the{' '}
                            <span className="text-purple-300">{userData.listed_count > 1000000 ? 'top tier' : userData.listed_count > 100000 ? 'high tier' : 'mid tier'}</span> of Reddit users.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

UserComparison.propTypes = {
    userData: PropTypes.shape({
        post_karma: PropTypes.number.isRequired,
        comment_karma: PropTypes.number.isRequired,
        listed_count: PropTypes.number.isRequired,
        cake_day: PropTypes.number.isRequired,
        achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
        trophy_case: PropTypes.arrayOf(PropTypes.string).isRequired,
        verified: PropTypes.bool.isRequired
    }).isRequired
}; 