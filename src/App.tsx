import * as React from 'react'
import './App.css'
import { useState } from 'react'

function App() {
  const [file, setFile] = useState<File | null>(null)

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="dropzone"
        style={{
          width: '100%',
          background: 'lightgray',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <div className="dropzone__prompt">Drop files here or click to upload</div>
        <input type="file" className="dropzone__input" style={{ marginBottom: 24 }} onChange={handleFileChange} />
        {file && (
          <div>
            File: {file.name} File size: {(file.size / 1000).toFixed(0)} kB
          </div>
        )}
      </div>
    </div>
  )
}

export default App
