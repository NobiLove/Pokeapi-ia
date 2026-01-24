import React, { useState } from 'react';
import { usePokemon, useAllPokemonNames } from './hooks/usePokemon';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';
import { ThemeToggle } from './components/ThemeToggle';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const { pokemonList, loading, error, loadMore, searchPokemon } = usePokemon();
  const allPokemonNames = useAllPokemonNames();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="min-h-screen pb-20">
      <header className="py-8 md:py-12 px-4 text-center relative z-10">
        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle />
        </div>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-black mb-2 tracking-tighter drop-shadow-lg text-dynamic"
        >
          POKÉDEX
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg mb-8 opacity-60 text-dynamic"
        >
          Discover and analyze your favorite Pokemon
        </motion.p>

        <SearchBar onSearch={searchPokemon} suggestions={allPokemonNames} />
      </header>

      <main className="container mx-auto px-4">
        {error ? (
          <div className="text-center text-red-400 glass-panel p-8 rounded-2xl max-w-lg mx-auto">
            <p className="text-xl font-bold mb-2">Error</p>
            <p>{error.message || 'Something went wrong'}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {pokemonList.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={setSelectedPokemon}
                />
              ))}
            </motion.div>

            {loading && (
              <div className="flex justify-center mt-12 mb-12">
                <Loader2 className="w-10 h-10 text-dynamic animate-spin" />
              </div>
            )}

            {!loading && pokemonList.length > 0 && !error && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 glass-panel rounded-full font-bold text-dynamic transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Load More
                </button>
              </div>
            )}

            {!loading && pokemonList.length === 0 && (
              <div className="text-center text-dynamic opacity-50 mt-20">
                <p className="text-2xl font-bold">No Pokemon Found</p>
                <p>Try searching for a different name.</p>
              </div>
            )}
          </>
        )}
      </main>

      <PokemonModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div >
  );
}

export default App;
