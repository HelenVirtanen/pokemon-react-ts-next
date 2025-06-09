'use client';

import React from 'react';
import Header from '../../../components/Header';
import { useGlobalContext } from '../../../context/globalContext';

interface Props {
  params: { 
    id: string
  };
}
function page({ params }: Props) {
  const { id } = params;
  console.log("Id is:", id);
  const { fetchPokemonByName } = useGlobalContext();
  
  return (
    <div>
        <Header />
        {id && <p>Pokemon ID: {id}</p>}
    </div>
  )
}

export default page