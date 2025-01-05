import React, { useState, useEffect } from 'react'
import './App.css'
import { LoadEnvFile, SaveEnvFile } from '../wailsjs/go/main/App'
import { EventsOn } from '../wailsjs/runtime'
import { EnvList } from './components/EnvList'
import { EnvVariable } from './models'
import { WindowSetTitle } from '../wailsjs/runtime/runtime'

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [variables, setVariables] = useState<EnvVariable[]>([]);
  const [currentFile, setCurrentFile] = useState<string>('');

  const menuTabs = [
    { id: 'home', name: '홈' },
    { id: 'project', name: '프로젝트' },
    { id: 'settings', name: '설정' },
    { id: 'info', name: '정보' }
  ];

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

  useEffect(() => {
    EventsOn('toggle-sidebar', () => {
        setIsMenuOpen(prev => !prev);
    });
  }, []);

  return (
    <div className="app-container">
      <div className={`sidebar ${isMenuOpen ? 'open' : 'closed'}`}>
        <div className="menu-tabs">
          {menuTabs.map(tab => (
            <div
              key={tab.id}
              className={`menu-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div className="file-actions">
          <button onClick={handleFileOpen}>파일 열기</button>
          <button onClick={handleSave}>저장</button>
        </div>
        <div className="file-info">
          {currentFile && <p>현재 파일: {currentFile}</p>}
        </div>
      </div>
      
      <div className={`main-content ${!isMenuOpen ? 'expanded' : ''}`}>
        <div className="content-header">
          {menuTabs.find(tab => tab.id === activeTab)?.name}
        </div>
        <div className="search-bar">
          <input type="text" placeholder="환경 변수 검색..." />
        </div>
        <div className="env-list">
          {variables.map((variable, index) => (
            <div key={index} className="env-item">
              <input value={variable.key} />
              <input value={variable.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
