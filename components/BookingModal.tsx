import React, { useState, useEffect } from 'react';
import { Machine } from '../types';
import { HederaIcon, PriceIcon } from './icons';
import { useHederaWallet } from '../contexts/HederaWalletContext';

interface BookingModalProps {
  machine: Machine | null;
  onClose: () => void;
}

type BookingStatus = 'confirming' | 'processing' | 'success' | 'failed';

const BookingModal: React.FC<BookingModalProps> = ({ machine, onClose }) => {
  const [status, setStatus] = useState<BookingStatus>('confirming');
  const { isConnected, executeTransaction, transactionId: lastTxId } = useHederaWallet();
  const [txId, setTxId] = useState('');

  useEffect(() => {
    // Reset status to confirming when a new machine is passed in
    if (machine) {
      setStatus('confirming');
      setTxId('');
    }
  }, [machine]);
  
  if (!machine) return null;

  const handleConfirm = async () => {
    setStatus('processing');
    try {
        const id = await executeTransaction(machine.pricePerDay);
        setTxId(id);
        setStatus('success');
    } catch (error) {
        console.error("Payment failed:", error);
        setStatus('failed');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'confirming':
        return (
            <div>
                <h3 className="text-2xl font-bold text-charcoal mb-4">Confirm Your Booking</h3>
                <div className="flex items-start space-x-4">
                    <img src={machine.imageUrl} alt={machine.name} className="w-24 h-24 object-cover rounded-md" />
                    <div>
                        <h4 className="text-lg font-semibold">{machine.name}</h4>
                        <p className="text-sm text-stone-600">{machine.type}</p>
                        <div className="flex items-center text-stone-600 mt-2">
                            <PriceIcon className="w-4 h-4 mr-1.5" />
                            <span className="font-bold text-lg text-earth-brown">${machine.pricePerDay}</span>
                            <span className="text-sm ml-1">/ day</span>
                        </div>
                    </div>
                </div>
                {!isConnected && (
                    <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md">
                        <p className="font-bold">Wallet not connected</p>
                        <p className="text-sm">Please connect your Hedera wallet using the button in the header to proceed with the booking.</p>
                    </div>
                )}
                <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row-reverse gap-3">
                     <button 
                        onClick={handleConfirm} 
                        disabled={!isConnected}
                        className="flex items-center justify-center bg-sky-blue text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 disabled:bg-stone-400 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        <HederaIcon className="w-5 h-5 mr-2"/>
                        Confirm & Pay with Hedera
                    </button>
                    <button onClick={onClose} className="bg-stone-200 text-charcoal font-bold py-2 px-4 rounded-lg hover:bg-stone-300 transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        );
      case 'processing':
        return (
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
                <HederaIcon className="w-12 h-12 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-charcoal">Processing Transaction</h3>
            <p className="text-stone-600 mt-2">Connecting to Hedera network and confirming your booking for the {machine.name}. Please wait...</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center">
             <div className="flex justify-center items-center mb-4">
                <svg className="w-16 h-16 text-acacia-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-acacia-green">Booking Confirmed!</h3>
            <p className="text-stone-600 mt-2">Your payment was successful. The {machine.name} is booked.</p>
            {txId && (
                <div className="mt-4 text-xs text-stone-500 bg-stone-100 p-2 rounded-md break-all">
                    <strong>Transaction ID:</strong> {txId}
                </div>
            )}
            <button onClick={onClose} className="mt-6 bg-charcoal text-white font-bold py-2 px-6 rounded-lg hover:bg-stone-700 transition-colors">
                Done
            </button>
          </div>
        );
      case 'failed':
         return (
          <div className="text-center">
             <div className="flex justify-center items-center mb-4">
                <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-red-600">Transaction Failed</h3>
            <p className="text-stone-600 mt-2">We couldn't process your payment. Please check your wallet and try again.</p>
             <button onClick={onClose} className="mt-6 bg-charcoal text-white font-bold py-2 px-6 rounded-lg hover:bg-stone-700 transition-colors">
                Close
            </button>
          </div>
        );
      default:
        return null;
    }
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 max-w-md w-full relative transform transition-all duration-300 scale-100">
        <button onClick={onClose} aria-label="Close modal" className="absolute top-4 right-4 text-stone-500 hover:text-stone-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default BookingModal;