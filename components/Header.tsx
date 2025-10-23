import React from 'react';
import { useHederaWallet } from '../contexts/HederaWalletContext';
import { HederaIcon } from './icons';

const Header: React.FC = () => {
  const { isConnected, isConnecting, accountId, balance, connectWallet, disconnectWallet } = useHederaWallet();

  const WalletButton: React.FC = () => {
    if (isConnected) {
      return (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-white text-sm font-semibold">{accountId}</p>
            <p className="text-savanna-gold text-xs font-bold">{balance.toLocaleString()} ℏ</p>
          </div>
          <button
            onClick={disconnectWallet}
            className="bg-stone-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-stone-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      );
    }

    return (
       <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="flex items-center justify-center bg-sky-blue text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 disabled:bg-stone-400 disabled:cursor-wait disabled:scale-100"
       >
        <HederaIcon className="w-5 h-5 mr-2"/>
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <header className="bg-charcoal shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-10 h-10 text-savanna-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <h1 className="text-3xl font-bold text-white tracking-wider">
              Afri-Hire <span className="text-savanna-gold">AI</span>
            </h1>
          </div>
           <div className="hidden md:flex items-center">
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;