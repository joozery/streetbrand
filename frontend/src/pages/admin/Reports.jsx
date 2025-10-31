import { FaDownload, FaCalendar, FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';

export default function Reports() {
  const reportTypes = [
    {
      id: 1,
      title: 'Sales Report',
      description: 'Detailed sales breakdown by date, product, and category',
      icon: FaChartLine,
      color: 'from-green-500 to-emerald-600',
      lastGenerated: '2025-10-30'
    },
    {
      id: 2,
      title: 'Revenue Report',
      description: 'Revenue analysis and profit margins',
      icon: FaChartBar,
      color: 'from-blue-500 to-cyan-600',
      lastGenerated: '2025-10-29'
    },
    {
      id: 3,
      title: 'Product Performance',
      description: 'Best and worst performing products',
      icon: FaChartPie,
      color: 'from-purple-500 to-pink-600',
      lastGenerated: '2025-10-28'
    },
    {
      id: 4,
      title: 'Customer Report',
      description: 'Customer behavior and demographics',
      icon: FaChartBar,
      color: 'from-orange-500 to-red-600',
      lastGenerated: '2025-10-27'
    },
    {
      id: 5,
      title: 'Inventory Report',
      description: 'Stock levels and movement analysis',
      icon: FaChartLine,
      color: 'from-indigo-500 to-purple-600',
      lastGenerated: '2025-10-26'
    },
    {
      id: 6,
      title: 'Order Report',
      description: 'Order statistics and fulfillment metrics',
      icon: FaChartPie,
      color: 'from-pink-500 to-rose-600',
      lastGenerated: '2025-10-25'
    },
  ];

  const quickStats = [
    { label: 'Today Revenue', value: '฿45,678', change: '+12%', trend: 'up' },
    { label: 'Today Orders', value: '234', change: '+8%', trend: 'up' },
    { label: 'New Customers', value: '45', change: '+23%', trend: 'up' },
    { label: 'Conversion Rate', value: '3.2%', change: '-0.5%', trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
        <p className="text-gray-400">Generate and download business reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Date Range Selector */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <FaCalendar />
            <span className="font-medium">Select Date Range:</span>
          </div>
          <input
            type="date"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
            Apply
          </button>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition overflow-hidden"
          >
            <div className={`h-32 bg-gradient-to-br ${report.color} flex items-center justify-center`}>
              <report.icon className="text-white text-5xl" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{report.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{report.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Last: {report.lastGenerated}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2">
                  <FaDownload />
                  Generate
                </button>
                <button className="px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Recent Reports</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
                <div>
                  <p className="text-white font-medium">Sales Report - October 2025</p>
                  <p className="text-gray-400 text-sm">Generated on 2025-10-{30 - idx}</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 py-2 rounded-lg transition text-sm font-medium">
                  <FaDownload />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

