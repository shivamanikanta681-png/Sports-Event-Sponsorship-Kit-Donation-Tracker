import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function SportsEventSponsorshipAndKitDonationDetailPage({ sponsorshipId, onBack }) {
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sponsorshipId) {
      fetchDetails();
    }
  }, [sponsorshipId]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/sports_event_sponsorship_kit_donati/${sponsorshipId}/detail`);
      const resData = await response.json();
      if (resData.success) {
        setDetailData(resData.data);
      }
    } catch (error) {
      console.error("Error loading detail view records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="detail-page-container">
      
      {/* Back & Print Row */}
      <div className="detail-actions-row no-print">
        <button onClick={onBack} className="btn-cancel-action">
          ← Back to Dashboard
        </button>
        <button onClick={handlePrint} className="btn-submit-action" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          🖨️ Print / Export PDF
        </button>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p style={{ color: '#94a3b8' }}>Gathering detailed audit logs data...</p>
        </div>
      ) : !detailData ? (
        <div className="empty-state">
          <div className="empty-state-icon">⚠️</div>
          <div className="empty-state-title">Failed to Retrieve Record Details</div>
          <div className="empty-state-subtitle">The requested sponsorship ID does not exist or server returned an error.</div>
        </div>
      ) : (
        <div className="print-area">
          
          {/* Invoice Header */}
          <div className="detail-header-card">
            <span className="badge-visibility" style={{ marginBottom: '10px' }}>
              {detailData.sponsorship.category.toUpperCase()} RECIPIENT
            </span>
            <h2 className="detail-event-title">{detailData.sponsorship.event_name}</h2>
            <div className="detail-meta-grid">
              <div>
                <strong>Event Date:</strong> {detailData.sponsorship.event_date}
              </div>
              <div>
                <strong>Status:</strong> <span className="badge-status" style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>{detailData.sponsorship.status}</span>
              </div>
              <div>
                <strong>Database Record ID:</strong> #{detailData.sponsorship.id}
              </div>
            </div>
          </div>

          {/* Financials & Analytics Widgets */}
          <div className="dashboard-stats-grid" style={{ marginTop: '20px' }}>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Approved Budget Limit</span>
              <span className="dashboard-stat-value">₹{detailData.sponsorship.budget_limit.toLocaleString()}</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Total Allocated Cost</span>
              <span className="dashboard-stat-value">₹{detailData.sponsorship.total_cost.toLocaleString()}</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Notes & Remarks</span>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', fontStyle: 'italic' }}>
                {detailData.sponsorship.notes || 'No notes added.'}
              </p>
            </div>
          </div>

          {/* Items Donated Table */}
          <div className="detail-section-card" style={{ marginTop: '20px' }}>
            <h3 className="drawer-section-title">Equipment Kit Items Donated</h3>
            <table className="dashboard-table" style={{ minWidth: 'auto', marginTop: '10px' }}>
              <thead>
                <tr className="dashboard-table-th-row">
                  <th className="dashboard-table-th">Item Description</th>
                  <th className="dashboard-table-th">Quantity</th>
                  <th className="dashboard-table-th" style={{ textAlign: 'right' }}>Unit Cost</th>
                  <th className="dashboard-table-th" style={{ textAlign: 'right' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detailData.sponsorship.items_donated.map((item, index) => (
                  <tr key={index} className="dashboard-table-tr">
                    <td className="dashboard-table-td" style={{ fontWeight: '600' }}>{item.name}</td>
                    <td className="dashboard-table-td">{item.qty}</td>
                    <td className="dashboard-table-td" style={{ textAlign: 'right' }}>₹{item.unitCost.toLocaleString()}</td>
                    <td className="dashboard-table-td" style={{ textAlign: 'right', color: '#ff8c00', fontWeight: '700' }}>
                      ₹{(item.qty * item.unitCost).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Brand Visibility Checklist */}
          <div className="detail-section-card" style={{ marginTop: '20px' }}>
            <h3 className="drawer-section-title">Secured Branding Visibility</h3>
            <div className="checkbox-layout-grid" style={{ marginTop: '10px' }}>
              <div className="drawer-asset-item" style={{ color: detailData.sponsorship.brand_visibility_received.banner ? '#a3e635' : '#64748b' }}>
                {detailData.sponsorship.brand_visibility_received.banner ? '✔' : '✖'} Boundary Banner Placement
              </div>
              <div className="drawer-asset-item" style={{ color: detailData.sponsorship.brand_visibility_received.jerseyLogo ? '#a3e635' : '#64748b' }}>
                {detailData.sponsorship.brand_visibility_received.jerseyLogo ? '✔' : '✖'} Jersey Logo / Branding
              </div>
              <div className="drawer-asset-item" style={{ color: detailData.sponsorship.brand_visibility_received.socialMedia ? '#a3e635' : '#64748b' }}>
                {detailData.sponsorship.brand_visibility_received.socialMedia ? '✔' : '✖'} Social Media Mentions
              </div>
              <div className="drawer-asset-item" style={{ color: detailData.sponsorship.brand_visibility_received.prizeSpeech ? '#a3e635' : '#64748b' }}>
                {detailData.sponsorship.brand_visibility_received.prizeSpeech ? '✔' : '✖'} Prize Distribution Speech
              </div>
            </div>
          </div>

          {/* Audit Logs Chronological History */}
          <div className="detail-section-card" style={{ marginTop: '20px' }}>
            <h3 className="drawer-section-title">Workflow Audit Trail History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              {detailData.auditLogs.map((log, idx) => (
                <div key={log.id} style={{
                  padding: '15px',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div>
                    <div style={{ fontWeight: '700', color: '#ff8c00' }}>
                      Status transitioned to: {log.status}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                      Audit log write verified by authorization roles.
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748b' }}>
                    <div><strong>By:</strong> {log.changed_by}</div>
                    <div style={{ marginTop: '2px' }}>{log.created_at}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
