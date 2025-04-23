import React, { useState, useEffect } from 'react';
import { viewBill } from '../../services/customerService';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import './../shared/Analytics.css';

const COLORS = ['#5567FF','#FF6B6B','#FFC107','#00C49F','#FF8042'];

export default function CustomerAnalytics() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalBills, setTotalBills]     = useState(0);
  const [totalPaidAmt, setTotalPaidAmt] = useState(0);
  const [pendingList, setPendingList]   = useState([]);
  const [monthlyData, setMonthlyData]   = useState([]);
  const [pieData, setPieData]           = useState([]);
  const [successRate, setSuccessRate]   = useState({ paid:0, unpaid:0 });
  const [freqBiller, setFreqBiller]     = useState([]);

  useEffect(() => {
    viewBill(localStorage.getItem('custId'))
      .then(res => {
        const all = res.data || [];
        setBills(all);

        setTotalBills(all.length);

        const paid = all.filter(b => b.status==='Paid');
        const sumPaid = paid.reduce((sum, b) => sum + b.amount, 0);
        setTotalPaidAmt(sumPaid);

        const pending = all.filter(b => b.status!=='Paid');
        setPendingList(pending);

        const byMonth = {};
        paid.forEach(b => {
          const m = new Date(b.billIssuedDate).toLocaleString('default',{month:'short'});
          byMonth[m] = (byMonth[m]||0) + b.amount;
        });
        setMonthlyData(Object.entries(byMonth).map(([name,amt])=>({name, amt})));

      
        const byCat = {};
        paid.forEach(b => {
          const c = b.category || 'Other';
          byCat[c] = (byCat[c]||0) + b.amount;
        });
        setPieData(Object.entries(byCat).map(([name, value])=>({name,value})));

        setSuccessRate({ paid: paid.length, unpaid: pending.length });

        const byBiller = {};
        all.forEach(b => {
          const id = b.billerId || 'Unknown';
          byBiller[id] = (byBiller[id]||0) + 1;
        });
        setFreqBiller(Object.entries(byBiller)
          .sort((a,b)=>b[1]-a[1])
          .slice(0,5)
          .map(([billerId, count])=>({billerId,count})));

      })
      .catch(console.error)
      .finally(()=>setLoading(false));
  }, []);

  if (loading) return <p>Loading analytics…</p>;

  return (
    <div className="analytics-page">
      <h2>My Analytics</h2>

      {}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Bills</h3>
          <p className="stat-value">{totalBills}</p>
        </div>
        <div className="stat-card">
          <h3>Total Paid</h3>
          <p className="stat-value">₹{totalPaidAmt.toFixed(2)}</p>
        </div>
      </div>

      {}
      <div className="pending-section">
        <div className="stat-card pending-card">
          <h3>Pending Payments</h3>
          <p>{pendingList.length} bill(s) ₹{pendingList.reduce((s,b)=>s+b.amount,0).toFixed(2)}</p>
        </div>
        <ul className="pending-list">
          {pendingList.slice(0,5).map(b => (
            <li key={b.billId}>
              #{b.billId} • ₹{b.amount.toFixed(2)}
            </li>
          ))}
          {pendingList.length===0 && <li>None 🎉</li>}
        </ul>
      </div>

      {}
      <div className="charts-grid">

        {}
        <div className="chart-card">
          <h4>Monthly Spending</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line type="monotone" dataKey="amt" stroke="#5567FF" strokeWidth={2}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {}
        <div className="chart-card">
          <h4>Category‐wise</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
                label
              >
                {pieData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {}
        <div className="chart-card">
          <h4>Success Rate</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name:'Paid',   value:successRate.paid },
                  { name:'Unpaid', value:successRate.unpaid }
                ]}
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                label
              >
                {[...Array(2)].map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {}
        <div className="chart-card">
          <h4>Top Billers</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={freqBiller}>
              <XAxis dataKey="billerId"/>
              <YAxis allowDecimals={false}/>
              <Tooltip/>
              <Bar dataKey="count" fill="#FFC107"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {}
      <div className="table-card">
        <h4>Last 5 Bills</h4>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Amt</th><th>Status</th><th>Issued</th><th>Due</th>
            </tr>
          </thead>
          <tbody>
            {bills
              .sort((a,b)=> new Date(b.billIssuedDate)-new Date(a.billIssuedDate))
              .slice(0,5)
              .map(b => (
                <tr key={b.billId}>
                  <td>{b.billId}</td>
                  <td>₹{b.amount.toFixed(2)}</td>
                  <td>{b.status}</td>
                  <td>{new Date(b.billIssuedDate).toLocaleDateString()}</td>
                  <td>{new Date(b.dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
