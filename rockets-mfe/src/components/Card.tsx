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

interface RocketCardProps {
  rocket: Rocket;
  viewMode: "grid" | "list";
}

const Card: React.FC<RocketCardProps> = ({ rocket, viewMode }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {rocket.name}
              </h3>
              {rocket.active ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Inactive
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{rocket.type}</p>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {rocket.description}
            </p>
          </div>
          <div className="text-right ml-4">
            <p className="text-sm text-gray-500">Cost per Launch</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(rocket.cost_per_launch)}
            </p>
            <p className="text-sm text-gray-500 mt-2">Success Rate</p>
            <p className="text-lg font-semibold text-green-600">
              {rocket.success_rate_pct}%
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{rocket.name}</h3>
        {rocket.active ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inactive
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-4">{rocket.type}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Company:</span>
          <span className="font-medium text-gray-900">{rocket.company}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Country:</span>
          <span className="font-medium text-gray-900">{rocket.country}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">First Flight:</span>
          <span className="font-medium text-gray-900">
            {new Date(rocket.first_flight).getFullYear()}
          </span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Cost per Launch</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(rocket.cost_per_launch)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Success Rate</p>
            <p className="text-lg font-semibold text-green-600">
              {rocket.success_rate_pct}%
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4 line-clamp-3">
        {rocket.description}
      </p>
    </div>
  );
};

export default Card;
