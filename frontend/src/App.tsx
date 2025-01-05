import { useState } from 'react'
import './App.css'
import { LoadEnvFile, SaveEnvFile } from '../wailsjs/go/main/App'
import { EnvList } from './components/EnvList'
import { EnvVariable } from './models'

function App() {
  const [variables, setVariables] = useState<EnvVariable[]>([])

  const handleFileOpen = async () => {
    try {
      const result = await LoadEnvFile('.env')
      setVariables(result)
    } catch (err) {
      console.error('Error loading file:', err)
    }
  }

  const handleSave = async () => {
    try {
      await SaveEnvFile('.env', variables)
    } catch (err) {
      console.error('Error saving file:', err)
    }
  }

  const handleEdit = (index: number, variable: EnvVariable) => {
    const newVariables = [...variables]
    newVariables[index] = variable
    setVariables(newVariables)
  }

  const handleDelete = (index: number) => {
    const newVariables = variables.filter((_, i) => i !== index)
    setVariables(newVariables)
  }

  return (
    <div className="container">
      <h1>ENV Editor</h1>
      <div className="buttons">
        <button onClick={handleFileOpen}>Open .env</button>
        <button onClick={handleSave}>Save</button>
      </div>
      <EnvList
        variables={variables}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
