import { useState, useEffect } from 'react';
import { pokeApi } from '../services/pokeApi';

export const usePokemon = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const LIMIT = 20;

    const fetchPokemon = async (reset = false) => {
        try {
            setLoading(true);
            const currentOffset = reset ? 0 : offset;
            const data = await pokeApi.getPokemonList(LIMIT, currentOffset);

            // Fetch details for each pokemon to get images and types
            const detailsPromises = data.results.map(p => pokeApi.getPokemonDetails(p.url));
            const details = await Promise.all(detailsPromises);

            setPokemonList(prev => reset ? details : [...prev, ...details]);
            setOffset(prev => reset ? LIMIT : prev + LIMIT);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemon(true); // Initial fetch
    }, []);

    const loadMore = () => fetchPokemon(false);

    const searchPokemon = async (query) => {
        if (!query) {
            fetchPokemon(true);
            return;
        }
        try {
            setLoading(true);
            const data = await pokeApi.getPokemonByName(query);
            setPokemonList([data]);
        } catch (err) {
            setPokemonList([]);
            setError('Pokemon not found');
        } finally {
            setLoading(false);
        }
    };

    return { pokemonList, loading, error, loadMore, searchPokemon };
};

export const useAllPokemonNames = () => {
    const [allNames, setAllNames] = useState([]);

    useEffect(() => {
        pokeApi.getAllPokemonNames().then(setAllNames);
    }, []);

    return allNames;
};
