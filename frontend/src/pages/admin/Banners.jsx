import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaImage, FaArrowUp, FaArrowDown, FaLink } from 'react-icons/fa';

export default function Banners() {
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const banners = [
    {
      id: 1,
      title: 'Summer Collection 2025',
      subtitle: 'New Arrivals',
      image: '/src/assets/Banner.webp',
      link: '/products?category=new',
      order: 1,
      status: 'active',
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      clicks: 1234
    },
    {
      id: 2,
      title: 'Street Fashion Sale',
      subtitle: 'Up to 50% Off',
      image: '/src/assets/Banner1.webp',
      link: '/products?sale=true',
      order: 2,
      status: 'active',
      startDate: '2025-10-15',
      endDate: '2025-11-30',
      clicks: 892
    },
    {
      id: 3,
      title: 'Limited Edition Drop',
      subtitle: 'Exclusive Releases',
      image: '/src/assets/Banner.webp',
      link: '/products?limited=true',
      order: 3,
      status: 'inactive',
      startDate: '2025-11-01',
      endDate: '2025-11-15',
      clicks: 456
    },
  ];

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-500/20 text-green-400 border-green-500/50'
      : 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Banner Management</h1>
          <p className="text-gray-400">Manage hero sliders and promotional banners</p>
        </div>
        <button
          onClick={() => {
            setEditingBanner(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          <FaPlus />
          Add Banner
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Banners</p>
          <p className="text-3xl font-bold text-white">{banners.length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-green-500/50">
          <p className="text-gray-400 text-sm mb-1">Active Banners</p>
          <p className="text-3xl font-bold text-green-400">
            {banners.filter(b => b.status === 'active').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Clicks</p>
          <p className="text-3xl font-bold text-white">
            {banners.reduce((sum, b) => sum + b.clicks, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Avg CTR</p>
          <p className="text-3xl font-bold text-white">
            {((banners.reduce((sum, b) => sum + b.clicks, 0) / banners.length) / 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Banners List */}
      <div className="space-y-4">
        {banners.map((banner, index) => (
          <div 
            key={banner.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              {/* Banner Preview */}
              <div className="lg:col-span-1">
                <div className="relative rounded-lg overflow-hidden h-48 bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <FaImage className="text-6xl" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(banner.status)}`}>
                      {banner.status}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      Order: #{banner.order}
                    </span>
                  </div>
                </div>
              </div>

              {/* Banner Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{banner.title}</h3>
                    <p className="text-gray-400">{banner.subtitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Link</p>
                    <div className="flex items-center gap-2">
                      <FaLink className="text-gray-500" />
                      <p className="text-white text-sm font-mono">{banner.link}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Clicks</p>
                    <p className="text-white text-lg font-bold">{banner.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Start Date</p>
                    <p className="text-white">{banner.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">End Date</p>
                    <p className="text-white">{banner.endDate}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="flex items-center gap-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 py-2 rounded-lg transition text-sm font-medium"
                  >
                    <FaEdit />
                    Edit
                  </button>
                  <button className="flex items-center gap-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 px-4 py-2 rounded-lg transition text-sm font-medium">
                    <FaEye />
                    Preview
                  </button>
                  {index > 0 && (
                    <button className="bg-gray-700 text-white hover:bg-gray-600 px-3 py-2 rounded-lg transition">
                      <FaArrowUp />
                    </button>
                  )}
                  {index < banners.length - 1 && (
                    <button className="bg-gray-700 text-white hover:bg-gray-600 px-3 py-2 rounded-lg transition">
                      <FaArrowDown />
                    </button>
                  )}
                  <button className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-2 rounded-lg transition ml-auto">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-3xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  defaultValue={editingBanner?.title}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter banner title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  defaultValue={editingBanner?.subtitle}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter banner subtitle"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Banner Image *
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition cursor-pointer">
                  <FaImage className="text-gray-500 text-4xl mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-1">Click to upload image</p>
                  <p className="text-gray-500 text-xs">Recommended: 1920x600px, PNG/JPG up to 10MB</p>
                </div>
              </div>

              {/* Link URL */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Link URL
                </label>
                <input
                  type="text"
                  defaultValue={editingBanner?.link}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="/products?category=new"
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    defaultValue={editingBanner?.startDate}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    defaultValue={editingBanner?.endDate}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>

              {/* Order & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    defaultValue={editingBanner?.order || banners.length + 1}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    defaultValue={editingBanner?.status || 'active'}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-700 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                {editingBanner ? 'Update Banner' : 'Add Banner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

