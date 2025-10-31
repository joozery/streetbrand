import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaImage, FaClock, FaTag } from 'react-icons/fa';

export default function Blogs() {
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [selectedTab, setSelectedTab] = useState('all');

  const blogs = [
    {
      id: 1,
      title: 'Street Style Trends 2025',
      excerpt: 'Discover the hottest street fashion trends that are taking over...',
      image: '/src/assets/blog1.png',
      author: 'Admin',
      category: 'Fashion Trends',
      status: 'published',
      views: 2453,
      publishedAt: '2025-10-25',
      tags: ['streetwear', 'trends', 'fashion']
    },
    {
      id: 2,
      title: 'How to Style Oversized Hoodies',
      excerpt: 'The ultimate guide to wearing oversized hoodies with confidence...',
      image: '/src/assets/blog2.png',
      author: 'Admin',
      category: 'Style Guide',
      status: 'published',
      views: 1829,
      publishedAt: '2025-10-20',
      tags: ['hoodies', 'style', 'tips']
    },
    {
      id: 3,
      title: 'Limited Edition Drops Coming Soon',
      excerpt: 'Get ready for exclusive releases from top brands...',
      image: '/src/assets/blog3.png',
      author: 'Admin',
      category: 'News',
      status: 'draft',
      views: 0,
      publishedAt: null,
      tags: ['drops', 'limited', 'news']
    },
  ];

  const tabs = [
    { key: 'all', label: 'All Posts', count: blogs.length },
    { key: 'published', label: 'Published', count: blogs.filter(b => b.status === 'published').length },
    { key: 'draft', label: 'Drafts', count: blogs.filter(b => b.status === 'draft').length },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
          <p className="text-gray-400">Create and manage blog posts</p>
        </div>
        <button
          onClick={() => {
            setEditingBlog(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          <FaPlus />
          New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Posts</p>
          <p className="text-3xl font-bold text-white">{blogs.length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-green-500/50">
          <p className="text-gray-400 text-sm mb-1">Published</p>
          <p className="text-3xl font-bold text-green-400">
            {blogs.filter(b => b.status === 'published').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Views</p>
          <p className="text-3xl font-bold text-white">
            {blogs.reduce((sum, b) => sum + b.views, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-yellow-500/50">
          <p className="text-gray-400 text-sm mb-1">Drafts</p>
          <p className="text-3xl font-bold text-yellow-400">
            {blogs.filter(b => b.status === 'draft').length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl p-2 border border-gray-700">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedTab === tab.key
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition overflow-hidden"
          >
            {/* Featured Image */}
            <div className="h-48 bg-gray-900 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <FaImage className="text-6xl" />
              </div>
              <div className="absolute top-2 right-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(blog.status)}`}>
                  {blog.status}
                </span>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <FaTag />
                <span>{blog.category}</span>
                <span>•</span>
                <FaClock />
                <span>{blog.publishedAt || 'Not published'}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                {blog.title}
              </h3>

              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {blog.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4 pb-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <FaEye />
                  <span>{blog.views.toLocaleString()} views</span>
                </div>
                <span>by {blog.author}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 py-2 rounded-lg transition text-sm font-medium"
                >
                  <FaEdit className="inline mr-2" />
                  Edit
                </button>
                <button className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 py-2 rounded-lg transition text-sm font-medium">
                  <FaEye className="inline mr-2" />
                  View
                </button>
                <button className="px-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {editingBlog ? 'Edit Post' : 'Create New Post'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  defaultValue={editingBlog?.title}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter post title"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Excerpt
                </label>
                <textarea
                  defaultValue={editingBlog?.excerpt}
                  rows="2"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Short description..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Content *
                </label>
                <textarea
                  rows="8"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white font-mono text-sm"
                  placeholder="Write your blog content here..."
                />
                <p className="text-gray-500 text-xs mt-1">Rich text editor placeholder</p>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Featured Image
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition cursor-pointer">
                  <FaImage className="text-gray-500 text-4xl mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-1">Click to upload image</p>
                  <p className="text-gray-500 text-xs">Recommended: 1200x630px</p>
                </div>
              </div>

              {/* Category & Tags */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    defaultValue={editingBlog?.category}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option>Fashion Trends</option>
                    <option>Style Guide</option>
                    <option>News</option>
                    <option>Brand Stories</option>
                    <option>Tips & Tricks</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    defaultValue={editingBlog?.tags.join(', ')}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>

              {/* SEO Settings */}
              <div className="border border-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">SEO Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Meta Title</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                      placeholder="SEO title"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Meta Description</label>
                    <textarea
                      rows="2"
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                      placeholder="SEO description"
                    />
                  </div>
                </div>
              </div>

              {/* Status & Publish Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    defaultValue={editingBlog?.status || 'draft'}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    defaultValue={editingBlog?.publishedAt}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  />
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
              <button className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500/30 transition">
                Save as Draft
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                {editingBlog ? 'Update' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

