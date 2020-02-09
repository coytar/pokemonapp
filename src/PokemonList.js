import React from 'react'

export default function PokemonList( { pokemonlist }) {
    return (
        <div>
            {pokemonlist.map(x => (
                <div key={x}>{x}</div>
            ))}
        </div>
    )
}
