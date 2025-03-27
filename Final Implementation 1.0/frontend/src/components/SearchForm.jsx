import { motion } from 'framer-motion';
import { useState } from 'react';

const SearchForm = ({ onSearch, isLoading }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onSearch(username.trim());
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-8"
        >
            <div className="flex gap-2">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Reddit username 🔍"
                    className="flex-1 px-4 py-2 rounded bg-gray-800 border border-purple-500/30 focus:border-purple-500 focus:outline-none"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !username.trim()}
                    className={`px-6 py-2 rounded bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isLoading ? '🔍 Checking...' : '🔍 Check'}
                </button>
            </div>
        </motion.form>
    );
};

export default SearchForm; 