import React from 'react'

interface PokemonCardProps {
    pokemon: any;

}

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className='relative p-4 bg-white rouded-xl shadow-sm flex flex-col gap-2'>PokemonCard</div>
  )
}

export default PokemonCard