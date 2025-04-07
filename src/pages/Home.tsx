import { useEffect, useState } from "react";
import { fetchNEOs } from "../services/neoService";
import NEOBarChart from "../components/NeoBarChart";
import { ChartData } from "../types/chart";
import { NEO } from "../types/neo";

const Home: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const neos: NEO[] = await fetchNEOs();

        const formatted = neos
          .map((neo) => {
            const min = neo.estimated_diameter.kilometers.estimated_diameter_min;
            const max = neo.estimated_diameter.kilometers.estimated_diameter_max;
            return {
              name: `${neo.name}`,
              minDiameter: min,
              maxDiameter: max,
              avg: (min + max) / 2,
            };
          })
          .sort((a, b) => b.avg - a.avg)
          .slice(0, 10); // top 10 NEOs

        setData(formatted);
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Near-Earth Objects Diameters</h2>
      <NEOBarChart data={data} />
    </div>
  );
};

export default Home;
