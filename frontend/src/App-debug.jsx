import React from 'react'

function App() {
  return (
    <div style={{padding: '20px', fontFamily: 'Arial'}}>
      <h1 style={{color: 'red', fontSize: '24px'}}>Alumni Connect Debug</h1>
      <p style={{color: 'blue', fontSize: '16px'}}>If you see this, React is working!</p>
      <div style={{marginTop: '20px', padding: '10px', border: '1px solid black'}}>
        <h2>Basic React Test</h2>
        <p>No Tailwind, no routing, just React.</p>
        <button onClick={() => alert('Button clicked!')}>Click me</button>
      </div>
    </div>
  )
}

export default App
