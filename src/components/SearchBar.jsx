import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, suggestions = [] }) => {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (query.length > 1 && showSuggestions) {
            const matches = suggestions
                .filter(name => name.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 5); // Limit to top 5
            setFilteredSuggestions(matches);
        } else {
            setFilteredSuggestions([]);
        }
    }, [query, suggestions, showSuggestions]);

    // Click outside to close suggestions
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (name) => {
        setQuery(name);
        onSearch(name);
        setShowSuggestions(false);
    };

    return (
        <div ref={wrapperRef} className="w-full max-w-md mx-auto mb-8 relative z-20">
            <form onSubmit={handleSubmit} className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search Pokemon..."
                    className="w-full px-4 md:px-6 py-4 pl-12 md:pl-14 rounded-2xl glass-panel placeholder-[var(--text-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--glass-border)] transition-all shadow-lg"
                />
                <Search className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-dynamic opacity-50 w-6 h-6 group-focus-within:opacity-100 transition-opacity" />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 glass-card p-2 rounded-xl transition-colors text-dynamic opacity-80 hover:opacity-100"
                >
                    Go
                </button>
            </form>

            <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute w-full mt-2 glass-panel rounded-xl overflow-hidden shadow-2xl z-30"
                    >
                        {filteredSuggestions.map((name) => (
                            <li key={name}>
                                <button
                                    onClick={() => handleSuggestionClick(name)}
                                    className="w-full text-left px-6 py-3 text-dynamic opacity-80 hover:bg-[var(--card-hover)] hover:opacity-100 transition-colors capitalize"
                                >
                                    {name}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;
