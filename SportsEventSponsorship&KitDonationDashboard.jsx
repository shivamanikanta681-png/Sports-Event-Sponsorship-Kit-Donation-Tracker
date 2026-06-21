import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function SportsEventSponsorshipAndKitDonationDashboard({ onViewDetails, onEditRecord }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    totalSpend: 0,
    approvedCount: 0,
    completedCount: 0
  });

  useEffect(() => {
    fetchRecords();
  }, [searchTerm, statusFilter, currentPage]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const url = `${API_URL}/api/sports_event_sponsorship_kit_donati?page=${currentPage}&limit=20&status=${statusFilter}&search=${searchTerm}`;
      const response = await fetch(url);
      const resData = await response.json();

      if (resData.success) {
        setRecords(resData.data);
        setTotalPages(resData.pagination.totalPages);
        
        const total = resData.data.reduce((sum, r) => sum + r.total_cost, 0);
        const approved = resData.data.filter(r => r.status === 'Approved').length;
        const completed = resData.data.filter(r => r.status === 'Completed').length;
        setStats({
          totalSpend: total,
          approvedCount: approved,
          completedCount: completed
        });
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusTransition = async (id, newStatus) => {
    const confirmed = window.confirm(`Are you sure you want to transition this sponsorship status to "${newStatus}"?`);
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/sports_event_sponsorship_kit_donati/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        alert("Sponsorship status updated successfully!");
        fetchRecords();
      }
    } catch (error) {
      console.error("Status transition failed:", error);
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Completed':
        return { backgroundColor: '#16a34a', color: '#86efac', border: '1px solid #15803d' };
      case 'Disbursed':
        return { backgroundColor: '#d97706', color: '#fef3c7', border: '1px solid #b45309' };
      case 'Approved':
        return { backgroundColor: '#0284c7', color: '#e0f2fe', border: '1px solid #0369a1' };
      case 'Archived':
        return { backgroundColor: '#475569', color: '#cbd5e1', border: '1px solid #334155' };
      default:
        return { backgroundColor: '#334155', color: '#94a3b8', border: '1px solid #1e293b' };
    }
  };

  return (
    <div className="dashboard-container">
      
      {/* Header */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">Sponsorships & Kit Donations Dashboard</h2>
        <div className="filter-row">
          <input 
            type="text" 
            placeholder="Search items or school name..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-box-input"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="dashboard-tabs-bar">
        {['All', 'Active', 'Completed', 'Archived'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setStatusFilter(tab);
              setCurrentPage(1);
            }}
            className={`dashboard-tab-btn ${statusFilter === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <span className="dashboard-stat-label">Total Cost (This List)</span>
          <span className="dashboard-stat-value">₹{stats.totalSpend.toLocaleString()}</span>
        </div>
        <div className="dashboard-stat-card">
          <span className="dashboard-stat-label">Approved (This List)</span>
          <span className="dashboard-stat-value">{stats.approvedCount}</span>
        </div>
        <div className="dashboard-stat-card">
          <span className="dashboard-stat-label">Completed (This List)</span>
          <span className="dashboard-stat-value">{stats.completedCount}</span>
        </div>
      </div>

      {/* Grid Table */}
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p style={{ color: '#94a3b8' }}>Loading live records from database...</p>
        </div>
      ) : records.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">No Sponsorship Records Found</div>
          <div className="empty-state-subtitle">Try altering search parameters or log a new donation entry.</div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="dashboard-table">
            <thead>
              <tr className="dashboard-table-th-row">
                <th className="dashboard-table-th">Recipient Event / School</th>
                <th className="dashboard-table-th">Items Donated</th>
                <th className="dashboard-table-th">Visibility Promised</th>
                <th className="dashboard-table-th">Created Date</th>
                <th className="dashboard-table-th">Sponsorship Status</th>
                <th className="dashboard-table-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="dashboard-table-tr">
                  <td className="dashboard-table-td">
                    <div style={{ fontWeight: '700' }}>{record.event_name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#ff8c00' }}>{record.category}</div>
                  </td>
                  <td className="dashboard-table-td">
                    <div style={{ fontSize: '0.85rem' }}>
                      {record.items_donated.map((item, idx) => (
                        <div key={idx}>• {item.name} (Qty {item.qty})</div>
                      ))}
                    </div>
                  </td>
                  <td className="dashboard-table-td">
                    <div style={{ fontSize: '0.85rem' }}>
                      {Object.entries(record.brand_visibility_received)
                        .filter(([_, val]) => val)
                        .map(([key, _]) => (
                          <span key={key} className="badge-visibility">
                            {key.toUpperCase()}
                          </span>
                        ))}
                    </div>
                  </td>
                  <td className="dashboard-table-td">{record.event_date}</td>
                  <td className="dashboard-table-td">
                    <span className="badge-status" style={getStatusBadgeStyle(record.status)}>
                      {record.status}
                    </span>
                  </td>
                  <td className="dashboard-table-td">
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => onViewDetails(record.id)}
                        className="btn-action-inspect"
                      >
                        Inspect
                      </button>
                      <button 
                        onClick={() => onEditRecord(record.id)}
                        className="btn-action-edit"
                      >
                        Edit
                      </button>
                      {record.status !== 'Completed' && record.status !== 'Archived' && (
                        <button 
                          onClick={() => handleStatusTransition(record.id, 'Completed')}
                          className="btn-action-complete"
                        >
                          Complete
                        </button>
                      )}
                      {record.status !== 'Archived' && (
                        <button 
                          onClick={() => handleStatusTransition(record.id, 'Archived')}
                          className="btn-action-archive"
                        >
                          Archive
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
