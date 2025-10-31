import { useState } from 'react';
import { FaTruck, FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

export default function Shipping() {
  const [showModal, setShowModal] = useState(false);

  const shippingMethods = [
    {
      id: 1,
      name: 'Standard Shipping',
      provider: 'Thailand Post',
      cost: 0,
      estimatedDays: '3-5',
      status: 'active',
      orders: 234
    },
    {
      id: 2,
      name: 'Express Delivery',
      provider: 'Kerry Express',
      cost: 50,
      estimatedDays: '1-2',
      status: 'active',
      orders: 189
    },
    {
      id: 3,
      name: 'Same Day Delivery',
      provider: 'Flash Express',
      cost: 100,
      estimatedDays: '0-1',
      status: 'active',
      orders: 67
    },
    {
      id: 4,
      name: 'Economy Shipping',
      provider: 'Ninja Van',
      cost: 30,
      estimatedDays: '5-7',
      status: 'inactive',
      orders: 45
    },
  ];

  const zones = [
    { id: 1, name: 'Bangkok & Vicinity', provinces: 6, surcharge: 0 },
    { id: 2, name: 'Central Region', provinces: 21, surcharge: 20 },
    { id: 3, name: 'Northern Region', provinces: 17, surcharge: 30 },
    { id: 4, name: 'Northeastern Region', provinces: 20, surcharge: 40 },
    { id: 5, name: 'Southern Region', provinces: 14, surcharge: 50 },
  ];

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-500/20 text-green-400 border-green-500/50'
      : 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Shipping Management</h1>
          <p className="text-gray-400">Manage shipping methods and delivery zones</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          <FaPlus />
          Add Method
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Shipping Methods</p>
          <p className="text-3xl font-bold text-white">{shippingMethods.length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-green-500/50">
          <p className="text-gray-400 text-sm mb-1">Active Methods</p>
          <p className="text-3xl font-bold text-green-400">
            {shippingMethods.filter(m => m.status === 'active').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-white">
            {shippingMethods.reduce((sum, m) => sum + m.orders, 0)}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Delivery Zones</p>
          <p className="text-3xl font-bold text-white">{zones.length}</p>
        </div>
      </div>

      {/* Shipping Methods */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Shipping Methods</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {shippingMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <FaTruck className="text-blue-400 text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-white">{method.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(method.status)}`}>
                        {method.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{method.provider}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs mb-1">Cost</p>
                    <p className="text-white font-bold">
                      {method.cost === 0 ? 'Free' : `฿${method.cost}`}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs mb-1">Delivery Time</p>
                    <p className="text-white font-bold">{method.estimatedDays} days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs mb-1">Orders</p>
                    <p className="text-white font-bold">{method.orders}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition">
                      <FaEdit />
                    </button>
                    <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition">
                      {method.status === 'active' ? <FaToggleOn className="text-xl" /> : <FaToggleOff className="text-xl" />}
                    </button>
                    <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Zones */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Delivery Zones</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Zone</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Provinces</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Surcharge</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {zones.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{zone.name}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{zone.provinces} provinces</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${zone.surcharge === 0 ? 'text-green-400' : 'text-white'}`}>
                      {zone.surcharge === 0 ? 'Free' : `+฿${zone.surcharge}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Method Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-xl w-full border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Add Shipping Method</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Method Name *
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Express Delivery"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Provider *
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Kerry Express"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Cost (฿) *
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="50"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Delivery Time *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="1-2 days"
                  />
                </div>
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
                Add Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

