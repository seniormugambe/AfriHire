import React, { useState, useCallback } from 'react';
import { Machine } from './types';
import { MOCK_MACHINES } from './constants';
import { getAIRecommendation, AIRecommendation } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import MachineCard from './components/MachineCard';
import MachineDetail from './components/MachineDetail';
import BookingModal from './components/BookingModal';

const App: React.FC = () => {
  const [machines] = useState<Machine[]>(MOCK_MACHINES);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [bookingMachine, setBookingMachine] = useState<Machine | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [aiRecommendation, setAiRecommendation] = useState<AIRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
        event.preventDefault();
    }
    if (!searchQuery.trim()) {
      setAiRecommendation(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiRecommendation(null);
    try {
      const result = await getAIRecommendation(searchQuery, machines);
      if (result) {
        setAiRecommendation(result);
      } else {
        setError("Sorry, I couldn't find a recommendation. Please try rephrasing your request.");
      }
    } catch (e) {
      setError('An error occurred while fetching the recommendation.');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, machines]);

  const handleSelectMachine = (machine: Machine) => {
    setSelectedMachine(machine);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedMachine(null);
  };
  
  const handleBook = (machine: Machine) => {
    setBookingMachine(machine);
  };

  const handleCloseModal = () => {
    setBookingMachine(null);
  }

  const renderMachineList = () => (
    <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-stone-50 to-stone-200 rounded-lg shadow-lg p-6 mb-8 text-center">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Find the Right Machine, Faster.</h2>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">Describe what you need in plain language. Our AI will analyze your request and recommend the best equipment for your job.</p>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., 'I need a small tractor for a farm in Kenya'"
                    aria-label="Describe your machine requirement"
                    className="flex-grow p-3 border-2 border-stone-300 rounded-md focus:ring-2 focus:ring-savanna-gold focus:border-savanna-gold outline-none transition-shadow"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-charcoal text-white font-bold py-3 px-6 rounded-md hover:bg-savanna-gold hover:text-charcoal transition-colors duration-300 disabled:bg-stone-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Thinking...' : 'Ask AI'}
                </button>
            </form>
        </div>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {aiRecommendation && (
            <div className="bg-savanna-gold/20 border-l-4 border-savanna-gold text-earth-brown p-4 rounded-md mb-8 shadow">
                <h3 className="font-bold text-lg">AI Recommendation</h3>
                <p>{aiRecommendation.reasoning}</p>
            </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {machines.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            onSelect={handleSelectMachine}
            isRecommended={aiRecommendation?.recommendedMachineId === machine.id}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        {selectedMachine ? (
          <MachineDetail machine={selectedMachine} onBack={handleBackToList} onBook={handleBook} />
        ) : (
          renderMachineList()
        )}
      </main>
      <BookingModal machine={bookingMachine} onClose={handleCloseModal} />
      <Footer />
    </div>
  );
};

export default App;
