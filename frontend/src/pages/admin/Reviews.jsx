import { useState } from 'react';
import { FaStar, FaCheck, FaTimes, FaReply } from 'react-icons/fa';

export default function Reviews() {
  const [selectedTab, setSelectedTab] = useState('all');

  const reviews = [
    {
      id: 1,
      product: 'Stussy Basic Tee',
      customer: 'John Doe',
      rating: 5,
      comment: 'Amazing quality! Love the fit and fabric. Highly recommended!',
      images: 2,
      status: 'pending',
      date: '2025-10-28'
    },
    {
      id: 2,
      product: 'ASSC Hoodie Black',
      customer: 'Jane Smith',
      rating: 4,
      comment: 'Great hoodie, but a bit pricey. Quality is top notch though.',
      images: 1,
      status: 'approved',
      date: '2025-10-27'
    },
    {
      id: 3,
      product: 'Vlone Friends Tee',
      customer: 'Mike Wilson',
      rating: 3,
      comment: 'Expected better quality for the price. Design is cool though.',
      images: 0,
      status: 'approved',
      date: '2025-10-26'
    },
    {
      id: 4,
      product: 'Gallery Dept Jeans',
      customer: 'Sarah Johnson',
      rating: 1,
      comment: 'Very disappointed. Size was way off and quality is poor.',
      images: 3,
      status: 'rejected',
      date: '2025-10-25'
    },
  ];

  const tabs = [
    { key: 'all', label: 'All Reviews', count: reviews.length },
    { key: 'pending', label: 'Pending', count: reviews.filter(r => r.status === 'pending').length },
    { key: 'approved', label: 'Approved', count: reviews.filter(r => r.status === 'approved').length },
    { key: 'rejected', label: 'Rejected', count: reviews.filter(r => r.status === 'rejected').length },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-400';
    if (rating >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Customer Reviews</h1>
        <p className="text-gray-400">Manage product reviews and ratings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Reviews</p>
          <p className="text-3xl font-bold text-white">{reviews.length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-yellow-500/50">
          <p className="text-gray-400 text-sm mb-1">Avg Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-yellow-400">{avgRating}</p>
            <FaStar className="text-yellow-400 text-xl" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-yellow-500/50">
          <p className="text-gray-400 text-sm mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-400">
            {reviews.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-green-500/50">
          <p className="text-gray-400 text-sm mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-400">
            {reviews.filter(r => r.status === 'approved').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-red-500/50">
          <p className="text-gray-400 text-sm mb-1">Rejected</p>
          <p className="text-3xl font-bold text-red-400">
            {reviews.filter(r => r.status === 'rejected').length}
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

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{review.customer}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{review.product}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? getRatingColor(review.rating) : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className={`font-bold ${getRatingColor(review.rating)}`}>
                    {review.rating}/5
                  </span>
                  <span className="text-gray-500 text-sm">• {review.date}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{review.comment}</p>

            {review.images > 0 && (
              <div className="flex gap-2 mb-4">
                {[...Array(review.images)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-700 rounded-lg" />
                ))}
              </div>
            )}

            <div className="flex gap-2">
              {review.status === 'pending' && (
                <>
                  <button className="flex items-center gap-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 px-4 py-2 rounded-lg transition text-sm font-medium">
                    <FaCheck />
                    Approve
                  </button>
                  <button className="flex items-center gap-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition text-sm font-medium">
                    <FaTimes />
                    Reject
                  </button>
                </>
              )}
              <button className="flex items-center gap-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 py-2 rounded-lg transition text-sm font-medium">
                <FaReply />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

