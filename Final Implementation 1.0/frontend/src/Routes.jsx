import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { BotCheckerPage } from './pages/BotCheckerPage';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bot-checker" element={<BotCheckerPage />} />
    </RouterRoutes>
  );
} 