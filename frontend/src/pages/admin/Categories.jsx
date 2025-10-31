import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFolder, FaFolderOpen } from 'react-icons/fa';

export default function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const categories = [
    { id: 1, name: 'T-Shirts', parent: null, productsCount: 89, status: 'active', order: 1 },
    { id: 2, name: 'Hoodies', parent: null, productsCount: 67, status: 'active', order: 2 },
    { id: 3, name: 'Pants', parent: null, productsCount: 54, status: 'active', order: 3 },
    { id: 4, name: 'Jackets', parent: null, productsCount: 42, status: 'active', order: 4 },
    { id: 5, name: 'Accessories', parent: null, productsCount: 38, status: 'active', order: 5 },
    { id: 6, name: 'Shoes', parent: null, productsCount: 45, status: 'active', order: 6 },
    { id: 7, name: 'Denim', parent: 3, productsCount: 23, status: 'active', order: 1 },
    { id: 8, name: 'Cargo', parent: 3, productsCount: 18, status: 'active', order: 2 },
  ];

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-500/20 text-green-400'
      : 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Category Management</h1>
          <p className="text-gray-400">Organize products into categories</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          <FaPlus />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Categories</p>
          <p className="text-3xl font-bold text-white">{categories.length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Parent Categories</p>
          <p className="text-3xl font-bold text-white">
            {categories.filter(c => !c.parent).length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Sub Categories</p>
          <p className="text-3xl font-bold text-white">
            {categories.filter(c => c.parent).length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold text-white">
            {categories.reduce((sum, c) => sum + c.productsCount, 0)}
          </p>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Category</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Parent</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Products</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Order</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Status</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {categories.filter(c => !c.parent).map((category) => (
              <>
                <tr key={category.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FaFolderOpen className="text-yellow-400 text-xl" />
                      <span className="text-white font-semibold">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">-</td>
                  <td className="px-6 py-4 text-white font-medium">{category.productsCount}</td>
                  <td className="px-6 py-4 text-gray-300">#{category.order}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <FaEdit />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Sub-categories */}
                {categories.filter(sub => sub.parent === category.id).map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-750 bg-gray-850">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 pl-8">
                        <FaFolder className="text-blue-400" />
                        <span className="text-gray-300">{sub.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{category.name}</td>
                    <td className="px-6 py-4 text-white font-medium">{sub.productsCount}</td>
                    <td className="px-6 py-4 text-gray-300">#{sub.order}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-blue-400 hover:text-blue-300">
                          <FaEdit />
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-xl w-full border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Parent Category
                </label>
                <select className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white">
                  <option value="">None (Parent Category)</option>
                  {categories.filter(c => !c.parent).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                    defaultValue="1"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Status
                  </label>
                  <select className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

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
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

