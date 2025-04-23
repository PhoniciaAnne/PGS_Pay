// src/pages/Admin/AdminAnalytics.jsx
import React, { useState, useEffect } from 'react';
import {
  viewCustomers,
  viewBillers,
  viewAllBillsForAdmin,
  getEditRequests
} from '../../services/adminService';
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
import '../shared/Analytics.css';

const CATEGORY_LIST = ['Electricity','Water','TV','Mobile','LPG Gas'];
const COLORS = ['#5567FF','#FF6B6B','#FFC107','#00C49F','#FF8042'];

export default function AdminAnalytics() {
  const [customers,    setCustomers]    = useState([]);
  const [billers,      setBillers]      = useState([]);
  const [bills,        setBills]        = useState([]);
  const [editRequests, setEditRequests] = useState(0);
  const [loading,      setLoading]      = useState(true);

  // derived
  const [billsByCat,   setBillsByCat]   = useState([]);
  const [monthlyVol,   setMonthlyVol]   = useState([]);
  const [activeUsers,  setActiveUsers]  = useState({ active:0, inactive:0 });
  const [topBillerVol, setTopBillerVol] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // parallel: customers, billers, edit-requests
        const [cuRes, biRes, erRes] = await Promise.all([
          viewCustomers(),
          viewBillers(),
          getEditRequests()
        ]);

        // sequential: all bills
        const L = await viewAllBillsForAdmin();

        const C  = cuRes.data || [];
        const B  = biRes.data || [];
        const ER = Array.isArray(erRes.data) ? erRes.data : [];

        setCustomers(C);
        setBillers(B);
        setBills(L);
        setEditRequests(ER.length);

        // Active vs inactive (last 30 days)
        const cutoff = Date.now() - 30*24*60*60*1000;
        const activeSet = new Set(
          L.filter(b => new Date(b.billIssuedDate).getTime() > cutoff)
           .map(b => b.custId)
        );
        setActiveUsers({
          active:   activeSet.size,
          inactive: C.length - activeSet.size
        });

        // Bills by category
        const catMap = CATEGORY_LIST.reduce((m, c) => (m[c]=0, m), {});
        L.forEach(b => {
          if (catMap[b.category] != null) catMap[b.category]++;
        });
        setBillsByCat(
          Object.entries(catMap).map(([name,value]) => ({ name, value }))
        );

        // Paid volume per month
        const monMap = {};
        L.filter(b => b.status==='Paid')
         .forEach(b => {
           const m = new Date(b.billIssuedDate)
                       .toLocaleString('default',{month:'short'});
           monMap[m] = (monMap[m]||0) + b.amount;
         });
        setMonthlyVol(
          Object.entries(monMap).map(([name,amt]) => ({ name, amt }))
        );

        // Top billers by paid volume
        const billerMap = {};
        L.filter(b => b.status==='Paid')
         .forEach(b => {
           billerMap[b.billerId] = (billerMap[b.billerId]||0) + b.amount;
         });
        setTopBillerVol(
          Object.entries(billerMap)
            .sort((a,b) => b[1] - a[1])
            .slice(0,5)
            .map(([billerId,amt]) => ({ billerId, amt }))
        );
      } catch (err) {
        console.error('Analytics fetch error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <p>Loading analytics…</p>;

  return (
    <div className="analytics-page">
      <h2>Admin System Analytics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Consumers</h3>
          <p className="stat-value">{customers.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Billers</h3>
          <p className="stat-value">{billers.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Bills</h3>
          <p className="stat-value">{bills.length}</p>
        </div>
        <div className="stat-card">
          <h3>Edit Requests</h3>
          <p className="stat-value">{editRequests}</p>
        </div>
      </div>

      <div className="charts-grid">
        {/* Bills by Category */}
        <div className="chart-card">
          <h4>Bills by Category</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={billsByCat}
                dataKey="value"
                outerRadius={80}
                label
              >
                {billsByCat.map((_,i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Volume per Month */}
        <div className="chart-card">
          <h4>Volume per Month</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyVol}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line dataKey="amt" stroke={COLORS[0]} strokeWidth={2}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Active vs Inactive Users */}
        <div className="chart-card">
          <h4>Active vs Inactive Users</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name:'Active',   value: activeUsers.active },
                  { name:'Inactive', value: activeUsers.inactive }
                ]}
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
                label
              >
                {[0,1].map(i => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Billers by Volume */}
        <div className="chart-card">
          <h4>Top Billers by Volume</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topBillerVol}>
              <XAxis dataKey="billerId"/>
              <YAxis allowDecimals={false}/>
              <Tooltip/>
              <Bar dataKey="amt" fill={COLORS[3]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
