import React, { useState } from 'react';
import { uploadBills } from '../../services/billerService';
import '../shared/BulkUpload.css';

export default function BulkUpload() {
  const [file, setFile]       = useState(null);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
    setResult(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const billerId = localStorage.getItem('billerId');
      const formData = new FormData();
      formData.append('file', file);           // must match @RequestPart("file")
      formData.append('biller_id', billerId);  // matches @RequestParam("biller_id")

      const res = await uploadBills(formData, {
        onUploadProgress: e => {
          // optionally track progress…
          console.log('Upload %', Math.round((e.loaded*100)/e.total));
        }
      });

      setResult(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Upload failed'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Bulk Upload Bills</h2>
      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={handleFileChange}
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading…' : 'Upload'}
      </button>

      {result && (
        <div>
          <p>Successfully created: {result.successCount}</p>
          {result.errors && result.errors.length > 0 && (
            <ul style={{ color: 'red' }}>
              {result.errors.map((e,i) => <li key={i}>{e}</li>)}
            </ul>
          )}
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
