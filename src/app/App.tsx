import { useState, useEffect } from 'react';

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '1rem' }}>EvaraTDS</h1>
        <p style={{ fontSize: '1rem', color: '#6b7280' }}>Water Quality Monitoring System</p>
        <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#9ca3af' }}>App is loading...</p>
      </div>
    </div>
  );
}