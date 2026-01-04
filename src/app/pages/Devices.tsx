import { Wifi, WifiOff, AlertCircle, CheckCircle, Plus, MoreVertical } from 'lucide-react';

export default function Devices({ role }: { role: string }) {
  const devices = [
    {
      id: 1,
      name: 'Main Campus Water Tank',
      location: 'Academic Block A',
      status: 'active',
      tds: 245,
      temperature: 28.5,
      lastUpdate: '2 minutes ago',
      battery: 95,
    },
    {
      id: 2,
      name: 'Hostel Block Sensor',
      location: 'Student Hostel 1',
      status: 'active',
      tds: 268,
      temperature: 29.1,
      lastUpdate: '1 minute ago',
      battery: 87,
    },
    {
      id: 3,
      name: 'Library Water Supply',
      location: 'Library Building',
      status: 'inactive',
      tds: 312,
      temperature: 27.8,
      lastUpdate: '2 hours ago',
      battery: 45,
    },
    {
      id: 4,
      name: 'Lab Building Supply',
      location: 'Science Labs',
      status: 'active',
      tds: 198,
      temperature: 26.2,
      lastUpdate: '3 minutes ago',
      battery: 92,
    },
    {
      id: 5,
      name: 'Cafeteria Water System',
      location: 'Dining Hall',
      status: 'active',
      tds: 255,
      temperature: 27.5,
      lastUpdate: '4 minutes ago',
      battery: 78,
    },
    {
      id: 6,
      name: 'Admin Block Tank',
      location: 'Administration',
      status: 'active',
      tds: 289,
      temperature: 28.9,
      lastUpdate: '5 minutes ago',
      battery: 88,
    },
  ];

  const activeDevices = devices.filter(d => d.status === 'active').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Sensors</h1>
          <p className="text-gray-600 mt-2">Monitor and manage all water quality sensors</p>
        </div>
        {role === 'admin' && (
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Device
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Active Devices</p>
              <p className="text-3xl font-bold text-gray-900">{activeDevices}/6</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Wifi className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Total Readings</p>
              <p className="text-3xl font-bold text-gray-900">15.4K</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Alerts</p>
              <p className="text-3xl font-bold text-gray-900">2</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Device</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">TDS</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Temperature</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Battery</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Last Update</th>
                {role === 'admin' && <th className="px-6 py-4 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">Action</th>}
              </tr>
            </thead>
            <tbody>
              {devices.map((device, idx) => (
                <tr key={device.id} className={`border-b border-gray-100 hover:bg-gray-50 transition ${idx === devices.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 font-semibold">{device.name}</p>
                    <p className="text-gray-500 text-xs">ID: S-{String(device.id).padStart(3, '0')}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-sm">{device.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${device.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-sm font-medium capitalize ${device.status === 'active' ? 'text-green-700' : 'text-red-700'}`}>
                        {device.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 font-semibold">{device.tds}</span>
                    <span className="text-gray-500 text-xs ml-1">ppm</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 font-semibold">{device.temperature.toFixed(1)}</span>
                    <span className="text-gray-500 text-xs ml-1">°C</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${device.battery > 70 ? 'bg-green-500' : device.battery > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${device.battery}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{device.battery}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{device.lastUpdate}</td>
                  {role === 'admin' && (
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-gray-600 transition">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
