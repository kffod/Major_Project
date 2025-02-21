import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import UserCard from './components/UserCard';
import BotPrediction from './components/BotPrediction';
import ErrorMessage from './components/ErrorMessage';

function App() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkUser = async (username) => {
        setLoading(true);
        setError(null);
        setUserData(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ screen_name: username }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'User not found');
            }

            setUserData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong. Try again!');
        } finally {
            setLoading(false);
        }
    };

    const handleReport = () => {
        // Clear user data after reporting
        setUserData(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <SearchForm onSubmit={checkUser} loading={loading} />

                <AnimatePresence mode="wait">
                    {error && <ErrorMessage message={error} />}
                    
                    {userData && (
                        <>
                            <BotPrediction isBot={userData.is_bot} onReport={handleReport} />
                            <UserCard user={userData} />
                        </>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
