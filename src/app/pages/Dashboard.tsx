import { Activity, Droplet, Thermometer, Zap, TrendingUp, AlertCircle } from 'lucide-react';

export default function Dashboard({ user, role }: { user: any; role: string }) {
  const metrics = [
    {
      title: 'Average TDS',
      value: '245',
      unit: 'ppm',
      icon: Droplet,
      bgColor: 'bg-blue-50',
      iconColor: 'bg-blue-600',
      trend: '+2.3%',
      trendUp: true,
    },
    {
      title: 'Temperature',
      value: '28.5',
      unit: '°C',
      icon: Thermometer,
      bgColor: 'bg-orange-50',
      iconColor: 'bg-orange-600',
      trend: '+1.2%',
      trendUp: true,
    },
    {
      title: 'Active Sensors',
      value: '12',
      unit: 'of 15',
      icon: Activity,
      bgColor: 'bg-green-50',
      iconColor: 'bg-green-600',
      trend: 'All online',
      trendUp: true,
    },
    {
      title: 'System Health',
      value: '98',
      unit: '%',
      icon: Zap,
      bgColor: 'bg-purple-50',
      iconColor: 'bg-purple-600',
      trend: 'Excellent',
      trendUp: true,
    },
  ];

  const recentActivity = [
    { id: 1, event: 'Sensor S-001 calibrated', time: '2 hours ago', status: 'success' },
    { id: 2, event: 'Water quality alert from Zone 2', time: '4 hours ago', status: 'warning' },
    { id: 3, event: 'New device added: S-012', time: '6 hours ago', status: 'info' },
    { id: 4, event: 'Daily report generated', time: '1 day ago', status: 'success' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome back, {user.email?.split('@')[0]}! 👋</h1>
          <p className="text-gray-600 mt-2">Here's your water quality monitoring dashboard</p>
        </div>
      </div>

      {/* Metrics Grid - Sellin Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className={`${metric.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-lg transition duration-200`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`${metric.iconColor} p-3 rounded-lg shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-semibold ${metric.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{metric.title}</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-gray-500 text-sm">{metric.unit}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Water Quality Trends</h2>
              <p className="text-gray-500 text-sm">Last 7 days</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View Details</button>
          </div>
          
          {/* Simple Chart Placeholder */}
          <div className="h-64 flex items-end justify-around gap-3 px-4 py-8 bg-gradient-to-b from-gray-50 to-white rounded-lg">
            {[45, 38, 52, 48, 61, 55, 67].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg opacity-80 hover:opacity-100 transition"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="pb-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium text-sm">{activity.event}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              System Status
            </h3>
            <p className="text-gray-600 text-sm mt-2">All systems operating normally. Last check: 5 minutes ago</p>
          </div>
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">Active</span>
        </div>
      </div>
    </div>
  );
}
