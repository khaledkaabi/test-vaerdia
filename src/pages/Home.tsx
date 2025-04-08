import { useEffect, useState } from "react";
import { fetchNEOs } from "../services/neoService";
import NeoBarChart from "../components/NeoBarChart";
import { ChartData } from "../types/chart";
import { NEO } from "../types/neo";
import {
    Box,
    Tab,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent
} from '@mui/material';
import {
    TabContext,
    TabList,
    TabPanel
} from '@mui/lab';

import NeoTableView from "../components/NeoTableView";

const Home: React.FC = () => {
    const [data, setData] = useState<ChartData[]>([]);
    const [filteredData, setFilteredData] = useState<ChartData[]>([]);
    const [orbitingBodies, setOrbitingBodies] = useState<string[]>([]);
    const [selectedBody, setSelectedBody] = useState<string>("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedView, setSelectedView] = useState<string>("Chart");

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

    const handleChangeView = (_event: React.SyntheticEvent, newValue: string) => {
        setSelectedView(newValue);
    };


    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Near-Earth Objects Diameters</h2>

            <div className="mb-6">
                <FormControl fullWidth sx={{ maxWidth: 300 }}>
                    <InputLabel id="orbiting-body-label">Orbiting Body</InputLabel>
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

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={selectedView}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeView} aria-label="lab API tabs example">
                            <Tab label="Chart View" value="Chart" />
                            <Tab label="Table View" value="Table" />
                        </TabList>
                    </Box>
                    <TabPanel value="Chart">
                        <NeoBarChart data={filteredData} />
                    </TabPanel>
                    <TabPanel value="Table">
                        <NeoTableView data={filteredData} />
                    </TabPanel>
                </TabContext>
            </Box>

        </div>
    );
};

export default Home;