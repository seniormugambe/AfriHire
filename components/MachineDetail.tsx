
import React from 'react';
import { Machine } from '../types';
import { LocationIcon, CalendarIcon, HederaIcon } from './icons';

interface MachineDetailProps {
  machine: Machine;
  onBack: () => void;
  onBook: (machine: Machine) => void;
}

const MachineDetail: React.FC<MachineDetailProps> = ({ machine, onBack, onBook }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={onBack} className="mb-6 inline-flex items-center text-charcoal font-semibold hover:text-savanna-gold transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Listings
      </button>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={machine.imageUrl} alt={machine.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-sm font-bold text-acacia-green uppercase tracking-wide">{machine.type}</p>
              <h1 className="text-4xl font-bold text-charcoal mt-1">{machine.name}</h1>
              <div className="flex items-center text-stone-500 my-4">
                <LocationIcon className="w-5 h-5 mr-2" />
                <p>{machine.location}</p>
              </div>
              <p className="text-stone-700 leading-relaxed">{machine.description}</p>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-charcoal border-b pb-2 mb-3">Specifications</h3>
                <ul className="space-y-2 text-stone-600">
                  <li><strong>Power:</strong> {machine.specs.power}</li>
                  <li><strong>Capacity:</strong> {machine.specs.capacity}</li>
                  <li><strong>Year:</strong> {machine.specs.year}</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <div className="bg-stone-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-600">Price per day</p>
                  <p className="text-3xl font-bold text-earth-brown">${machine.pricePerDay}</p>
                </div>
                 <button onClick={() => onBook(machine)} className="flex items-center justify-center bg-sky-blue text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-sky-600 transition-all duration-300 transform hover:scale-105">
                    <HederaIcon className="w-6 h-6 mr-3"/>
                    Book with Hedera
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetail;
