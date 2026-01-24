import React from 'react';
import { motion } from 'framer-motion';
import TypeBadge from './TypeBadge';

const PokemonCard = ({ pokemon, onClick }) => {
    const { id, name, types, sprites } = pokemon;
    const image = sprites.other['official-artwork'].front_default || sprites.front_default;

    return (
        <motion.div
            layoutId={`card-${id}`}
            className="glass-card relative p-4 rounded-xl cursor-pointer overflow-hidden group"
            onClick={() => onClick(pokemon)}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="absolute top-2 right-2 text-4xl font-black text-dynamic opacity-10 z-0">
                #{String(id).padStart(3, '0')}
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.img
                    layoutId={`image-${id}`}
                    src={image}
                    alt={name}
                    className="w-32 h-32 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />

                <h2 className="mt-4 text-xl font-bold capitalize text-dynamic tracking-wide">
                    {name}
                </h2>

                <div className="flex gap-2 mt-3">
                    {types.map((t) => (
                        <TypeBadge key={t.type.name} type={t.type.name} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PokemonCard;
