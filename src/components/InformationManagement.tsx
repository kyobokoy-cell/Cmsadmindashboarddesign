import { useState } from 'react';
import { Plus, Edit2, Trash2, Pin, Calendar, Users, X, Save, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

const initialInformation = [
  {
    id: 1,
    title: 'Rapat Orang Tua Siswa Kelas 12',
    description: 'Undangan rapat untuk membahas persiapan ujian nasional dan kelulusan',
    targetAudience: 'Orang Tua Kelas 12',
    date: '2024-12-15',
    isPinned: true,
    priority: 'high',
    type: 'information'
  },
  {
    id: 2,
    title: 'Jadwal Ekstrakurikuler Semester Genap',
    description: 'Pengumuman jadwal kegiatan ekstrakurikuler untuk semester genap 2024',
    targetAudience: 'Semua Siswa',
    date: '2024-12-12',
    isPinned: true,
    priority: 'medium',
    type: 'information'
  },
  {
    id: 3,
    title: 'Pembayaran SPP Bulan Desember',
    description: 'Reminder pembayaran SPP bulan Desember paling lambat tanggal 10',
    targetAudience: 'Orang Tua',
    date: '2024-12-05',
    isPinned: false,
    priority: 'high',
    type: 'information'
  },
  {
    id: 4,
    title: 'Peringatan Cuaca Ekstrim',
    description: 'Harap waspada terhadap cuaca ekstrim hari ini. Aktivitas outdoor ditunda.',
    targetAudience: 'Semua',
    date: '2024-12-11',
    isPinned: false,
    priority: 'high',
    type: 'warning',
    isActive: true,
    expiresAt: '2024-12-11 18:00'
  },
  {
    id: 5,
    title: 'Website Maintenance',
    description: 'Portal siswa akan maintenance pada tanggal 15 Desember pukul 22:00 - 02:00',
    targetAudience: 'Semua',
    date: '2024-12-10',
    isPinned: false,
    priority: 'medium',
    type: 'info',
    isActive: true,
    expiresAt: '2024-12-15 02:00'
  },
  {
    id: 6,
    title: 'Gangguan Sistem Pembayaran',
    description: 'Sistem pembayaran online mengalami gangguan. Gunakan metode alternatif.',
    targetAudience: 'Orang Tua',
    date: '2024-12-08',
    isPinned: false,
    priority: 'high',
    type: 'error',
    isActive: false,
    expiresAt: '2024-12-08 15:00'
  },
];

interface InfoFormData {
  id?: number;
  title: string;
  description: string;
  targetAudience: string;
  date: string;
  priority: string;
  type: string;
  isActive?: boolean;
  expiresAt?: string;
}

export function InformationManagement() {
  const [information, setInformation] = useState(initialInformation);
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInfo, setEditingInfo] = useState<InfoFormData | null>(null);
  const [formData, setFormData] = useState<InfoFormData>({
    title: '',
    description: '',
    targetAudience: 'Semua',
    date: new Date().toISOString().split('T')[0],
    priority: 'medium',
    type: 'information',
    isActive: false,
    expiresAt: '',
  });

  const filteredInfo = information.filter(info => {
    const matchesPriority = filterPriority === 'all' || info.priority === filterPriority;
    const matchesType = filterType === 'all' || info.type === filterType;
    return matchesPriority && matchesType;
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'error':
        return AlertCircle;
      case 'success':
        return CheckCircle;
      case 'info':
        return Info;
      default:
        return Info;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const togglePin = (id: number) => {
    setInformation(information.map(info =>
      info.id === id ? { ...info, isPinned: !info.isPinned } : info
    ));
  };

  const toggleAlertStatus = (id: number) => {
    setInformation(information.map(info =>
      info.id === id ? { ...info, isActive: !info.isActive } : info
    ));
  };

  const openCreateModal = () => {
    setEditingInfo(null);
    setFormData({
      title: '',
      description: '',
      targetAudience: 'Semua',
      date: new Date().toISOString().split('T')[0],
      priority: 'medium',
      type: 'information',
      isActive: false,
      expiresAt: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (info: any) => {
    setEditingInfo(info);
    setFormData({
      id: info.id,
      title: info.title,
      description: info.description,
      targetAudience: info.targetAudience,
      date: info.date,
      priority: info.priority,
      type: info.type,
      isActive: info.isActive || false,
      expiresAt: info.expiresAt || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingInfo) {
      setInformation(information.map(item => 
        item.id === editingInfo.id 
          ? { ...item, ...formData, isPinned: item.isPinned }
          : item
      ));
    } else {
      const newInfo = {
        ...formData,
        id: Math.max(...information.map(i => i.id)) + 1,
        isPinned: false,
      };
      setInformation([newInfo, ...information]);
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setInformation(information.filter(item => item.id !== id));
    }
  };

  const handleInputChange = (field: keyof InfoFormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const activeAlerts = information.filter(i => i.type !== 'information' && i.isActive);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 mb-2">Information & Alert Management</h2>
          <p className="text-gray-600">Manage school announcements, information, and system alerts</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New
        </button>
      </div>

      {/* Stats and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Total Items</p>
          <p className="text-gray-900">{information.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Pinned</p>
          <p className="text-gray-900">{information.filter(i => i.isPinned).length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Active Alerts</p>
          <p className="text-green-600">{activeAlerts.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">High Priority</p>
          <p className="text-red-600">{information.filter(i => i.priority === 'high').length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">This Month</p>
          <p className="text-gray-900">
            {information.filter(i => new Date(i.date).getMonth() === 11).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex gap-2 flex-wrap">
          <span className="text-gray-700 py-2">Type:</span>
          {['all', 'information', 'warning', 'error', 'info', 'success'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filterType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="text-gray-700 py-2">Priority:</span>
          {['all', 'high', 'medium', 'low'].map((priority) => (
            <button
              key={priority}
              onClick={() => setFilterPriority(priority)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filterPriority === priority
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Active Alerts Preview */}
      {activeAlerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">Preview - Active Alerts on Website</h3>
          <div className="space-y-2">
            {activeAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm opacity-90">{alert.description}</p>
                  </div>
                  <button className="p-1 hover:bg-black/10 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Information Cards */}
      <div className="space-y-4">
        {filteredInfo.map((info) => {
          const isAlert = info.type !== 'information';
          return (
            <div
              key={info.id}
              className={`bg-white rounded-xl p-6 border transition-all ${
                info.isPinned ? 'border-blue-300 shadow-md' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    {info.isPinned && (
                      <Pin className="w-4 h-4 text-blue-600 fill-blue-600" />
                    )}
                    <h3 className="text-gray-900">{info.title}</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getPriorityColor(info.priority)}`}>
                      {info.priority}
                    </span>
                    {isAlert && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm capitalize ${
                        info.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        info.type === 'error' ? 'bg-red-100 text-red-700' :
                        info.type === 'success' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        Alert: {info.type}
                      </span>
                    )}
                    {isAlert && (
                      <button
                        onClick={() => toggleAlertStatus(info.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          info.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {info.isActive ? 'Active' : 'Inactive'}
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{info.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {info.targetAudience}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {info.date}
                    </div>
                    {info.expiresAt && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Expires: {info.expiresAt}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => togglePin(info.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      info.isPinned
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openEditModal(info)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(info.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">
                {editingInfo ? 'Edit Item' : 'Create New Item'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Type */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="information">Information</option>
                  <option value="warning">Alert - Warning</option>
                  <option value="error">Alert - Error</option>
                  <option value="info">Alert - Info</option>
                  <option value="success">Alert - Success</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter title..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter description..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Target Audience and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Target Audience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Alert specific fields */}
              {formData.type !== 'information' && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Expires At
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.expiresAt}
                      onChange={(e) => handleInputChange('expiresAt', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="text-gray-700">
                      Set alert as active (will be displayed on website)
                    </label>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {editingInfo ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}