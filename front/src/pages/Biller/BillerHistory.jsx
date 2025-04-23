import React, { useState, useEffect } from 'react';
import { viewAllBills } from '../../services/billerService';
import { Clock }       from 'lucide-react';
import '../shared/History.css';

export default function BillerHistory() {
  const [recent, setRecent] = useState([]);
  const [toast, setToast]   = useState('');
  const billerId = localStorage.getItem('billerId');

  useEffect(() => {
    if (!billerId) {
      setToast('⚠️ No biller ID found in storage.');
      return;
    }

    viewAllBills(billerId)
      .then(res => {
        const bills = (res.data || [])
          .sort((a, b) => new Date(b.billIssuedDate) - new Date(a.billIssuedDate));
        setRecent(bills.slice(0, 10));
      })
      .catch(err => {
        console.error(err);
        setToast('⚠️ Failed to load history.');
      });
  }, [billerId]);

  return (
    <section className="history-page">
      <div className="history-header">
        <Clock size={24} className="history-icon" />
        <h2>Recently Issued Bills</h2>
      </div>

      {toast && <p className="toast">{toast}</p>}

      <div className="history-grid">
        {recent.map(b => (
          <div key={b.billId} className="history-card">
            <div><span className="label">ID:</span> {b.billId}</div>
            <div><span className="label">Customer:</span> {b.customer?.custId}</div>
            <div><span className="label">Amt:</span> ₹{b.amount}</div>
            <div><span className="label">Category:</span> {b.category}</div>
            <div>
              <span className="label">Issued:</span>
              {new Date(b.billIssuedDate).toLocaleDateString()}
            </div>
          </div>
        ))}

        {!toast && recent.length === 0 && (
          <p className="empty">No bills issued yet.</p>
        )}
      </div>
    </section>
  );
}
