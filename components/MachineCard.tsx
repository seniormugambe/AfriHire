
import React from 'react';
import { Machine } from '../types';
import { LocationIcon, PriceIcon } from './icons';

interface MachineCardProps {
  machine: Machine;
  onSelect: (machine: Machine) => void;
  isRecommended?: boolean;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine, onSelect, isRecommended = false }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ${isRecommended ? 'ring-4 ring-savanna-gold shadow-2xl' : ''}`}>
      <img src={machine.imageUrl} alt={machine.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-charcoal mb-1">{machine.name}</h3>
        <p className="text-sm font-semibold text-acacia-green mb-2">{machine.type}</p>
        <div className="flex items-center text-stone-600 mb-2">
          <LocationIcon className="w-4 h-4 mr-2" />
          <span>{machine.location}</span>
        </div>
        <div className="flex items-center text-stone-600 mb-4">
          <PriceIcon className="w-4 h-4 mr-2" />
          <span className="font-bold text-lg text-earth-brown">${machine.pricePerDay}</span>
          <span className="text-sm ml-1">/ day</span>
        </div>
        <p className="text-stone-700 text-sm h-20 overflow-hidden mb-4">{machine.description}</p>
        <button
          onClick={() => onSelect(machine)}
          className="w-full bg-charcoal text-white font-bold py-2 px-4 rounded-md hover:bg-savanna-gold hover:text-charcoal transition-colors duration-300"
        >
          View & Book
        </button>
      </div>
    </div>
  );
};

export default MachineCard;
