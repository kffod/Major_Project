import { motion } from 'framer-motion';
import { useState } from 'react';
import { API_ENDPOINTS } from '../config';

function FeedbackAndReport({ userData, onFeedback }) {
    const [feedbackType, setFeedbackType] = useState(null);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [reportContent, setReportContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedbackType) return;

        setIsSubmitting(true);
        try {
            await onFeedback(feedbackType, comment);
            setFeedbackType(null);
            setComment('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateReport = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.GENERATE_REPORT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userData }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate report');
            }

            const data = await response.json();
            setReportContent(data.report);
            setShowReport(true);
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Failed to generate report. Please try again.');
        }
    };

    const downloadReport = () => {
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bot-report-${userData.screen_name}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="space-y-6">
            {!feedbackType && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-lg p-6 shadow-lg border border-purple-500/20"
                >
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Provide Feedback</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Was this prediction accurate?
                            </label>
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setFeedbackType('accurate')}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        feedbackType === 'accurate'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    Yes, Accurate
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFeedbackType('inaccurate')}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        feedbackType === 'inaccurate'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    No, Inaccurate
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                                Additional Comments (Optional)
                            </label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                rows="3"
                                placeholder="Share your thoughts about the prediction..."
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={!feedbackType || isSubmitting}
                            className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                'Submit Feedback'
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            )}

            {showReport && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-lg p-6"
                >
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Detailed Analysis Report</h3>
                    <div className="bg-gray-700 rounded-lg p-4 mb-4">
                        <pre className="whitespace-pre-wrap text-gray-300">{reportContent}</pre>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={downloadReport}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Download Report
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}

export default FeedbackAndReport; 