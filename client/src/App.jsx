import React from 'react'


import {
    ProtectedRoute,
    GuestRoute,
    ROLES,
    hasPermission,
} from "@scan/auth";

console.log(ROLES);

console.log(
    hasPermission(
        ROLES.CUSTOMER,
        [ROLES.CUSTOMER]
    )
);

function App() {
  return (
    <h1 className='text-2xl text-blue-500 font-bold'>Welcome to Scan and Dine</h1>
  )
}

export default App