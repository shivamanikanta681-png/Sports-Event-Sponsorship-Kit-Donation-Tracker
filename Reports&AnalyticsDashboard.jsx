import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ReportsAndAnalyticsDashboard() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, [startDate, endDate]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const url = `${API_URL}/api/reports/summary?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setSummary(data.summary);
      }
    } catch (error) {
      console.error("Error loading reports summary data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    window.open(`${API_URL}/api/sports_event_sponsorship_kit_donati/export`, '_blank');
  };

  // Helper for Category spend bar chart height scaling
  const getBarHeight = (spend, maxSpend) => {
    if (maxSpend === 0) return 0;
    return (spend / maxSpend) * 140; // Max height in SVG is 140
  };

  return (
    <div className="reports-container">
      
      {/* Date Filter and Export Header */}
      <div className="reports-date-filter-box">
        <div className="reports-date-inputs">
          <div className="form-col" style={{ width: '160px' }}>
            <label className="label-text">From Date</label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-col" style={{ width: '160px' }}>
            <label className="label-text">To Date</label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-input"
            />
          </div>
          {(startDate || endDate) && (
            <button 
              type="button" 
              onClick={() => { setStartDate(''); setEndDate(''); }} 
              className="btn-cancel-action"
              style={{ padding: '8px 16px', fontSize: '0.85rem', marginTop: '22px' }}
            >
              Clear
            </button>
          )}
        </div>
        
        <button onClick={handleExportCSV} className="btn-export-csv">
          📥 Export Database CSV
        </button>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p style={{ color: '#94a3b8' }}>Aggregating analytics database records...</p>
        </div>
      ) : !summary || summary.totalRecords === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <div className="empty-state-title">No Reports Data Available</div>
          <div className="empty-state-subtitle">No records exist for the selected date range. Choose another range or seed more sponsorships.</div>
        </div>
      ) : (
        <>
          {/* Quick Stats Grid */}
          <div className="dashboard-stats-grid">
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Total Sponsorship Spend</span>
              <span className="dashboard-stat-value">₹{summary.totalSpend.toLocaleString()}</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Average Budget Utilization</span>
              <span className="dashboard-stat-value">{summary.averageBudgetUtilization}%</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">Total Sponsorship Logs</span>
              <span className="dashboard-stat-value">{summary.totalRecords}</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="reports-charts-grid">
            
            {/* 1. Bar Chart: Category Spend */}
            <div className="reports-chart-card">
              <div className="reports-chart-header">
                <h4 className="reports-chart-title">Expenditures by Category</h4>
                <p className="reports-chart-subtitle">Allocation profile across target recipients</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <svg width="400" height="200" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '10px' }}>
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="380" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                  <line x1="40" y1="90" x2="380" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                  <line x1="40" y1="160" x2="380" y2="160" stroke="rgba(255,255,255,0.1)" />

                  {/* Render Categories */}
                  {(() => {
                    const categories = Object.keys(summary.categorySpends);
                    const values = Object.values(summary.categorySpends);
                    const maxVal = Math.max(...values, 1000);
                    
                    return categories.map((cat, idx) => {
                      const val = summary.categorySpends[cat];
                      const barH = getBarHeight(val, maxVal);
                      const x = 70 + idx * 80;
                      const y = 160 - barH;
                      
                      return (
                        <g key={cat}>
                          <rect 
                            x={x} 
                            y={y} 
                            width="40" 
                            height={barH} 
                            fill="url(#barGradient)" 
                            rx="4" 
                          />
                          <text x={x + 20} y="180" fill="#94a3b8" fontSize="10" textAnchor="middle">{cat}</text>
                          <text x={x + 20} y={y - 8} fill="#ff8c00" fontSize="9" fontWeight="700" textAnchor="middle">
                            {val > 0 ? `₹${(val / 1000).toFixed(1)}k` : '₹0'}
                          </text>
                        </g>
                      );
                    });
                  })()}

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff8c00" />
                      <stop offset="100%" stopColor="#ff5500" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* 2. Line Chart: 30-Day Cost Trend */}
            <div className="reports-chart-card">
              <div className="reports-chart-header">
                <h4 className="reports-chart-title">30-Day Sponsorship Activity</h4>
                <p className="reports-chart-subtitle">Daily costs trended over last 30 days</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <svg width="400" height="200" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '10px' }}>
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="380" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                  <line x1="40" y1="90" x2="380" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                  <line x1="40" y1="160" x2="380" y2="160" stroke="rgba(255,255,255,0.1)" />

                  {(() => {
                    const data = summary.timeSeries;
                    const maxVal = Math.max(...data.map(d => d.cost), 1000);
                    
                    // Map points to SVG coordinates
                    const points = data.map((d, idx) => {
                      const x = 50 + (idx * (310 / (data.length - 1 || 1)));
                      const y = 160 - (maxVal > 0 ? (d.cost / maxVal) * 120 : 0);
                      return { x, y, cost: d.cost, date: d.date };
                    });

                    const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

                    return (
                      <>
                        {/* Cost Line */}
                        <polyline 
                          fill="none" 
                          stroke="#10b981" 
                          strokeWidth="2.5" 
                          points={polylinePoints} 
                        />
                        
                        {/* Dot plot details for peak spends */}
                        {points.filter(p => p.cost > 0).map((p, idx) => (
                          <g key={idx}>
                            <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#10b981" strokeWidth="2" />
                            <text x={p.x} y={p.y - 8} fill="#10b981" fontSize="8" textAnchor="middle" fontWeight="bold">
                              ₹{(p.cost / 1000).toFixed(1)}k
                            </text>
                          </g>
                        ))}

                        {/* First and Last Date Labels */}
                        {points.length > 0 && (
                          <>
                            <text x="50" y="180" fill="#94a3b8" fontSize="9" textAnchor="start">
                              {points[0].date.substring(5)}
                            </text>
                            <text x="360" y="180" fill="#94a3b8" fontSize="9" textAnchor="end">
                              {points[points.length - 1].date.substring(5)}
                            </text>
                          </>
                        )}
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
