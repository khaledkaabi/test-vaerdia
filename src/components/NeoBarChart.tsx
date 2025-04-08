import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartData } from "../types/chart";

interface Props {
    data: ChartData[];
}

const NEOBarChart: React.FC<Props> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
                <XAxis
                    type="number"
                    label={{
                        value: 'Estimated Diameter (km)',
                        position: 'insideBottom',
                        offset: -20,
                        style: { textAnchor: 'middle', fontSize: 16, fontWeight: 600 }
                    }}
                />
                <YAxis
                    width={200}
                    dataKey="name"
                    type="category"
                    label={{
                        value: 'NEO Name',
                        angle: -90,
                        position: 'insideLeft',
                        offset: -45,
                        style: { textAnchor: 'middle', fontSize: 16 }
                    }}
                />
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <Bar dataKey="minDiameter" fill="#8884d8" name="Min Estimated Diameter (km)" />
                <Bar dataKey="maxDiameter" fill="#ff6961" name="Max Estimated Diameter (km)" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default NEOBarChart;
