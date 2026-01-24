import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const TYPE_COLORS = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-cyan-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-800',
    dragon: 'bg-indigo-600',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
};

const TypeBadge = ({ type, className }) => {
    const colorClass = TYPE_COLORS[type] || 'bg-gray-500';

    return (
        <span
            className={twMerge(
                clsx(
                    'px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm',
                    colorClass,
                    className
                )
            )}
        >
            {type}
        </span>
    );
};

export default TypeBadge;
