import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const COLORS = ['#A855F7', '#EC4899', '#8B5CF6', '#D946EF'];

export function UserCharts({ userData }) {
    // Prepare data for karma distribution chart
    const karmaData = [
        { name: 'Post Karma', value: userData.post_karma },
        { name: 'Comment Karma', value: userData.comment_karma }
    ];

    // Prepare data for activity metrics
    const activityData = [
        { name: 'Total Activity', value: userData.listed_count },
        { name: 'Post/Comment Ratio', value: (userData.post_karma / (userData.comment_karma || 1)).toFixed(2) },
        { name: 'Account Age (days)', value: Math.floor((Date.now()/1000 - userData.cake_day) / (24 * 60 * 60)) }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20"
        >
            <h3 className="text-2xl font-bold text-purple-400 mb-8 flex items-center gap-2">
                <span>📊</span> Activity Analytics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Karma Distribution Pie Chart */}
                <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/10">
                    <h4 className="text-lg font-semibold text-purple-300 mb-4">Karma Distribution</h4>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={karmaData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {karmaData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #A855F7',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    formatter={(value) => [`${value}`, '']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Activity Metrics Bar Chart */}
                <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/10">
                    <h4 className="text-lg font-semibold text-purple-300 mb-4">Activity Metrics</h4>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#A855F7"
                                    tick={{ fill: '#E5E7EB' }}
                                />
                                <YAxis
                                    stroke="#A855F7"
                                    tick={{ fill: '#E5E7EB' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #A855F7',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    formatter={(value) => [`${value}`, '']}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#A855F7"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Additional Metrics */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/10">
                    <p className="text-sm text-gray-400 mb-1">Total Karma</p>
                    <p className="text-2xl font-bold text-purple-300">{userData.listed_count}</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/10">
                    <p className="text-sm text-gray-400 mb-1">Post/Comment Ratio</p>
                    <p className="text-2xl font-bold text-purple-300">
                        {(userData.post_karma / (userData.comment_karma || 1)).toFixed(2)}
                    </p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/10">
                    <p className="text-sm text-gray-400 mb-1">Account Age</p>
                    <p className="text-2xl font-bold text-purple-300">
                        {Math.floor((Date.now()/1000 - userData.cake_day) / (24 * 60 * 60))} days
                    </p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/10">
                    <p className="text-sm text-gray-400 mb-1">Activity Level</p>
                    <p className="text-2xl font-bold text-purple-300">
                        {userData.listed_count > 1000 ? 'High' : 'Low'}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

UserCharts.propTypes = {
    userData: PropTypes.shape({
        post_karma: PropTypes.number.isRequired,
        comment_karma: PropTypes.number.isRequired,
        listed_count: PropTypes.number.isRequired,
        cake_day: PropTypes.number.isRequired
    }).isRequired
}; 