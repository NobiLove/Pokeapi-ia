import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Weight } from 'lucide-react';
import TypeBadge from './TypeBadge';

const PokemonModal = ({ pokemon, onClose }) => {
    if (!pokemon) return null;

    const { id, name, types, sprites, height, weight, stats, abilities } = pokemon;
    const image = sprites.other['official-artwork'].front_default || sprites.front_default;

    return (
        <AnimatePresence>
            {pokemon && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        layoutId={`card-${id}`}
                        className="relative w-full max-w-2xl bg-[#2a2a2a] rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        {/* Header / Background Blob */}
                        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-white/10 to-transparent" />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors z-20"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col items-center justify-center relative">
                                <div className="text-[8rem] md:text-[12rem] font-black text-white/5 absolute top-4 left-4 md:top-10 md:left-10 leading-none select-none">
                                    #{String(id).padStart(3, '0')}
                                </div>
                                <motion.img
                                    layoutId={`image-${id}`}
                                    src={image}
                                    alt={name}
                                    className="w-40 h-40 md:w-64 md:h-64 object-contain z-10 drop-shadow-2xl"
                                />
                                <div className="flex gap-2 mt-6 z-10">
                                    {types.map((t) => (
                                        <TypeBadge key={t.type.name} type={t.type.name} className="px-4 py-1.5 text-sm" />
                                    ))}
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 bg-black/20 text-white">
                                <h2 className="text-4xl font-bold capitalize mb-6">{name}</h2>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
                                        <Ruler className="text-white/60" />
                                        <div>
                                            <p className="text-xs text-white/50 uppercase">Height</p>
                                            <p className="font-semibold">{height / 10} m</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
                                        <Weight className="text-white/60" />
                                        <div>
                                            <p className="text-xs text-white/50 uppercase">Weight</p>
                                            <p className="font-semibold">{weight / 10} kg</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4 text-white/80">Stats</h3>
                                    <div className="space-y-3">
                                        {stats.map((stat) => (
                                            <div key={stat.stat.name} className="flex items-center gap-4">
                                                <span className="w-24 text-sm text-white/60 capitalize truncate">
                                                    {stat.stat.name.replace('-', ' ')}
                                                </span>
                                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                                                        transition={{ duration: 1, delay: 0.2 }}
                                                        className="h-full bg-white/80 rounded-full"
                                                    />
                                                </div>
                                                <span className="w-8 text-right text-sm font-mono">{stat.base_stat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-white/80">Abilities</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {abilities.map((a) => (
                                            <span key={a.ability.name} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm capitalize">
                                                {a.ability.name.replace('-', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PokemonModal;
