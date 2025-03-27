import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchForm from '../components/SearchForm';
import UserCard from '../components/UserCard';
import ErrorMessage from '../components/ErrorMessage';
import BotPrediction from '../components/BotPrediction';
import { UserCharts } from '../components/UserCharts';
import { UserComparison } from '../components/UserComparison';
import { api } from '../services/api';
import { generatePDFReport } from '../utils/generatePDF';

export function BotCheckerPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [feedbackComment, setFeedbackComment] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    const handleSubmit = async (username) => {
        if (!username.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/api/predict', { screen_name: username });
            setUserData(response.data);
            setShowFeedback(true);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    const handleFeedback = async (type) => {
        try {
            await api.post('/api/feedback', {
                username: userData.screen_name,
                feedback: type,
                comment: feedbackComment,
                prediction: userData.is_bot
            });
            alert('Feedback submitted successfully!');
            setShowFeedback(false);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert(error.response?.data?.error || 'Failed to submit feedback');
        }
    };

    const handleDownloadReport = () => {
        try {
            generatePDFReport(userData);
        } catch (error) {
            console.error('Error generating PDF report:', error);
            alert('Failed to generate PDF report');
        }
    };

    const handleSubmitFeedback = () => {
        handleFeedback(feedback);
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-purple-400 mb-4">
                        Reddit Bot Detector 🔍
                    </h1>
                    <p className="text-xl text-gray-300">
                        Enter a Reddit username to analyze their account 🤖
                    </p>
                </motion.div>

                <SearchForm onSearch={handleSubmit} isLoading={loading} />

                {error && <ErrorMessage message={error} />}

                {userData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <UserCard user={userData} />
                        <BotPrediction isBot={userData.is_bot} />
                        <UserCharts userData={userData} />
                        <UserComparison userData={userData} />
                        
                        <div className="flex justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDownloadReport}
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full 
                                         font-semibold text-lg shadow-lg shadow-purple-500/30 transition-all
                                         hover:shadow-purple-500/50 flex items-center gap-2"
                            >
                                <span className="text-xl">📊</span> Download Report
                            </motion.button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20"
                        >
                            <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                                <span>🤔</span> Was this prediction helpful?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setFeedback(true)}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl
                                                     transition-all ${feedback === true 
                                                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                                                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                                        >
                                            👍
                                        </button>
                                        <button
                                            onClick={() => setFeedback(false)}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl
                                                     transition-all ${feedback === false 
                                                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                                                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                                        >
                                            👎
                                        </button>
                                    </div>
                                    <textarea
                                        value={feedbackComment}
                                        onChange={(e) => setFeedbackComment(e.target.value)}
                                        placeholder="Tell us more about your experience..."
                                        className="w-full h-32 bg-gray-700/50 rounded-xl p-4 text-white placeholder-gray-400
                                                 border border-purple-500/10 focus:border-purple-500/30 focus:ring-2 
                                                 focus:ring-purple-500/20 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col justify-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSubmitFeedback}
                                        disabled={feedback === null}
                                        className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all
                                                 ${feedback === null 
                                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                                    : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg shadow-purple-500/30'}`}
                                    >
                                        Submit Feedback
                                    </motion.button>
                                    <p className="text-sm text-gray-400 text-center">
                                        Your feedback helps us improve our detection accuracy
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
} 