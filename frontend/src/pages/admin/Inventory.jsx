import { FaWarehouse, FaExclamationTriangle, FaPlus, FaMinus, FaDownload } from 'react-icons/fa';

export default function Inventory() {
  const inventory = [
    { id: 1, product: 'Stussy Basic Tee', sku: 'STY-001', stock: 45, reserved: 5, available: 40, minStock: 10, status: 'good' },
    { id: 2, product: 'ASSC Hoodie Black', sku: 'ASSC-002', stock: 8, reserved: 2, available: 6, minStock: 10, status: 'low' },
    { id: 3, product: 'Vlone Friends Tee', sku: 'VLN-003', stock: 0, reserved: 0, available: 0, minStock: 5, status: 'out' },
    { id: 4, product: 'Gallery Dept Jeans', sku: 'GLD-004', stock: 15, reserved: 3, available: 12, minStock: 5, status: 'good' },
    { id: 5, product: 'Essentials Hoodie', sku: 'ESS-005', stock: 32, reserved: 8, available: 24, minStock: 15, status: 'good' },
  ];

  const getStockStatus = (status) => {
    switch (status) {
      case 'good':
        return { color: 'bg-green-500/20 text-green-400', label: 'Good Stock' };
      case 'low':
        return { color: 'bg-yellow-500/20 text-yellow-400', label: 'Low Stock' };
      case 'out':
        return { color: 'bg-red-500/20 text-red-400', label: 'Out of Stock' };
      default:
        return { color: 'bg-gray-500/20 text-gray-400', label: 'Unknown' };
    }
  };

  const totalStock = inventory.reduce((sum, item) => sum + item.stock, 0);
  const totalAvailable = inventory.reduce((sum, item) => sum + item.available, 0);
  const lowStockCount = inventory.filter(item => item.status === 'low').length;
  const outOfStockCount = inventory.filter(item => item.status === 'out').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Inventory Management</h1>
          <p className="text-gray-400">Track and manage product stock levels</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition">
            <FaDownload />
            Export
          </button>
          <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            <FaPlus />
            Add Stock
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <FaWarehouse className="text-blue-400 text-2xl" />
            <p className="text-gray-400 text-sm">Total Stock</p>
          </div>
          <p className="text-3xl font-bold text-white">{totalStock}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-green-500/50">
          <p className="text-gray-400 text-sm mb-2">Available</p>
          <p className="text-3xl font-bold text-green-400">{totalAvailable}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-yellow-500/50">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle className="text-yellow-400" />
            <p className="text-gray-400 text-sm">Low Stock</p>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{lowStockCount}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-red-500/50">
          <p className="text-gray-400 text-sm mb-2">Out of Stock</p>
          <p className="text-3xl font-bold text-red-400">{outOfStockCount}</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-yellow-400 text-xl" />
            <div>
              <p className="text-yellow-400 font-semibold">Low Stock Alert!</p>
              <p className="text-gray-300 text-sm">{lowStockCount} products are running low on stock. Please restock soon.</p>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Product</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">SKU</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Total Stock</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Reserved</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Available</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Min Stock</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Status</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {inventory.map((item) => {
                const statusInfo = getStockStatus(item.status);
                return (
                  <tr key={item.id} className="hover:bg-gray-750 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{item.product}</p>
                        <p className="text-gray-400 text-sm">ID: {item.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-gray-300">{item.sku}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-bold text-lg">{item.stock}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{item.reserved}</td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${
                        item.available === 0 ? 'text-red-400' :
                        item.available < item.minStock ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {item.available}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{item.minStock}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition">
                          <FaPlus />
                        </button>
                        <button className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition">
                          <FaMinus />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock History */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Recent Stock Movements</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${idx % 2 === 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {idx % 2 === 0 ? (
                      <FaPlus className="text-green-400" />
                    ) : (
                      <FaMinus className="text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">Stussy Basic Tee</p>
                    <p className="text-gray-400 text-sm">
                      {idx % 2 === 0 ? '+' : '-'}15 units • 2025-10-{30 - idx}
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">by Admin</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

