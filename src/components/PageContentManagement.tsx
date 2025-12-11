import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Search } from 'lucide-react';

const initialPages = [
  { id: 1, title: 'Beranda', slug: '/home', status: 'Published', lastModified: '2024-12-10' },
  { id: 2, title: 'Tentang Kami', slug: '/about', status: 'Published', lastModified: '2024-12-09' },
  { id: 3, title: 'Program Akademik', slug: '/academic', status: 'Published', lastModified: '2024-12-08' },
  { id: 4, title: 'Fasilitas', slug: '/facilities', status: 'Draft', lastModified: '2024-12-07' },
  { id: 5, title: 'Kontak', slug: '/contact', status: 'Published', lastModified: '2024-12-06' },
];

export function PageContentManagement() {
  const [pages, setPages] = useState(initialPages);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 mb-2">Page Content Management</h2>
          <p className="text-gray-600">Manage your website pages and content</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Create New Page
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-gray-700">Page Title</th>
              <th className="px-6 py-4 text-left text-gray-700">Slug</th>
              <th className="px-6 py-4 text-left text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-gray-700">Last Modified</th>
              <th className="px-6 py-4 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPages.map((page) => (
              <tr key={page.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{page.title}</td>
                <td className="px-6 py-4 text-gray-600">{page.slug}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    page.status === 'Published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{page.lastModified}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
