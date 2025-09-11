import React from 'react'

function App() {
  console.log('App rendering...')
  
  return (
    <div style={{padding: '20px', fontFamily: 'Arial', backgroundColor: 'lightblue', minHeight: '100vh'}}>
      <h1 style={{color: 'red'}}>MINIMAL APP WORKING</h1>
      <p>If you see this, React is working but there's an issue with components or AuthContext</p>
      <div style={{marginTop: '20px', padding: '10px', border: '2px solid black', backgroundColor: 'white'}}>
        <h2>Debug Info:</h2>
        <p>Current time: {new Date().toLocaleTimeString()}</p>
        <p>This is the most minimal possible React app</p>
      </div>
    </div>
  )
}

export default App
