import { Users, FileText, Newspaper, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Total Visitors', value: '12,456', change: '+12.5%', icon: Users, color: 'bg-blue-500' },
  { label: 'Active Pages', value: '48', change: '+3', icon: FileText, color: 'bg-green-500' },
  { label: 'News Articles', value: '127', change: '+8', icon: Newspaper, color: 'bg-purple-500' },
  { label: 'Engagement Rate', value: '68%', change: '+5.2%', icon: TrendingUp, color: 'bg-orange-500' },
];

const visitorData = [
  { name: 'Sen', visitors: 400 },
  { name: 'Sel', visitors: 300 },
  { name: 'Rab', visitors: 500 },
  { name: 'Kam', visitors: 450 },
  { name: 'Jum', visitors: 600 },
  { name: 'Sab', visitors: 350 },
  { name: 'Min', visitors: 250 },
];

const pageViewsData = [
  { name: 'Beranda', views: 1200 },
  { name: 'Berita', views: 850 },
  { name: 'Tentang', views: 650 },
  { name: 'Kontak', views: 450 },
  { name: 'Galeri', views: 380 },
];

export function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your school website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm">{stat.change}</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Visitor Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Top Pages</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pageViewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New article published', item: 'Pengumuman Ujian Semester', time: '2 hours ago' },
            { action: 'Page updated', item: 'About Us', time: '5 hours ago' },
            { action: 'Alert created', item: 'School Holiday Notice', time: '1 day ago' },
            { action: 'Information posted', item: 'Parent-Teacher Meeting', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.item}</p>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
