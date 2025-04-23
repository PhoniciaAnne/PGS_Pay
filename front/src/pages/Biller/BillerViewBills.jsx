// import React, { useEffect, useState, useCallback } from 'react';
// import { viewAllBills }    from '../../services/billerService';
// import Button              from '../../components/Button/Button';
// import dayjs               from 'dayjs';
// import relativeTime        from 'dayjs/plugin/relativeTime';
// import './../Customer/ViewBills.css';

// dayjs.extend(relativeTime);

// const BillerViewBills = () => {
//   const [bills, setBills]   = useState([]);
//   const [toast, setToast]   = useState('');
//   const [query, setQuery]   = useState('');

//   const fetchBills = useCallback(async () => {
//     try {
//       const { data } = await viewAllBills();
//       setBills(data);
//       setToast('');
//     } catch {
//       setToast('⚠️ Failed to load bills.');
//     }
//   }, []);

//   useEffect(() => { fetchBills(); }, [fetchBills]);

//   const visible = bills.filter(b =>
//     `${b.billId}`.includes(query) ||
//     `${b.customer?.custId}`.includes(query)
//   );

//   const statusClass = s =>
//     s === 'Paid'    ? 'paid'
//   : s === 'Overdue' ? 'overdue'
//   :                    'pending';

//   return (
//     <section className="bills-page">
//       <div className="page-head">
//         <h2>My Generated Bills</h2>
//         <div className="tools">
//           <input
//             className="search"
//             placeholder="Filter bill / customer…"
//             value={query}
//             onChange={e => setQuery(e.target.value)}
//           />
//           <Button onClick={fetchBills}>Refresh</Button>
//         </div>
//       </div>

//       {toast && <p className="toast">{toast}</p>}

//       <div className="bill-grid">
//         {visible.map(b => (
//           <article key={b.billId} className="bill-card">
//             <div className="row">
//               <span>ID:</span> {b.billId}
//             </div>
//             <div className="row">
//               <span>Customer ID:</span> {b.customer?.custId ?? '—'}
//             </div>
//             <div className="row">
//               <span>Amount:</span> ₹{b.amount}
//             </div>
//             <div className="row">
//               <span>Issued:</span> {dayjs(b.billIssuedDate).format('DD MMM YYYY')}
//             </div>
//             <div className="row">
//               <span>Due:</span> {dayjs(b.dueDate).format('DD MMM YYYY')}
//             </div>
//             <div className={`status ${statusClass(b.status)}`}>
//               {b.status}
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BillerViewBills;

import React, { useEffect, useState, useCallback } from 'react';
import { viewAllBills } from '../../services/billerService';
import Button from '../../components/Button/Button';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './../Customer/ViewBills.css';

dayjs.extend(relativeTime);

const BillerViewBills = () => {
  const [bills, setBills] = useState([]);
  const [toast, setToast] = useState('');
  const [query, setQuery] = useState('');

  const billerId = localStorage.getItem('billerId');

  const fetchBills = useCallback(async () => {
    try {
      if (!billerId) {
        setToast(' No biller ID found.');
        return;
      }

      const { data } = await viewAllBills(billerId);
      setBills(data);
      setToast('');
    } catch (error) {
      console.error('Failed to load bills:', error);
      setToast(' Failed to load bills.');
    }
  }, [billerId]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const visible = bills.filter(b =>
    `${b.billId}`.includes(query) ||
    `${b.customer?.custId}`.includes(query)
  );

  const statusClass = (s) =>
    s === 'Paid'    ? 'paid' :
    s === 'Overdue' ? 'overdue' :
    'pending';

  return (
    <section className="bills-page">
      <div className="page-head">
        <h2>My Generated Bills</h2>
        <div className="tools">
          <input
            className="search"
            placeholder="Filter bill / customer…"
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
            <div className="row">
              <span>ID:</span> {b.billId}
            </div>
            <div className="row">
              <span>Customer ID:</span> {b.customer?.custId ?? '—'}
            </div>
            <div className="row">
              <span>Amount:</span> ₹{b.amount}
            </div>
            <div className="row">
              <span>Issued:</span> {dayjs(b.billIssuedDate).format('DD MMM YYYY')}
            </div>
            <div className="row">
              <span>Due:</span> {dayjs(b.dueDate).format('DD MMM YYYY')}
            </div>
            <div className={`status ${statusClass(b.status)}`}>
              {b.status}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BillerViewBills;

