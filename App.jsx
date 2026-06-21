import React, { useState, useEffect } from 'react';
import SportsEventSponsorshipAndKitDonationDashboard from './SportsEventSponsorship&KitDonationDashboard';
import SportsEventSponsorshipAndKitDonationEntryForm from './SportsEventSponsorship&KitDonationEntryForm';
import DetailAndHistoryView from './Detail&HistoryView';
import ReportsAndAnalyticsDashboard from './Reports&AnalyticsDashboard';
import SportsEventSponsorshipAndKitDonationDetailPage from './SportsEventSponsorship&KitDonationDetailPage';
import ProjectTeam from './ProjectTeam';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'entry-form'
  const [editingId, setEditingId] = useState(null);
  const [inspectingId, setInspectingId] = useState(null);
  const [globalStats, setGlobalStats] = useState({
    totalSpend: 0,
    activeCount: 0,
    completedCount: 0,
    warningAlertsCount: 0,
    totalRecords: 0
  });

  useEffect(() => {
    fetchGlobalStats();
  }, [currentView, inspectingId]);

  const fetchGlobalStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/dashboard/summary`);
      const data = await response.json();
      if (data.success) {
        setGlobalStats(data.summary);
      }
    } catch (error) {
      console.error("Error fetching global stats:", error);
    }
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setCurrentView('entry-form');
  };

  const handleEditRecord = (id) => {
    setEditingId(id);
    setCurrentView('entry-form');
  };

  const handleInspectRecord = (id) => {
    setInspectingId(id);
    setCurrentView('detail');
  };

  const handleFormSave = () => {
    setCurrentView('dashboard');
    setEditingId(null);
  };

  const handleFormCancel = () => {
    setCurrentView('dashboard');
    setEditingId(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', paddingBottom: '40px' }}>
      {/* Navigation Header */}
      <header style={{
        background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)',
        borderBottom: '1px solid rgba(255, 107, 0, 0.2)',
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.8rem' }}>⚽</span>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', tracking: '0.05em' }}>
              OXYGEN SPORTS <span style={{ color: '#ff6b00' }}>HYDERABAD</span>
            </h1>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Sponsorship & Kit Donation Tracker
            </span>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={() => setCurrentView('dashboard')}
            style={{
              backgroundColor: currentView === 'dashboard' ? '#ff6b00' : 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '6px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('reports')}
            style={{
              backgroundColor: currentView === 'reports' ? '#ff6b00' : 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '6px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Reports & Analytics
          </button>
          <button
            onClick={() => setCurrentView('team')}
            style={{
              backgroundColor: currentView === 'team' ? '#ff6b00' : 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '6px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Project Team
          </button>
          <button
            onClick={handleCreateNew}
            style={{
              backgroundColor: currentView === 'entry-form' && !editingId ? '#ff6b00' : 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '6px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            + New Sponsorship
          </button>
        </nav>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-bar" style={{ maxWidth: '1150px', margin: '15px auto 0 auto', padding: '0 30px', fontSize: '0.85rem', color: '#64748b' }}>
        <span style={{ cursor: 'pointer', color: '#3b82f6' }} onClick={() => setCurrentView('dashboard')}>Oxygen Sports</span>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: '#94a3b8', textTransform: 'capitalize' }}>
          {currentView === 'entry-form' ? (editingId ? 'Edit Entry' : 'New Entry') : currentView}
        </span>
      </div>

      {/* Home Summary Alerts Widget */}
      <div className="dashboard-summary-widget" style={{
        maxWidth: '1090px',
        margin: '15px auto 5px auto',
        padding: '15px 20px',
        background: 'rgba(255, 107, 0, 0.05)',
        border: '1px solid rgba(255, 107, 0, 0.15)',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Total Distributed Spend</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ff8c00', marginTop: '3px' }}>
              ₹{globalStats.totalSpend.toLocaleString()}
            </div>
          </div>
          <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Active Projects</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginTop: '3px' }}>
              {globalStats.activeCount}
            </div>
          </div>
          <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Completed Campaigns</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#22c55e', marginTop: '3px' }}>
              {globalStats.completedCount}
            </div>
          </div>
        </div>
        
        {globalStats.warningAlertsCount > 0 && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            padding: '8px 16px',
            borderRadius: '8px',
            color: '#fca5a5',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ⚠️ {globalStats.warningAlertsCount} Critical Flags Active (Low ROI / Overbudget)
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main style={{ marginTop: '20px' }}>
        {currentView === 'dashboard' ? (
          <SportsEventSponsorshipAndKitDonationDashboard 
            onViewDetails={handleInspectRecord}
            onEditRecord={handleEditRecord}
          />
        ) : currentView === 'reports' ? (
          <ReportsAndAnalyticsDashboard />
        ) : currentView === 'detail' ? (
          <SportsEventSponsorshipAndKitDonationDetailPage 
            sponsorshipId={inspectingId}
            onBack={() => { setCurrentView('dashboard'); setInspectingId(null); }}
          />
        ) : currentView === 'team' ? (
          <ProjectTeam />
        ) : (
          <SportsEventSponsorshipAndKitDonationEntryForm 
            sponsorshipId={editingId}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        )}
      </main>
    </div>
  );
}
