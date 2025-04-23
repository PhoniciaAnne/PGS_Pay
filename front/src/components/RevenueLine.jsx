import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
export default function RevenueLine({ data }) {
  return (
    <LineChart width={400} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="date"/>
      <YAxis/>
      <Tooltip/>
      <Line type="monotone" dataKey="total"/>
    </LineChart>
  );
}