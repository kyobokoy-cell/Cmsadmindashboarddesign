import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Calendar, Tag, X, Image as ImageIcon, Save, Type, MoveUp, MoveDown } from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'text' | 'image';
  content?: string;
  imageUrl?: string;
  imageLabel?: string;
}

const initialNews = [
  {
    id: 1,
    title: 'Pengumuman Ujian Semester Ganjil 2024',
    category: 'Akademik',
    author: 'Admin',
    date: '2024-12-10',
    status: 'Published',
    views: 1234,
    contentBlocks: [
      { id: '1', type: 'text' as const, content: 'Ujian semester ganjil akan dilaksanakan mulai tanggal 18-22 Desember 2024. Mohon siswa mempersiapkan diri dengan baik.' }
    ],
    image: '',
    excerpt: 'Ujian semester ganjil akan dilaksanakan mulai tanggal 18-22 Desember 2024.',
  },
  {
    id: 2,
    title: 'Penerimaan Siswa Baru Tahun Ajaran 2025/2026',
    category: 'Pengumuman',
    author: 'Admin',
    date: '2024-12-09',
    status: 'Published',
    views: 2156,
    contentBlocks: [
      { id: '1', type: 'text' as const, content: 'Pendaftaran siswa baru telah dibuka. Silakan mengunjungi website kami untuk informasi lebih lanjut.' }
    ],
    image: '',
    excerpt: 'Pendaftaran siswa baru telah dibuka untuk tahun ajaran 2025/2026.',
  },
  {
    id: 3,
    title: 'Lomba Sains Tingkat Nasional',
    category: 'Prestasi',
    author: 'Humas',
    date: '2024-12-08',
    status: 'Published',
    views: 876,
    contentBlocks: [
      { id: '1', type: 'text' as const, content: 'Selamat kepada tim sains sekolah kami yang berhasil meraih juara 1 tingkat nasional.' }
    ],
    image: '',
    excerpt: 'Tim sains sekolah meraih juara 1 tingkat nasional.',
  },
  {
    id: 4,
    title: 'Peringatan Hari Pendidikan Nasional',
    category: 'Event',
    author: 'Admin',
    date: '2024-12-07',
    status: 'Draft',
    views: 0,
    contentBlocks: [],
    image: '',
    excerpt: '',
  },
  {
    id: 5,
    title: 'Workshop Guru: Pembelajaran Digital',
    category: 'Pengembangan',
    author: 'Humas',
    date: '2024-12-06',
    status: 'Scheduled',
    views: 0,
    contentBlocks: [],
    image: '',
    excerpt: '',
  },
];

const categories = ['Semua', 'Akademik', 'Pengumuman', 'Prestasi', 'Event', 'Pengembangan'];

interface NewsFormData {
  id?: number;
  title: string;
  category: string;
  contentBlocks: ContentBlock[];
  excerpt: string;
  image: string;
  status: string;
  author: string;
  date: string;
}

