export interface Machine {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  pricePerDay: number;
  imageUrl: string;
  specs: {
    power: string;
    capacity: string;
    year: number;
  };
}

export interface HederaWalletState {
    isConnecting: boolean;
    isConnected: boolean;
    accountId: string;
    balance: number;
    transactionId: string;
}

export interface HederaWalletContextType extends HederaWalletState {
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    executeTransaction: (amount: number) => Promise<string>;
}
