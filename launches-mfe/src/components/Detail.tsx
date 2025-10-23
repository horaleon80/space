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

interface LaunchDetailProps {
  launch: Launch;
  onClose: () => void;
}

const Detail: React.FC<LaunchDetailProps> = ({ launch, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg p-5 shadow-lg mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          {launch.links.mission_patch_small && (
            <img
              src={launch.links.mission_patch_small}
              alt={launch.mission_name}
              className="w-14 h-14 object-contain rounded-lg bg-white p-2 border border-gray-200"
            />
          )}
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {launch.mission_name}
            </h3>
            <p className="text-xs text-gray-600">
              {formatDate(launch.launch_date_local)}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded"
          aria-label="Close details"
        >
          X
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Rocket
          </p>
          <p className="text-sm text-gray-900 font-medium">
            {launch.rocket.rocket_name}
          </p>
          <p className="text-xs text-gray-600">{launch.rocket.rocket_type}</p>
        </div>

        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Status
          </p>
          {launch.launch_success === null ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              Unknown
            </span>
          ) : launch.launch_success ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              ✓ Success
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
              ✗ Failed
            </span>
          )}
        </div>
      </div>

      {launch.details && (
        <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Details
          </p>
          <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
            {launch.details}
          </p>
        </div>
      )}

      {launch.links.article_link && (
        <a
          href={launch.links.article_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-medium"
        >
          <span>Read Article</span>
        </a>
      )}
    </div>
  );
};

export default Detail;
