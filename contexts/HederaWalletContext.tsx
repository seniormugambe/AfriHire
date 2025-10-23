import React, { createContext, useState, useContext, ReactNode } from 'react';
import { HederaWalletContextType, HederaWalletState } from '../types';
import * as hederaService from '../services/hederaService';

const initialState: HederaWalletState = {
  isConnecting: false,
  isConnected: false,
  accountId: '',
  balance: 0,
  transactionId: '',
};

const HederaWalletContext = createContext<HederaWalletContextType | undefined>(undefined);

export const HederaWalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [walletState, setWalletState] = useState<HederaWalletState>(initialState);

  const connectWallet = async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true }));
    try {
      const { accountId, balance } = await hederaService.connectWallet();
      setWalletState(prev => ({
        ...prev,
        isConnected: true,
        accountId,
        balance,
        isConnecting: false,
      }));
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const disconnectWallet = () => {
    setWalletState(initialState);
  };

  const executeTransaction = async (amount: number): Promise<string> => {
    if (!walletState.isConnected || !walletState.accountId) {
        throw new Error("Wallet not connected.");
    }
    const transactionId = await hederaService.executeTransaction(walletState.accountId, amount);
    setWalletState(prev => ({
        ...prev,
        transactionId,
        balance: prev.balance - amount // Optimistically update balance
    }));
    return transactionId;
  };

  const value = {
    ...walletState,
    connectWallet,
    disconnectWallet,
    executeTransaction,
  };

  return (
    <HederaWalletContext.Provider value={value}>
      {children}
    </HederaWalletContext.Provider>
  );
};

export const useHederaWallet = (): HederaWalletContextType => {
  const context = useContext(HederaWalletContext);
  if (context === undefined) {
    throw new Error('useHederaWallet must be used within a HederaWalletProvider');
  }
  return context;
};
