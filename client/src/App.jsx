import React from 'react'


import {
    cn,
    COMPONENT_SIZES,
    COMPONENT_VARIANTS,
} from "@scan/ui";

console.log(cn("px-4", "px-6"));

console.log(COMPONENT_SIZES);

console.log(COMPONENT_VARIANTS);

function App() {
  return (
    <h1 className='text-2xl text-blue-500 font-bold'>Welcome to Scan and Dine</h1>
  )
}

export default App