import React from "react";

interface Rocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  description: string;
}

interface RocketDetailProps {
  rocket: Rocket;
  onClose: () => void;
}

const Detail: React.FC<RocketDetailProps> = ({ rocket, onClose }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {rocket.name}
              </h2>
              <p className="text-gray-600 mt-1">{rocket.type}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              X
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Status
                </h3>
                {rocket.active ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✓ Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Inactive
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Company
                </h3>
                <p className="text-gray-900">{rocket.company}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Country
                </h3>
                <p className="text-gray-900">{rocket.country}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  First Flight
                </h3>
                <p className="text-gray-900">
                  {formatDate(rocket.first_flight)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Cost per Launch
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(rocket.cost_per_launch)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Success Rate
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {rocket.success_rate_pct}%
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {rocket.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
