import React, { useState, useEffect } from 'react';
import { viewBill }          from '../../services/customerService';
import { Clock }             from 'lucide-react';
import '../shared/History.css';   
export default function CustomerHistory() {
  const [recent, setRecent] = useState([]);
  const [toast,  setToast]  = useState('');
  const custId = localStorage.getItem('custId');

  useEffect(() => {
    if (!custId) {
      setToast('⚠️ No customer ID found.');
      return;
    }

    viewBill(custId)
      .then(res => {
        const paid = (res.data || [])
          .filter(b => b.status === 'Paid')
          .sort((a, b) =>
            new Date(b.billIssuedDate) - new Date(a.billIssuedDate)
          );
        setRecent(paid.slice(0, 10));
      })
      .catch(err => {
        console.error(err);
        setToast('⚠️ Failed to load history.');
      });
  }, [custId]);

  return (
    <section className="history-page">
      <div className="history-header">
        <Clock size={24} className="history-icon" />
        <h2>Recently Paid Bills</h2>
      </div>

      {toast && <p className="toast">{toast}</p>}

      <div className="history-grid">
        {recent.map(b => (
          <div key={b.billId} className="history-card">
            <div><span className="label">ID:</span> {b.billId}</div>
            <div><span className="label">Amount:</span> ₹{b.amount}</div>
            <div><span className="label">Category:</span> {b.category}</div>
            <div>
              <span className="label">Issued:</span>
              {new Date(b.billIssuedDate).toLocaleDateString()}
            </div>
            <div>
              <span className="label">Paid:</span>
              {new Date(b.dueDate).toLocaleDateString()}
            </div>
          </div>
        ))}

        {!toast && recent.length === 0 && (
          <p className="empty">You haven’t paid any bills yet.</p>
        )}
      </div>
    </section>
  );
}
