import React, {useEffect, useState} from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
    response => response.json()
  ).then(
    data => {
      setBackendData(data)
    }
  )
  }, [])

  return(
    <div>{JSON.stringify(backendData)}</div>
  )
}

export default App