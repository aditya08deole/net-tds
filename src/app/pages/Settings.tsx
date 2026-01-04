import { useState } from 'react';
import { Lock, Bell, Database, Shield } from 'lucide-react';

export default function SettingsPage({ role }: { role: string }) {
  const [settings, setSettings] = useState({
    tdsMin: 50,
    tdsMax: 500,
    tempMin: 5,
    tempMax: 45,
    emailAlerts: true,
    smsAlerts: false,
    dailyReports: true,
  });

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
        <p className="text-gray-400">Configure water quality thresholds and notifications</p>
      </div>

      {role === 'admin' ? (
        <>
          {/* Quality Thresholds */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-white">Water Quality Thresholds</h2>
            </div>

            <div className="space-y-6">
              {/* TDS Thresholds */}
              <div>
                <label className="block text-white font-medium mb-4">Total Dissolved Solids (TDS)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Minimum (ppm)</label>
                    <input
                      type="number"
                      value={settings.tdsMin}
                      onChange={(e) => handleChange('tdsMin', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Maximum (ppm)</label>
                    <input
                      type="number"
                      value={settings.tdsMax}
                      onChange={(e) => handleChange('tdsMax', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Temperature Thresholds */}
              <div>
                <label className="block text-white font-medium mb-4">Temperature</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Minimum (°C)</label>
                    <input
                      type="number"
                      value={settings.tempMin}
                      onChange={(e) => handleChange('tempMin', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Maximum (°C)</label>
                    <input
                      type="number"
                      value={settings.tempMax}
                      onChange={(e) => handleChange('tempMax', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-bold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'emailAlerts', label: 'Email Alerts', description: 'Receive alerts via email' },
                { key: 'smsAlerts', label: 'SMS Alerts', description: 'Receive alerts via SMS' },
                { key: 'dailyReports', label: 'Daily Reports', description: 'Receive daily summary reports' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{item.label}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onChange={(e) => handleChange(item.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-bold text-white">Security</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <p className="text-white font-medium mb-2">Two-Factor Authentication</p>
                <p className="text-gray-400 text-sm mb-4">Add an extra layer of security to your account</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
                  Enable 2FA
                </button>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <p className="text-white font-medium mb-2">Change Password</p>
                <p className="text-gray-400 text-sm mb-4">Update your account password</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition">
            Save Settings
          </button>
        </>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-white mb-2">Admin Only</h2>
          <p className="text-gray-400">Settings can only be modified by administrators.</p>
        </div>
      )}

      {/* System Information */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">System Version</p>
            <p className="text-white font-medium">1.0.0</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Last Updated</p>
            <p className="text-white font-medium">Jan 4, 2026</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Database Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-white font-medium">Connected</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">API Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-white font-medium">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
