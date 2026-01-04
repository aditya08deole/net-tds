import { useState, useEffect } from 'react';
import { Save, Bell, AlertTriangle, Settings as SettingsIcon } from 'lucide-react';
import { projectId } from '../../../utils/supabase/info';

interface SettingsProps {
  isAdmin: boolean;
  accessToken: string | null;
  thresholds: {
    tds: { min: number; max: number };
    temperature: { min: number; max: number };
  };
  onThresholdsUpdate: () => void;
}

export function Settings({ isAdmin, accessToken, thresholds, onThresholdsUpdate }: SettingsProps) {
  const [tdsMin, setTdsMin] = useState(thresholds.tds.min);
  const [tdsMax, setTdsMax] = useState(thresholds.tds.max);
  const [tempMin, setTempMin] = useState(thresholds.temperature.min);
  const [tempMax, setTempMax] = useState(thresholds.temperature.max);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTdsMin(thresholds.tds.min);
    setTdsMax(thresholds.tds.max);
    setTempMin(thresholds.temperature.min);
    setTempMax(thresholds.temperature.max);
  }, [thresholds]);

  const handleSave = async () => {
    if (!isAdmin) {
      setMessage('Only admins can update settings');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8f03b1ef/thresholds`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            tds: { min: tdsMin, max: tdsMax },
            temperature: { min: tempMin, max: tempMax },
          }),
        }
      );

      if (response.ok) {
        setMessage('Settings saved successfully!');
        onThresholdsUpdate();
      } else {
        setMessage('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Configure thresholds and alerts</p>
        </div>
      </div>

      {/* Thresholds Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          <h3 className="text-xl font-bold">Alert Thresholds</h3>
        </div>

        <div className="space-y-6">
          {/* TDS Thresholds */}
          <div className="border-b border-gray-200 pb-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Total Dissolved Solids (TDS)
              <span className="text-sm font-normal text-gray-500">in ppm</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Threshold
                </label>
                <input
                  type="number"
                  value={tdsMin}
                  onChange={(e) => setTdsMin(parseFloat(e.target.value))}
                  disabled={!isAdmin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                  placeholder="e.g., 0"
                />
                <p className="text-xs text-gray-500 mt-1">Alert when TDS falls below this value</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Threshold
                </label>
                <input
                  type="number"
                  value={tdsMax}
                  onChange={(e) => setTdsMax(parseFloat(e.target.value))}
                  disabled={!isAdmin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                  placeholder="e.g., 500"
                />
                <p className="text-xs text-gray-500 mt-1">Alert when TDS exceeds this value</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Current Range: <span className="font-semibold">{tdsMin} - {tdsMax} ppm</span>
              </p>
            </div>
          </div>

          {/* Temperature Thresholds */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Temperature
              <span className="text-sm font-normal text-gray-500">in °C</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Threshold
                </label>
                <input
                  type="number"
                  value={tempMin}
                  onChange={(e) => setTempMin(parseFloat(e.target.value))}
                  disabled={!isAdmin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none disabled:bg-gray-100"
                  placeholder="e.g., 0"
                />
                <p className="text-xs text-gray-500 mt-1">Alert when temperature falls below this value</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Threshold
                </label>
                <input
                  type="number"
                  value={tempMax}
                  onChange={(e) => setTempMax(parseFloat(e.target.value))}
                  disabled={!isAdmin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none disabled:bg-gray-100"
                  placeholder="e.g., 35"
                />
                <p className="text-xs text-gray-500 mt-1">Alert when temperature exceeds this value</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                Current Range: <span className="font-semibold">{tempMin} - {tempMax} °C</span>
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isAdmin && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
            {message && (
              <p className={`mt-3 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        )}

        {!isAdmin && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <Bell className="w-4 h-4 inline mr-2" />
              You need admin privileges to modify settings.
            </p>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h4 className="font-semibold text-gray-900 mb-3">About Thresholds</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Alerts are triggered when sensor readings fall outside the configured ranges</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>TDS (Total Dissolved Solids) measures water purity in parts per million (ppm)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Temperature is measured in degrees Celsius (°C)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Recommended TDS range for drinking water: 50-300 ppm</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Ideal water temperature range: 15-25°C</span>
          </li>
        </ul>
      </div>
    </div>
  );
}