import React from 'react';

export default function ProjectTeam() {
  const members = [
    {
      avatar: "👨‍💻",
      name: "Student 1",
      role: "Frontend Developer",
      skills: ["Premium Glassmorphism CSS", "Dynamic SVG Charts", "Print Media Queries", "Vite & React Routing"],
      contributions: "Designed and built the main tracking dashboard, responsive sponsorship log forms with repeating item rows, and the print layout styles. Programmed custom SVG elements for the category spends and 30-day timeline charts."
    },
    {
      avatar: "⚙️",
      name: "Student 2",
      role: "Backend Developer",
      skills: ["Express REST APIs", "Hybrid SQL Adapter (Postgres/SQLite)", "Input Sanitisation", "Database Migrations"],
      contributions: "Developed all REST endpoint routes, security middleware for character sanitisation, and a hybrid database module automatically converting SQLite parameterized inputs to PostgreSQL standards. Configured PostgreSQL schemas."
    },
    {
      avatar: "🛡️",
      name: "Student 3",
      role: "Testing & Deployment Coordinator",
      skills: ["End-to-End System Testing", "Cloud Deployments (Render/Vercel)", "Supabase Postgres Provisioning", "Technical Documentation"],
      contributions: "Executed the comprehensive suite of 53 test cases achieving a 100% pass rate. Deployed the complete project servers to Render/Vercel, drafted technical reference guides, and configured test trackers."
    }
  ];

  return (
    <div style={{ maxWidth: '1090px', margin: '20px auto', padding: '0 20px' }} className="dashboard-main-container">
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 107, 0, 0.15)',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 8px 0' }}>
            Oxygen Sports Project <span style={{ color: '#ff6b00' }}>Team</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
            Meet the developers behind the Sports Event Sponsorship & Kit Donation Tracker. Formulated and deployed during the 26-day internship campaign.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginTop: '16px'
        }}>
          {members.map((member, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s',
              cursor: 'default'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    fontSize: '2rem',
                    background: 'rgba(255, 107, 0, 0.1)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 107, 0, 0.2)'
                  }}>
                    {member.avatar}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>{member.name}</h3>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ff8c00', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {member.role}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '20px' }}>
                  {member.contributions}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Key Competencies
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {member.skills.map((skill, sIdx) => (
                    <span key={sIdx} style={{
                      fontSize: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#cbd5e1',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
