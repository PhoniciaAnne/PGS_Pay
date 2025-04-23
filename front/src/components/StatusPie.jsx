import { PieChart, Pie, Cell, Tooltip } from 'recharts';
const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042'];
export default function StatusPie({ data }) {
  return (
    <PieChart width={250} height={200}>
      <Pie data={data} dataKey="count" nameKey="status" outerRadius={80}>
        {data.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
      </Pie>
      <Tooltip/>
    </PieChart>
  );
}