import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function DetailAndHistoryView({ sponsorshipId, onClose }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (sponsorshipId) {
      fetchAnalysis();
    }
  }, [sponsorshipId]);

  const fetchAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/sports_event_sponsorship_kit_donati/${sponsorshipId}/engine_analysis`);
      const data = await response.json();
      if (data.success) {
        setAnalysis(data.analysis);
      }
    } catch (error) {
      console.error("Error loading logic analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendColor = (trendClass) => {
    switch (trendClass) {
      case 'success': return '#22c55e'; // Green
      case 'warning': return '#eab308'; // Yellow
      case 'danger': return '#ef4444'; // Red
      default: return '#3b82f6'; // Blue
    }
  };

  return (
    <div className="drawer-overlay">
      <div className="drawer-panel">
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <h3 className="drawer-header-title">Sponsorship Analysis & Logic Verification</h3>
          <button onClick={onClose} className="btn-close-drawer">✕</button>
        </div>

        {loading ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner" style={{ border: '4px solid rgba(255, 255, 255, 0.05)', width: '36px', height: '36px', borderRadius: '50%', borderLeftColor: '#ff8c00' }}></div>
            <p style={{ marginTop: '15px', color: '#94a3b8' }}>Processing logic metrics...</p>
          </div>
        ) : !analysis ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Failed to load processing analysis reports.</p>
          </div>
        ) : (
          <div className="drawer-body">
            
            {/* Target Title */}
            <div className="drawer-meta-row">
              <h4 className="drawer-event-title">{analysis.event_name}</h4>
              <span className="badge-visibility" style={{ margin: 0 }}>{analysis.category}</span>
            </div>

            {/* Visual KPI: ROI Score Meter & Trend Indicators */}
            <div className="drawer-kpi-card">
              <div className="roi-meter-box">
                <span className="roi-meter-label">
                  Sponsorship ROI Index
                  <span 
                    className="tooltip-info-icon"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(!showTooltip)}
                  >
                    i
                    {showTooltip && (
                      <span className="tooltip-info-box">
                        <strong>Weighted ROI Score Calculation:</strong><br />
                        • 60% Brand Exposure (Banner, Logo, Speech, Media)<br />
                        • 40% Savings Score (Budget Limit vs Total Kit Cost)
                      </span>
                    )}
                  </span>
                </span>
                <span className="roi-meter-value">{analysis.roi_score_index} / 100</span>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${analysis.roi_score_index}%` }}></div>
                </div>
              </div>

              {/* Trend Box Status */}
              <div className="trend-container-box" style={{ 
                borderColor: getTrendColor(analysis.trend_class),
                backgroundColor: `${getTrendColor(analysis.trend_class)}10` 
              }}>
                <span style={{ fontWeight: '700', color: getTrendColor(analysis.trend_class) }}>
                  {analysis.trend_indicator}
                </span>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="drawer-section-card">
              <h5 className="drawer-section-title">Engine Aggregation Breakdown</h5>
              
              <div className="drawer-stat-row">
                <span>Approved Budget:</span>
                <span className="drawer-stat-number">₹{analysis.budget_limit.toLocaleString()}</span>
              </div>

              <div className="drawer-stat-row">
                <span>Total Items Value:</span>
                <span className="drawer-stat-number">₹{analysis.total_cost.toLocaleString()}</span>
              </div>

              <div className="drawer-stat-row">
                <span>Budget Utilization Ratio:</span>
                <span className="drawer-stat-number" style={{ color: analysis.budget_utilization_pct > 90 ? '#ef4444' : '#22c55e' }}>
                  {analysis.budget_utilization_pct}%
                </span>
              </div>

              <div className="drawer-stat-row">
                <span>Visibility Assets Logged:</span>
                <span className="drawer-stat-number">{analysis.visibility_assets_count} of 4</span>
              </div>
            </div>

            {/* Visibility Items List */}
            <div className="drawer-section-card">
              <h5 className="drawer-section-title">Secured Branding Output</h5>
              {analysis.visibility_assets_list.length === 0 ? (
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No visibility assets checked for this sponsorship log.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {analysis.visibility_assets_list.map((asset, idx) => (
                    <div key={idx} className="drawer-asset-item">
                      ✔ {asset.toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Timeline logs placeholder */}
            <div className="drawer-section-card">
              <h5 className="drawer-section-title">System Status Tracking</h5>
              <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '1px solid rgba(255, 255, 255, 0.05)', marginLeft: '5px' }}>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <div style={{ position: 'absolute', left: '-24px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff8c00' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{analysis.last_updated}</div>
                    <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '3px' }}>Sponsorship verified & ROI evaluated by logic engine.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
