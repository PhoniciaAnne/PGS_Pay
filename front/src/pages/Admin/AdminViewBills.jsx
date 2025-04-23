import React, { useState, useEffect, useCallback } from 'react';
import { viewAllBillsForAdmin } from '../../services/adminService';
import Button from '../../components/Button/Button';
import dayjs from 'dayjs';
import './../Customer/ViewBills.css';

const AdminViewBills = () => {
  const [bills,  setBills]  = useState([]);
  const [toast,  setToast]  = useState('');
  const [query,  setQuery]  = useState('');

  const fetchBills = useCallback(async () => {
    try {
      const all = await viewAllBillsForAdmin();
      setBills(all);
      setToast('');
    } catch (err) {
      console.error(err);
      setToast('⚠️ Failed to load bills.');
    }
  }, []);

  useEffect(() => { fetchBills(); }, [fetchBills]);

  const visible = bills.filter(b =>
    `${b.billId}`.includes(query) ||
    `${b.customer?.custId}`.includes(query) ||
    `${b.biller?.billerId}`.includes(query) ||
    (b.category || '').toLowerCase().includes(query.toLowerCase())
  );

  const statusClass = s =>
    s === 'Paid'    ? 'paid'
  : s === 'Overdue' ? 'overdue'
  :                    'pending';

  return (
    <section className="bills-page">
      <div className="page-head">
        <h2>All Bills</h2>
        <div className="tools">
          <input
            className="search"
            placeholder="Filter ID / cust / biller / category…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Button onClick={fetchBills}>Refresh</Button>
        </div>
      </div>

      {toast && <p className="toast">{toast}</p>}

      <div className="bill-grid">
        {visible.map(b => (
          <article key={b.billId} className="bill-card">
            <div className="row"><span>ID:</span> {b.billId}</div>
            <div className="row"><span>Cust:</span> {b.customer?.custId ?? '–'}</div>
            <div className="row"><span>Biller:</span> {b.biller?.billerId ?? '–'}</div>
            <div className="row"><span>Amt:</span> ₹{b.amount}</div>
            <div className="row"><span>Cat:</span> {b.category}</div>
            <div className="row">
              <span>Issued:</span> {dayjs(b.billIssuedDate).format('DD MMM YYYY')}
            </div>
            <div className="row">
              <span>Due:</span> {dayjs(b.dueDate).format('DD MMM YYYY')}
            </div>
            <div className={`status ${statusClass(b.status)}`}>{b.status}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdminViewBills;
