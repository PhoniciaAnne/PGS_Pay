import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7981';

function WalletOperations() {
  const [topUpCustomerId, setTopUpCustomerId] = useState('');
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpMessage, setTopUpMessage] = useState('');

  const [payCustomerId, setPayCustomerId] = useState('');
  const [billId, setBillId] = useState('');
  const [payPassword, setPayPassword] = useState('');
  const [payMessage, setPayMessage] = useState('');

  const handleTopUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/customer/topUpWallet`,
        {},
        {
          params: {
            customerId: topUpCustomerId,
            amount: topUpAmount
          },
        }
      );
      setTopUpMessage(response.data);
    } catch (error) {
      console.error('Top up error:', error);
      setTopUpMessage(
        error.response?.data || 'Error occurred during wallet top-up.'
      );
    }
  };

  const handlePayBill = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/customer/payBill`,
        {},
        {
          params: {
            customerId: payCustomerId,
            billId: billId,
            password: payPassword
          },
        }
      );
      setPayMessage(response.data);
    } catch (error) {
      console.error('Pay bill error:', error);
      setPayMessage(
        error.response?.data || 'Error occurred during bill payment.'
      );
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">Wallet Operations</h2>
      
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Card.Title>Top Up Wallet</Card.Title>
          <Form onSubmit={handleTopUp}>
            <Form.Group className="mb-3" controlId="topUpCustomerId">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your customer ID"
                value={topUpCustomerId}
                onChange={(e) => setTopUpCustomerId(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="topUpAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter amount to top up"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Top Up Wallet
            </Button>
          </Form>
          {topUpMessage && (
            <Alert variant="info" className="mt-3">
              {topUpMessage}
            </Alert>
          )}
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Pay Bill Using Wallet</Card.Title>
          <Form onSubmit={handlePayBill}>
            <Form.Group className="mb-3" controlId="payCustomerId">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your customer ID"
                value={payCustomerId}
                onChange={(e) => setPayCustomerId(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="billId">
              <Form.Label>Bill ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the bill ID"
                value={billId}
                onChange={(e) => setBillId(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="payPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={payPassword}
                onChange={(e) => setPayPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Pay Bill
            </Button>
          </Form>
          {payMessage && (
            <Alert variant="info" className="mt-3">
              {payMessage}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default WalletOperations;