export function NewsManagement() {
  const [news, setNews] = useState(initialNews);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsFormData | null>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    category: 'Akademik',
    contentBlocks: [],
    excerpt: '',
    image: '',
    status: 'Draft',
    author: 'Admin',
    date: new Date().toISOString().split('T')[0],
  });

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-700';
      case 'Draft':
        return 'bg-gray-100 text-gray-700';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const openCreateModal = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      category: 'Akademik',
      contentBlocks: [],
      excerpt: '',
      image: '',
      status: 'Draft',
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (newsItem: any) => {
    setEditingNews(newsItem);
    setFormData({
      id: newsItem.id,
      title: newsItem.title,
      category: newsItem.category,
      contentBlocks: newsItem.contentBlocks || [],
      excerpt: newsItem.excerpt,
      image: newsItem.image,
      status: newsItem.status,
      author: newsItem.author,
      date: newsItem.date,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingNews) {
      // Update existing news
      setNews(news.map(item => 
        item.id === editingNews.id 
          ? { ...item, ...formData, views: item.views }
          : item
      ));
    } else {
      // Create new news
      const newNews = {
        ...formData,
        id: Math.max(...news.map(n => n.id)) + 1,
        views: 0,
      };
      setNews([newNews, ...news]);
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this news?')) {
      setNews(news.filter(item => item.id !== id));
    }
  };

  const handleInputChange = (field: keyof NewsFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Content Block Functions
  const addTextBlock = () => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: 'text',
      content: ''
    };
    setFormData({
      ...formData,
      contentBlocks: [...formData.contentBlocks, newBlock]
    });
  };

  const addImageBlock = () => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: 'image',
      imageUrl: '',
      imageLabel: ''
    };
    setFormData({
      ...formData,
      contentBlocks: [...formData.contentBlocks, newBlock]
    });
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setFormData({
      ...formData,
      contentBlocks: formData.contentBlocks.map(block =>
        block.id === id ? { ...block, ...updates } : block
      )
    });
  };

  const deleteBlock = (id: string) => {
    setFormData({
      ...formData,
      contentBlocks: formData.contentBlocks.filter(block => block.id !== id)
    });
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = formData.contentBlocks.findIndex(block => block.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === formData.contentBlocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...formData.contentBlocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    
    setFormData({
      ...formData,
      contentBlocks: newBlocks
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 mb-2">News Management</h2>
          <p className="text-gray-600">Create and manage school news articles</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create News
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Total Articles</p>
          <p className="text-gray-900">{news.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Published</p>
          <p className="text-gray-900">{news.filter(n => n.status === 'Published').length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Drafts</p>
          <p className="text-gray-900">{news.filter(n => n.status === 'Draft').length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Total Views</p>
          <p className="text-gray-900">{news.reduce((sum, n) => sum + n.views, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-gray-700">Title</th>
              <th className="px-6 py-4 text-left text-gray-700">Category</th>
              <th className="px-6 py-4 text-left text-gray-700">Author</th>
              <th className="px-6 py-4 text-left text-gray-700">Date</th>
              <th className="px-6 py-4 text-left text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-gray-700">Views</th>
              <th className="px-6 py-4 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="text-gray-900">{item.title}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{item.author}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{item.views.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => openEditModal(item)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-gray-900">
                {editingNews ? 'Edit News' : 'Create New News'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Metadata */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-gray-900 mb-4">Basic Information</h4>
                    
                    {/* Title */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter news title..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.filter(c => c !== 'Semua').map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                    </div>

                    {/* Author */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Author <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Date */}
                    <div className="mb-4">
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

                    {/* Featured Image URL */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Featured Image URL
                      </label>
                      <div className="flex-1 relative">
                        <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => handleInputChange('image', e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {formData.image && (
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="mt-3 w-full h-32 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                          }}
                        />
                      )}
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Excerpt
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Short summary..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Content Builder */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-gray-900">Content Builder</h4>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={addTextBlock}
                          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                          <Type className="w-4 h-4" />
                          Add Text
                        </button>
                        <button
                          type="button"
                          onClick={addImageBlock}
                          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                          <ImageIcon className="w-4 h-4" />
                          Add Image
                        </button>
                      </div>
                    </div>

                    {/* Content Blocks */}
                    <div className="space-y-4">
                      {formData.contentBlocks.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                          <Type className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500 mb-2">No content blocks yet</p>
                          <p className="text-sm text-gray-400">Click "Add Text" or "Add Image" to start building your content</p>
                        </div>
                      ) : (
                        formData.contentBlocks.map((block, index) => (
                          <div key={block.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                {block.type === 'text' ? (
                                  <Type className="w-5 h-5 text-gray-600" />
                                ) : (
                                  <ImageIcon className="w-5 h-5 text-purple-600" />
                                )}
                                <span className="text-sm text-gray-700 capitalize">
                                  {block.type} Block
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => moveBlock(block.id, 'up')}
                                  disabled={index === 0}
                                  className="p-2 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                  <MoveUp className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveBlock(block.id, 'down')}
                                  disabled={index === formData.contentBlocks.length - 1}
                                  className="p-2 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                  <MoveDown className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteBlock(block.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {block.type === 'text' ? (
                              <textarea
                                value={block.content || ''}
                                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                                placeholder="Enter your text content here..."
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white"
                              />
                            ) : (
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-sm text-gray-700 mb-1">
                                    Image URL
                                  </label>
                                  <input
                                    type="text"
                                    value={block.imageUrl || ''}
                                    onChange={(e) => updateBlock(block.id, { imageUrl: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm text-gray-700 mb-1">
                                    Image Label / Caption
                                  </label>
                                  <input
                                    type="text"
                                    value={block.imageLabel || ''}
                                    onChange={(e) => updateBlock(block.id, { imageLabel: e.target.value })}
                                    placeholder="Enter image caption or source..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                  />
                                </div>
                                {block.imageUrl && (
                                  <div className="mt-2">
                                    <img
                                      src={block.imageUrl}
                                      alt={block.imageLabel || 'Content image'}
                                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                                      }}
                                    />
                                    {block.imageLabel && (
                                      <p className="text-sm text-gray-600 mt-2 italic">{block.imageLabel}</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {editingNews ? 'Update News' : 'Publish News'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <div className="ml-auto text-sm text-gray-500">
                  {formData.contentBlocks.length} content block{formData.contentBlocks.length !== 1 ? 's' : ''}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}