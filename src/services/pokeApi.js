import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokeApi = {
    getPokemonList: async (limit = 20, offset = 0) => {
        try {
            const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching pokemon list:', error);
            throw error;
        }
    },

    getPokemonDetails: async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching pokemon details:', error);
            throw error;
        }
    },

    getPokemonByName: async (name) => {
        try {
            const response = await axios.get(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching pokemon by name:', error);
            throw error;
        }
    },

    getAllPokemonNames: async () => {
        try {
            // Limit 1000 should cover most, 10000 ensures we get ALL
            const response = await axios.get(`${BASE_URL}/pokemon?limit=10000&offset=0`);
            return response.data.results.map(p => p.name);
        } catch (error) {
            console.error('Error fetching all pokemon names:', error);
            return [];
        }
    }
};
