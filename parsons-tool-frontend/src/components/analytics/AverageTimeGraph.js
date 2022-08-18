import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AverageTimeGraph({ problemMap }) {
  return (
    <div>
      {console.log(problemMap)}
      <BarChart
        width={1200}
        height={300}
        data={problemMap}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value.avgMin" fill="#8884d8" />
        <Bar dataKey="value.total" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
