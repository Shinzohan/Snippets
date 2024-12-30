import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalDonation = ({ onClose }) => {
  const [donationAmount, setDonationAmount] = useState('10.00');
  const [isLoading, setIsLoading] = useState(false);

  const clientId = ""; // Hard-coded client ID
  const MAX_DONATION = 10000; // $10,000 limit

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: donationAmount,
            currency_code: 'USD',
          },
          description: 'Donation',
        },
      ],
    });
  };

  const handleApprove = (data, actions) => {
    setIsLoading(true);
    return actions.order.capture()
      .then((details) => {
        alert(`Thank you, ${details.payer.name.given_name}, for your generous donation!`);
        if (onClose) onClose();
      })
      .catch(handleError)
      .finally(() => setIsLoading(false));
  };

  const handleError = (error) => {
    console.error('PayPal Error:', error);
    alert('An error occurred during the transaction. Please try again.');
    if (onClose) onClose();
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value >= 1 && value <= MAX_DONATION) {
      setDonationAmount(value.toFixed(2));
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup loading state when component unmounts
      setIsLoading(false);
    };
  }, []);

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-center font-semibold text-lg mb-4">
          Support Our Cause
        </h2>
        
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Donation Amount (USD)
          </label>
          <input
            id="amount"
            type="number"
            min="1"
            max={MAX_DONATION}
            step="0.01"
            value={donationAmount}
            onChange={handleAmountChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            aria-label="Donation amount in USD"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-4" role="status">
            <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <PayPalScriptProvider options={{ "client-id": clientId }}>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={handleApprove}
              onError={handleError}
              style={{ layout: "vertical" }}
            />
          </PayPalScriptProvider>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default PayPalDonation;
