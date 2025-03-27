import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            
            <div className="relative container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Reddit Bot Detector
                    </h1>
                        <span className="text-5xl md:text-6xl">🤖</span>
                    </div>
                    <p className="text-xl text-gray-300 mb-8">
                        Advanced AI-powered analysis to detect bot accounts on Reddit with high accuracy
                    </p>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/bot-checker')}
                        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full 
                                 font-semibold text-lg shadow-lg shadow-purple-500/30 transition-colors"
                    >
                        Start Checking 🔍
                    </motion.button>
                </motion.div>

                {/* Bot Impact in India Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-20 mb-16"
                >
                    <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                        Bot Impact in India 🇮🇳
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg border border-orange-500/20"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-orange-400">📱 Social Media Impact</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-center space-x-2">
                                    <span className="text-orange-400">•</span>
                                    <span>Over 50% increase in bot-driven misinformation</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-orange-400">•</span>
                                    <span>Significant influence on trending topics</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-orange-400">•</span>
                                    <span>Manipulation of public opinion</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg border border-orange-500/20"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-orange-400">💰 Economic Impact</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-center space-x-2">
                                    <span className="text-orange-400">•</span>
                                    <span>₹500+ Crore annual loss from cyber fraud</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-orange-400">•</span>
                                    <span>Rise in automated financial scams</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-orange-400">•</span>
                                    <span>Threats to digital privacy & security</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Prevention Measures Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
                        Prevention Measures 🛡️
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="p-6 bg-gray-800 rounded-lg shadow-lg border border-green-500/20"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-green-400">🔍 Early Detection</h3>
                            <p className="text-gray-300">Use our AI-powered tool to identify bot accounts before they cause harm</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="p-6 bg-gray-800 rounded-lg shadow-lg border border-green-500/20"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-green-400">📊 Data Analysis</h3>
                            <p className="text-gray-300">Monitor account behavior patterns and activity metrics</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="p-6 bg-gray-800 rounded-lg shadow-lg border border-green-500/20"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-green-400">🛡️ Community Protection</h3>
                            <p className="text-gray-300">Protect your community from automated threats and misinformation</p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Features Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Why Choose Our Bot Detector? ✨
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="p-6 bg-gray-800 rounded-lg shadow-lg border border-purple-500/20"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-purple-400">🤖 Advanced AI Technology</h3>
                            <p className="text-gray-300">Powered by cutting-edge machine learning algorithms for accurate bot detection</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="p-6 bg-gray-800 rounded-lg shadow-lg border border-purple-500/20"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-purple-400">⚡ Real-time Analysis</h3>
                            <p className="text-gray-300">Instant scanning and detection of suspicious bot activities</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="p-6 bg-gray-800 rounded-lg shadow-lg border border-purple-500/20"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-purple-400">📊 Detailed Reports</h3>
                            <p className="text-gray-300">Comprehensive analysis and behavioral patterns in downloadable reports</p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Footer Section */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-16 pt-8 border-t border-gray-700"
                >
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">ℹ️ About Us</h3>
                            <p className="text-gray-300">Surakshit Bot Detector is dedicated to protecting online communities through advanced AI-powered bot detection technology.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">🔗 Quick Links</h3>
                            <ul className="space-y-2 text-gray-300">
                                <motion.li whileHover={{ x: 10 }}><a href="/" className="hover:text-purple-400 transition-colors">Home</a></motion.li>
                                <motion.li whileHover={{ x: 10 }}><a href="/bot-checker" className="hover:text-purple-400 transition-colors">Check Bot</a></motion.li>
                                <motion.li whileHover={{ x: 10 }}><a href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</a></motion.li>
                                <motion.li whileHover={{ x: 10 }}><a href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</a></motion.li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">🌐 Connect With Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://twitter.com" className="text-gray-300 hover:text-purple-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                                </a>
                                <a href="https://linkedin.com" className="text-gray-300 hover:text-purple-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                </a>
                                <a href="https://github.com" className="text-gray-300 hover:text-purple-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                </a>
                            </div>
                        </div>
                </div>
                    <p className="text-center text-gray-400 text-sm">&copy; 2024 Surakshit Bot Detector. All rights reserved.</p>
                </motion.footer>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-colors"
        >
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-2xl mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </motion.div>
    );
} 