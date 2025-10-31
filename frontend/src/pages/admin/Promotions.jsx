import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaPercent, FaGift, FaCopy } from 'react-icons/fa';

export default function Promotions() {
  const [showModal, setShowModal] = useState(false);

  const promotions = [
    {
      id: 1,
      code: 'SUMMER2025',
      type: 'percentage',
      value: 20,
      minAmount: 1000,
      maxUses: 100,
      used: 45,
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      status: 'active'
    },
    {
      id: 2,
      code: 'WELCOME50',
      type: 'fixed',
      value: 50,
      minAmount: 500,
      maxUses: 500,
      used: 234,
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'active'
    },
    {
      id: 3,
      code: 'FLASH70',
      type: 'percentage',
      value: 70,
      minAmount: 2000,
      maxUses: 50,
      used: 50,
      startDate: '2025-10-15',
      endDate: '2025-10-16',
      status: 'expired'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'expired':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'inactive':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Promotions & Discounts</h1>
          <p className="text-gray-400">Manage discount codes and special offers</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          <FaPlus />
          Create Promotion
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Promotions</p>
          <p className="text-3xl font-bold text-white">{promotions.length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-green-500/50">
          <p className="text-gray-400 text-sm mb-1">Active</p>
          <p className="text-3xl font-bold text-green-400">
            {promotions.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Uses</p>
          <p className="text-3xl font-bold text-white">
            {promotions.reduce((sum, p) => sum + p.used, 0)}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Avg Usage Rate</p>
          <p className="text-3xl font-bold text-white">
            {Math.round((promotions.reduce((sum, p) => sum + (p.used / p.maxUses * 100), 0) / promotions.length))}%
          </p>
        </div>
      </div>

      {/* Promotions List */}
      <div className="space-y-4">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      {promo.type === 'percentage' ? (
                        <FaPercent className="text-purple-400 text-xl" />
                      ) : (
                        <FaGift className="text-purple-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-white font-mono">{promo.code}</h3>
                        <button className="text-gray-400 hover:text-white transition">
                          <FaCopy />
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {promo.type === 'percentage' ? `${promo.value}% Discount` : `฿${promo.value} Off`}
                      </p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(promo.status)}`}>
                    {promo.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Min Amount</p>
                    <p className="text-white font-semibold">฿{promo.minAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Usage</p>
                    <p className="text-white font-semibold">{promo.used} / {promo.maxUses}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(promo.used / promo.maxUses) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Start Date</p>
                    <p className="text-white">{promo.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">End Date</p>
                    <p className="text-white">{promo.endDate}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 py-2 rounded-lg transition text-sm font-medium flex items-center gap-2">
                    <FaEdit />
                    Edit
                  </button>
                  <button className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition text-sm font-medium flex items-center gap-2">
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Create Promotion</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Promo Code *
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white font-mono"
                  placeholder="PROMO2025"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Discount Type *
                  </label>
                  <select className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (฿)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Min Amount (฿)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Max Uses
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  />
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
                Create Promotion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

