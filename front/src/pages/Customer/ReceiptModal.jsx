
import React, { useEffect, useState } from 'react';
import { viewBillReceipt } from '../../services/customerService';
import Button from '../../components/Button/Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '24px',
  width: '90%',
  maxWidth: '500px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
  maxHeight: '90vh',
  overflowY: 'auto',
  fontFamily: 'Arial, sans-serif',
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
  fontSize: '16px',
};

const ReceiptModal = ({ bill, onClose }) => {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await viewBillReceipt(bill.billId);
        setReceipt(res.data);
      } catch (err) {
        console.error('Error loading receipt:', err);
      } finally {
        setLoading(false);
      }
    };

    if (bill) {
      fetchReceipt();
    }
  }, [bill]);

  const downloadPDF = () => {
    const input = document.getElementById('receipt-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`PGSPay_Receipt_${receipt.billId}.pdf`);
    });
  };

  const printReceipt = () => {
    const content = document.getElementById('receipt-content');
    const printWindow = window.open('', '', 'width=800, height=600');
    printWindow.document.write('<html><head><title>Receipt</title></head><body>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  if (!bill || loading) return null;

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <div id="receipt-content">
          <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#7C3AED' }}>
            PGSPay 🧾
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '20px', color: '#555' }}>Official Bill Receipt</p>

          {receipt ? (
            <div>
              <div style={rowStyle}><span><strong>Bill ID:</strong></span> <span>{receipt.billId}</span></div>
              <div style={rowStyle}><span><strong>Biller Name:</strong></span> <span>{receipt.billerName}</span></div>
              <div style={rowStyle}><span><strong>Customer Name:</strong></span> <span>{receipt.customerName}</span></div>
              <div style={rowStyle}><span><strong>Amount:</strong></span> <span>₹{receipt.amount}</span></div>
              <div style={rowStyle}><span><strong>Status:</strong></span> <span style={{ color: 'green', fontWeight: 'bold' }}>{receipt.status}</span></div>
              <div style={rowStyle}><span><strong>Date:</strong></span> <span>{new Date(receipt.receiptGeneratedDate).toLocaleString()}</span></div>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'gray' }}>Unable to load receipt.</p>
          )}
        </div>

        <div style={{ textAlign: 'right', marginTop: '24px' }}>
          <Button onClick={downloadPDF} style={{ marginRight: '10px' }}>
            Download PDF
          </Button>
          <Button onClick={printReceipt} style={{ marginRight: '10px' }}>
            Print Receipt
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;


