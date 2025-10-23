import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LAUNCHES } from "../graphql/queries";
import { useFilter } from "../contexts/FilterContext";
import Card from "./Card";

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

interface LaunchesListProps {
  onSelectLaunch: (launch: Launch) => void;
}

const List: React.FC<LaunchesListProps> = ({ onSelectLaunch }) => {
  const { searchTerm, filterSuccess, limit } = useFilter();
  const { loading, error, data } = useQuery(GET_LAUNCHES, {
    variables: { limit },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error loading launches: {error.message}
      </div>
    );
  }

  let launches: Launch[] = data?.launchesPast || [];

  if (searchTerm) {
    launches = launches.filter((launch) =>
      launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filterSuccess !== "all") {
    launches = launches.filter((launch) =>
      filterSuccess === "success"
        ? launch.launch_success === true
        : launch.launch_success === false
    );
  }

  return (
    <div className="space-y-4">
      {launches.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No launches found matching your criteria.
        </div>
      ) : (
        launches.map((launch) => (
          <Card
            key={launch.id}
            launch={launch}
            onClick={() => onSelectLaunch(launch)}
          />
        ))
      )}
    </div>
  );
};

export default List;
