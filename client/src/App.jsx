import React from 'react'
import { useAuthStore } from "@scan/auth";

function Test() {

    const {
        user,
        isAuthenticated,
        setUser,
        clearUser,
    } = useAuthStore();

    console.log(user);
    console.log(isAuthenticated);

    return null;
}

function App() {
  return (
    <h1 className='text-2xl text-blue-500 font-bold'>Welcome to Scan and Dine</h1>
  )
}

export default App