import React from "react";

interface Launch {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_success: boolean | null;
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  links: {
    mission_patch_small: string | null;
    article_link: string | null;
  };
  details: string | null;
}

interface LaunchCardProps {
  launch: Launch;
  onClick: () => void;
}

const Card: React.FC<LaunchCardProps> = ({ launch, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {launch.mission_name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatDate(launch.launch_date_local)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {launch.rocket.rocket_name} ({launch.rocket.rocket_type})
          </p>
          {launch.details && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {launch.details}
            </p>
          )}
          <div className="mt-2">
            {launch.launch_success === null ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Unknown
              </span>
            ) : launch.launch_success ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Success
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                ✗ Failure
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
