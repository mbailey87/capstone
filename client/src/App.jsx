// client/src/App.jsx

import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar'

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  return (
    <>
      <Navbar/>
     
      <div className="card">
        
       
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
          <h1 className="bg-red-500">{!data ? "Loading..." : data}</h1>
        </p>
      </div>
    </>
  )
}

export default App

