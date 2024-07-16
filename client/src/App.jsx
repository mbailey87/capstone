// client/src/App.jsx

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


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
     
      
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
          <h1>{!data ? "Loading..." : data}</h1>
        </p>
      </div>
    </>
  )
}

export default App

