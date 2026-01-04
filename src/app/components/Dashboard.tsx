import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Droplets, Thermometer, AlertCircle, TrendingUp, TrendingDown, Activity, Search } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  location: string;
  channelId: string;
  status: 'active' | 'inactive';
}

interface DashboardProps {
  devices: Device[];
  selectedDevice: Device | null;
  thresholds: {
    tds: { min: number; max: number };
    temperature: { min: number; max: number };
  };
}

interface SensorData {
  timestamp: string;
  tds: number;
  temperature: number;
}

export function Dashboard({ devices, selectedDevice, thresholds }: DashboardProps) {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [currentData, setCurrentData] = useState({ tds: 0, temperature: 0 });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDevices, setFilteredDevices] = useState(devices);

  useEffect(() => {
    setFilteredDevices(
      devices.filter(
        (device) =>
          device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          device.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, devices]);

  useEffect(() => {
    if (selectedDevice) {
      fetchDeviceData(selectedDevice.channelId);
    }
  }, [selectedDevice]);

  const fetchDeviceData = async (channelId: string) => {
    setLoading(true);
    try {
      // Fetch from ThingSpeak API
      const response = await fetch(
        `https://api.thingspeak.com/channels/${channelId}/feeds.json?results=20`
      );
      const data = await response.json();

      if (data.feeds && data.feeds.length > 0) {
        const formattedData = data.feeds.map((feed: any) => ({
          timestamp: new Date(feed.created_at).toLocaleTimeString(),
          tds: parseFloat(feed.field1) || 0,
          temperature: parseFloat(feed.field2) || 0,
        }));

        setSensorData(formattedData);
        
        const latest = formattedData[formattedData.length - 1];
        setCurrentData({
          tds: latest.tds,
          temperature: latest.temperature,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Generate mock data for demo
      const mockData = Array.from({ length: 20 }, (_, i) => ({
        timestamp: new Date(Date.now() - (19 - i) * 60000).toLocaleTimeString(),
        tds: Math.random() * 400 + 100,
        temperature: Math.random() * 10 + 20,
      }));
      setSensorData(mockData);
      setCurrentData({
        tds: mockData[mockData.length - 1].tds,
        temperature: mockData[mockData.length - 1].temperature,
      });
    }
    setLoading(false);
  };

  const isAlertTDS = currentData.tds < thresholds.tds.min || currentData.tds > thresholds.tds.max;
  const isAlertTemp = currentData.temperature < thresholds.temperature.min || currentData.temperature > thresholds.temperature.max;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search devices by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        {searchTerm && (
          <div className="mt-3 space-y-2">
            {filteredDevices.map((device) => (
              <button
                key={device.id}
                onClick={() => fetchDeviceData(device.channelId)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition"
              >
                <p className="font-medium">{device.name}</p>
                <p className="text-sm text-gray-600">{device.location}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Current Device Info */}
      {selectedDevice && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{selectedDevice.name}</h2>
              <p className="text-blue-100 mt-1">{selectedDevice.location}</p>
            </div>
            <Activity className={`w-12 h-12 ${selectedDevice.status === 'active' ? 'text-green-300' : 'text-red-300'}`} />
          </div>
        </div>
      )}

      {/* Alerts */}
      {(isAlertTDS || isAlertTemp) && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800">Threshold Alert!</h3>
              {isAlertTDS && (
                <p className="text-red-700 text-sm mt-1">
                  TDS level ({currentData.tds.toFixed(1)} ppm) is outside the normal range ({thresholds.tds.min}-{thresholds.tds.max} ppm)
                </p>
              )}
              {isAlertTemp && (
                <p className="text-red-700 text-sm mt-1">
                  Temperature ({currentData.temperature.toFixed(1)}°C) is outside the normal range ({thresholds.temperature.min}-{thresholds.temperature.max}°C)
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${isAlertTDS ? 'border-red-500' : 'border-blue-500'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Dissolved Solids</p>
                <h3 className="text-3xl font-bold text-gray-900">{currentData.tds.toFixed(1)}</h3>
              </div>
            </div>
            <span className="text-sm text-gray-500">ppm</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {currentData.tds > (thresholds.tds.min + thresholds.tds.max) / 2 ? (
              <TrendingUp className="w-4 h-4 text-red-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-green-500" />
            )}
            <span className="text-gray-600">
              Normal: {thresholds.tds.min}-{thresholds.tds.max} ppm
            </span>
          </div>
        </div>

        <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${isAlertTemp ? 'border-red-500' : 'border-orange-500'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <h3 className="text-3xl font-bold text-gray-900">{currentData.temperature.toFixed(1)}</h3>
              </div>
            </div>
            <span className="text-sm text-gray-500">°C</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {currentData.temperature > (thresholds.temperature.min + thresholds.temperature.max) / 2 ? (
              <TrendingUp className="w-4 h-4 text-red-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-green-500" />
            )}
            <span className="text-gray-600">
              Normal: {thresholds.temperature.min}-{thresholds.temperature.max}°C
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-600" />
            TDS Trend
          </h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tds" stroke="#3b82f6" strokeWidth={2} name="TDS (ppm)" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-orange-600" />
            Temperature Trend
          </h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} name="Temp (°C)" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
