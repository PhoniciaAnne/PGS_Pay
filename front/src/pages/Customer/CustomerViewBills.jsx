import React, { useState, useEffect, useMemo } from 'react';
import Modal from 'react-modal';
import Button from '../../components/Button/Button';
import { viewBill, payBill } from '../../services/customerService';
import ReceiptModal from './ReceiptModal';
import './ViewBills.css';

Modal.setAppElement('#root');

const SORT_KEYS = [
  { value: 'billId',    label: 'Bill ID'   },
  { value: 'amount',    label: 'Amount'    },
  { value: 'dueDate',   label: 'Due Date'  },
  { value: 'status',    label: 'Status'    },
];

const CustomerViewBills = () => {
  const [bills, setBills]           = useState([]);
  const [msg,   setMsg]             = useState('');
  const [filterBillerId, setFilterBillerId] = useState('');
  const [sortKey, setSortKey]       = useState('billId');
  const [sortOrder, setSortOrder]   = useState('asc');

  const [showPay, setShowPay]       = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [pwd, setPwd]               = useState('');
  const [busy, setBusy]             = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptBill, setReceiptBill] = useState(null);

  const customerId = localStorage.getItem('custId');

  const fetchBills = async () => {
    try {
      const res = await viewBill(customerId);
      setBills(res.data);
      setMsg('');
    } catch {
      setMsg('Failed to fetch bills.');
    }
  };
  useEffect(() => { if (customerId) fetchBills(); }, [customerId]);

  const visible = useMemo(() => {
    let arr = bills;
    if (filterBillerId.trim()) {
      arr = arr.filter(b => String(b.biller?.billerId) === filterBillerId.trim());
    }
    return [...arr].sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey];
      if (sortKey === 'dueDate') {
        av = new Date(av); bv = new Date(bv);
      }
      if (av < bv) return sortOrder === 'asc' ? -1 : 1;
      if (av > bv) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [bills, filterBillerId, sortKey, sortOrder]);

  const openPay   = b => { setCurrentBill(b); setPwd(''); setShowPay(true); setMsg(''); };
  const closePay  = () => { setShowPay(false); setCurrentBill(null); setPwd(''); };
  const confirmPay = async () => {
    if (!pwd.trim()) { setMsg('Please enter password.'); return; }
    setBusy(true);
    try {
      const res = await payBill(currentBill.billId, customerId, pwd);
      setMsg(res.data || 'Paid!');
      if (/success/i.test(res.data)) {
        closePay();
        fetchBills();
      }
    } catch (err) {
      setMsg(err?.response?.data || 'Payment failed.');
    } finally { setBusy(false); }
  };

  const openReceipt = b => { setReceiptBill(b); setShowReceipt(true); };
  const closeReceipt = () => { setReceiptBill(null); setShowReceipt(false); };

  return (
    <section className="cust-bills">
      <h2>My Bills</h2>
      {msg && <div className="feedback-message">{msg}</div>}

      {}
      <div className="controls-row">
        <div className="filter-group">
          <label>Biller ID:</label>
          <input
            type="text"
            placeholder="e.g. 21"
            value={filterBillerId}
            onChange={e => setFilterBillerId(e.target.value)}
          />
        </div>
        <div className="sort-group">
          <label>Sort By:</label>
          <select value={sortKey} onChange={e => setSortKey(e.target.value)}>
            {SORT_KEYS.map(k => (
              <option key={k.value} value={k.value}>{k.label}</option>
            ))}
          </select>
          <button
            className="icon-btn sort-toggle"
            onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {}
      <div className="bill-grid">
        {visible.length
          ? visible.map(b => (
            <div key={b.billId} className="bill-card">
              <div className="bill-details">
                <div><strong>ID:</strong> {b.billId}</div>
                <div><strong>Amount:</strong> ₹{b.amount.toFixed(2)}</div>
                <div><strong>Status:</strong> {b.status}</div>
                <div><strong>Due Date:</strong> {new Date(b.dueDate).toLocaleDateString()}</div>
              </div>
              <div className="bill-meta">
                <div><strong>Biller ID:</strong> {b.biller?.billerId ?? '—'}</div>
                {b.status !== 'Paid'
                  ? <Button onClick={() => openPay(b)}>Pay Bill</Button>
                  : <Button onClick={() => openReceipt(b)}>View Receipt</Button>
                }
              </div>
            </div>
          ))
          : <p className="no-data">No bills match your filters.</p>
        }
      </div>

      {}
      <Modal
        isOpen={showPay}
        onRequestClose={closePay}
        className="pay-modal"
        overlayClassName="modal-overlay"
      >
        <h3>Confirm Payment</h3>
        {currentBill && (
          <>
            <p>Pay <strong>₹{currentBill.amount.toFixed(2)}</strong> for bill <strong>#{currentBill.billId}</strong>?</p>
            <input
              type="password"
              placeholder="Enter wallet password"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              className="pwd-input"
            />
            {msg && <div className="modal-msg">{msg}</div>}
            <div className="modal-actions">
              <Button onClick={confirmPay} disabled={busy}>
                {busy ? 'Processing…' : 'Yes, Pay'}
              </Button>
              <Button onClick={closePay} variant="secondary">Cancel</Button>
            </div>
          </>
        )}
      </Modal>

      {}
      {showReceipt && receiptBill && (
        <ReceiptModal bill={receiptBill} onClose={closeReceipt} />
      )}
    </section>
  );
};

export default CustomerViewBills;
