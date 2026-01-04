import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([17.4451, 78.3489], 14);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Sample sensor locations
    const sensors = [
      {
        name: 'Main Campus Water Tank',
        location: 'Academic Block A',
        lat: 17.4451,
        lng: 78.3489,
        tds: 245,
        temp: 28.5,
        status: 'active',
      },
      {
        name: 'Hostel Block Sensor',
        location: 'Student Hostel 1',
        lat: 17.4455,
        lng: 78.3495,
        tds: 268,
        temp: 29.1,
        status: 'active',
      },
      {
        name: 'Library Water Supply',
        location: 'Library Building',
        lat: 17.4448,
        lng: 78.3485,
        tds: 312,
        temp: 27.8,
        status: 'inactive',
      },
      {
        name: 'Lab Building Supply',
        location: 'Science Labs',
        lat: 17.4460,
        lng: 78.3500,
        tds: 198,
        temp: 26.2,
        status: 'active',
      },
    ];

    // Add markers
    sensors.forEach((sensor) => {
      const marker = L.marker([sensor.lat, sensor.lng], {
        icon: L.icon({
          iconUrl: `data:image/svg+xml;base64,${btoa(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="15" fill="${
              sensor.status === 'active' ? '#3b82f6' : '#ef4444'
            }" stroke="white" stroke-width="2"/><text x="16" y="20" font-size="14" fill="white" text-anchor="middle" font-weight="bold">📍</text></svg>`
          )}`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        }),
      }).addTo(map.current!);

      const popupContent = `
        <div class="font-sans">
          <h3 class="font-bold text-sm mb-2">${sensor.name}</h3>
          <p class="text-xs text-gray-600 mb-2">${sensor.location}</p>
          <div class="space-y-1 text-xs">
            <p><span class="font-semibold">TDS:</span> ${sensor.tds} ppm</p>
            <p><span class="font-semibold">Temp:</span> ${sensor.temp}°C</p>
            <p><span class="font-semibold">Status:</span> <span class="px-2 py-1 rounded ${
              sensor.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }">${sensor.status === 'active' ? 'Active' : 'Inactive'}</span></p>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Water Quality Monitoring Map</h1>
        <p className="text-gray-400">Real-time sensor locations and water quality metrics</p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div
          ref={mapContainer}
          className="w-full h-[600px] bg-gray-900"
        />
      </div>

      {/* Legend */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Sensor Status Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-gray-300 text-sm">Active Sensors</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-gray-300 text-sm">Inactive Sensors</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-gray-300 text-sm">Warning State</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-300 text-sm">Optimal Range</span>
          </div>
        </div>
      </div>
    </div>
  );
}
