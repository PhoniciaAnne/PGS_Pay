import React, { useState, useEffect } from 'react';
import { viewAllBills }        from '../../services/billerService';
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
import '../shared/Analytics.css';

const CATEGORY_LIST = [
  'Electricity',
  'Water',
  'TV',
  'Mobile',
  'LPG Gas'
];
const COLORS = ['#5567FF','#FF6B6B','#FFC107','#00C49F','#FF8042'];

export default function BillerAnalytics() {
  const [bills, setBills]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState('');
  const billerId              = localStorage.getItem('billerId');

  const [totalIssued, setTotalIssued]   = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [unpaidValue, setUnpaidValue]   = useState(0);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    if (!billerId) {
      setToast('⚠️ No biller ID found.');
      setLoading(false);
      return;
    }

    viewAllBills(billerId)
      .then(res => {
        const all = res.data || [];
        setBills(all);

        setTotalIssued(all.length);

        const paid = all.filter(b => b.status === 'Paid');
        setTotalRevenue(paid.reduce((sum, b) => sum + b.amount, 0));

        const unpaid = all.filter(b => b.status !== 'Paid');
        setUnpaidValue(unpaid.reduce((sum, b) => sum + b.amount, 0));

        const mMap = {};
        paid.forEach(b => {
          const m = new Date(b.billIssuedDate)
                      .toLocaleString('default',{month:'short'});
          mMap[m] = (mMap[m] || 0) + b.amount;
        });
        setMonthlyTrend(Object.entries(mMap).map(([name, amt])=>({name, amt})));

        const catMap = {};
        CATEGORY_LIST.forEach(c => catMap[c] = 0);
        paid.forEach(b => {
          const c = b.category;
          if (catMap[c] !== undefined) catMap[c] += b.amount;
        });
        setCategoryData(
          Object.entries(catMap).map(([name,value])=>({name,value}))
        );

        const custMap = {};
        paid.forEach(b => {
          const id = b.customer?.custId ?? 'Unknown';
          custMap[id] = (custMap[id] || 0) + b.amount;
        });
        setTopCustomers(
          Object.entries(custMap)
            .sort((a,b)=>b[1]-a[1])
            .slice(0,5)
            .map(([custId,amt])=>({custId,amt}))
        );
      })
      .catch(err => {
        console.error(err);
        setToast('⚠️ Failed to load analytics.');
      })
      .finally(() => setLoading(false));
  }, [billerId]);

  if (loading) return <p>Loading analytics…</p>;

  return (
    <div className="analytics-page">
      <h2>My Billing Analytics</h2>
      {toast && <p className="toast">{toast}</p>}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Issued</h3>
          <p className="stat-value">{totalIssued}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">₹{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Unpaid Value</h3>
          <p className="stat-value">₹{unpaidValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="charts-grid">
        {}
        <div className="chart-card">
          <h4>Monthly Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrend}>
              <XAxis dataKey="name"/> <YAxis/> <Tooltip/>
              <Line dataKey="amt" stroke="#5567FF" strokeWidth={2}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {}
        <div className="chart-card">
          <h4>By Category</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                innerRadius={40}
                outerRadius={80}
                label
              >
                {categoryData.map((_,i)=>(
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {}
        <div className="chart-card">
          <h4>Top Customers</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topCustomers}>
              <XAxis dataKey="custId"/> <YAxis allowDecimals={false}/> <Tooltip/>
              <Bar dataKey="amt" fill="#FFC107"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
