import { useEffect, useState } from "react";
import { fetchNEOs } from "../services/neoService";
import NEOBarChart from "../components/NeoBarChart";
import { ChartData } from "../types/chart";
import { NEO } from "../types/neo";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Home: React.FC = () => {
    const [data, setData] = useState<ChartData[]>([]);
    const [filteredData, setFilteredData] = useState<ChartData[]>([]);
    const [orbitingBodies, setOrbitingBodies] = useState<string[]>([]);
    const [selectedBody, setSelectedBody] = useState<string>("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const neos: NEO[] = await fetchNEOs();

                const formatted: ChartData[] = neos
                    .map((neo) => {
                        const min = neo.estimated_diameter.kilometers.estimated_diameter_min;
                        const max = neo.estimated_diameter.kilometers.estimated_diameter_max;
                        const orbitingBody = neo.close_approach_data?.[0]?.orbiting_body || "Unknown";

                        return {
                            name: neo.name,
                            minDiameter: min,
                            maxDiameter: max,
                            avg: (min + max) / 2,
                            orbitingBody,
                        };
                    })
                    .sort((a, b) => b.avg - a.avg)
                    .slice(0, 50); // prendre top 50 par défaut

                const uniqueBodies = Array.from(
                    new Set(formatted.map((item) => item.orbitingBody))
                );

                setData(formatted);
                setFilteredData(formatted);
                setOrbitingBodies(["All", ...uniqueBodies]);
            } catch (err) {
                setError("Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const handleSelectOrbitalBody = (e: SelectChangeEvent) => {
        const value = e.target.value;
        setSelectedBody(value);

        if (value === "All") {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter((item) => item.orbitingBody === value));
        }

    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Near-Earth Objects Diameters</h2>

            <div className="mb-6">
                <FormControl fullWidth sx={{ maxWidth: 300 }}>
                    <InputLabel id="orbiting-body-label">Orbital Body</InputLabel>
                    <Select
                        labelId="orbiting-body-label"
                        id="orbiting-body"
                        value={selectedBody}
                        label="Orbital Body"
                        onChange={handleSelectOrbitalBody}
                    >
                        {orbitingBodies.map((body) => (
                            <MenuItem key={body} value={body}>
                                {body}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <NEOBarChart data={filteredData} />
        </div>
    );
};

export default Home;