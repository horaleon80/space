import { useQuery } from "@apollo/client";
import { GET_ROCKETS } from "../graphql/queries";
import { useView } from "../contexts/ViewContext";
import Card from "./Card";

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

const List = () => {
  const { viewMode, sortBy, showActiveOnly } = useView();
  const { loading, error, data } = useQuery(GET_ROCKETS);

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
        Error loading rockets: {error.message}
      </div>
    );
  }

  let rockets: Rocket[] = data?.rockets || [];

  if (showActiveOnly) {
    rockets = rockets.filter((rocket) => rocket.active);
  }

  rockets = [...rockets].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "cost":
        return a.cost_per_launch - b.cost_per_launch;
      case "success_rate":
        return b.success_rate_pct - a.success_rate_pct;
      case "first_flight":
        return (
          new Date(a.first_flight).getTime() -
          new Date(b.first_flight).getTime()
        );
      default:
        return 0;
    }
  });

  const gridClass =
    viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4";

  return (
    <div className={gridClass}>
      {rockets.length === 0 ? (
        <div className="text-center py-8 text-gray-500 col-span-full">
          No rockets found matching your criteria.
        </div>
      ) : (
        rockets.map((rocket) => (
          <Card key={rocket.id} rocket={rocket} viewMode={viewMode} />
        ))
      )}
    </div>
  );
};

export default List;
