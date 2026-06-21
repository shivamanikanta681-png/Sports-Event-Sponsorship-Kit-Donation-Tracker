import React, { useState } from 'react';
import SportsEventSponsorshipAndKitDonationDashboard from './SportsEventSponsorship&KitDonationDashboard';
import SportsEventSponsorshipAndKitDonationEntryForm from './SportsEventSponsorship&KitDonationEntryForm';
import DetailAndHistoryView from './Detail&HistoryView';
import ReportsAndAnalyticsDashboard from './Reports&AnalyticsDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'entry-form'
  const [editingId, setEditingId] = useState(null);
  const [inspectingId, setInspectingId] = useState(null);

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

      {/* Main Content Area */}
      <main style={{ marginTop: '20px' }}>
        {currentView === 'dashboard' ? (
          <SportsEventSponsorshipAndKitDonationDashboard 
            onViewDetails={handleInspectRecord}
            onEditRecord={handleEditRecord}
          />
        ) : currentView === 'reports' ? (
          <ReportsAndAnalyticsDashboard />
        ) : (
          <SportsEventSponsorshipAndKitDonationEntryForm 
            sponsorshipId={editingId}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        )}
      </main>

      {/* Inspection Drawer Overlay */}
      {inspectingId && (
        <DetailAndHistoryView 
          sponsorshipId={inspectingId}
          onClose={() => setInspectingId(null)}
        />
      )}
    </div>
  );
}
