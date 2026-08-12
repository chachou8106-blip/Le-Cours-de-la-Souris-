import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import CountriesPage from './pages/Countries';
import CountryDetailPage from './pages/Countries/Detail';
import IndexPage from './pages/Index';
import GamesPage from './pages/Games';
import CROQPage from './pages/CROQ';
import OfficialRatesPage from './pages/OfficialRates/OfficialRatesPage';
import ReportsPage from './pages/Reports/ReportsPage';
import RewardsPage from './pages/Rewards/RewardsPage';
import ShopPage from './pages/Shop/ShopPage';
import AdminLayout from './pages/Admin/Layout';
import LegalLayout from './pages/Legal/Layout';
import DailyHumor from './features/daily-humor/DailyHumor';
import { Header, Footer } from './components/layout';

function App() {
  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#3a3a3a] flex flex-col">
      <Header />
      <main className="flex-1">
        <DailyHumor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/countries/:iso2" element={<CountryDetailPage />} />
          <Route path="/index" element={<IndexPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/croq" element={<CROQPage />} />
          <Route path="/official-rates" element={<OfficialRatesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/legal/*" element={<LegalLayout />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;