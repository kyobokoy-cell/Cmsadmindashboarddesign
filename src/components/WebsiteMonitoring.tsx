import { Activity, Globe, Server, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { time: '00:00', responseTime: 120, uptime: 100 },
  { time: '04:00', responseTime: 115, uptime: 100 },
  { time: '08:00', responseTime: 180, uptime: 100 },
  { time: '12:00', responseTime: 250, uptime: 100 },
  { time: '16:00', responseTime: 200, uptime: 99.8 },
  { time: '20:00', responseTime: 140, uptime: 100 },
  { time: '24:00', responseTime: 125, uptime: 100 },
];

const endpoints = [
  { name: 'Main Website', url: 'https://school.edu', status: 'online', responseTime: 145 },
  { name: 'Student Portal', url: 'https://portal.school.edu', status: 'online', responseTime: 210 },
  { name: 'API Server', url: 'https://api.school.edu', status: 'online', responseTime: 85 },
  { name: 'Media Server', url: 'https://media.school.edu', status: 'warning', responseTime: 450 },
];

export function WebsiteMonitoring() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Website Monitoring</h2>
        <p className="text-gray-600">Monitor website performance and uptime</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Uptime</p>
              <p className="text-gray-900">99.9%</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Last 30 days</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Avg Response</p>
              <p className="text-gray-900">165ms</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Last 24 hours</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Server className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Endpoints</p>
              <p className="text-gray-900">4 Active</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">All systems</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Incidents</p>
              <p className="text-gray-900">1 Warning</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Last 7 days</p>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Response Time (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Uptime Percentage (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" />
              <YAxis domain={[99, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="uptime" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Endpoints Status */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Monitored Endpoints</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  endpoint.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <p className="text-gray-900">{endpoint.name}</p>
                  <p className="text-sm text-gray-500">{endpoint.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Response Time</p>
                  <p className={`${
                    endpoint.responseTime > 400 ? 'text-yellow-600' : 'text-green-600'
                  }`}>{endpoint.responseTime}ms</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  endpoint.status === 'online'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {endpoint.status === 'online' ? 'Online' : 'Slow Response'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
