import React, { useState, useEffect } from 'react'
import './App.css'
import { LoadEnvFile, SaveEnvFile, GetHistory } from '../wailsjs/go/main/App'
import { EventsOn } from '../wailsjs/runtime'
import { EnvList } from './components/EnvList'
import { EnvHistory, EnvVariable } from './models'
import { WindowSetTitle } from '../wailsjs/runtime/runtime'

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [variables, setVariables] = useState<EnvVariable[]>([]);
  const [currentFile, setCurrentFile] = useState<string>('');
  // 히스토리 상태 추가
const [history, setHistory] = useState<EnvHistory[]>([]); // ENV 파일 열기 히스토리를 저장하는 상태

// useEffect 추가 (기존 useEffect 근처에 배치)
useEffect(() => {
    // 컴포넌트가 마운트될 때 히스토리 데이터를 로드
    const loadHistory = async () => {
        try {
            const result = await GetHistory(); // 백엔드에서 히스토리 데이터 가져오기
            setHistory(result); // 가져온 히스토리를 상태에 저장
        } catch (err) {
            console.error('Error loading history:', err);
        }
    };
    
    loadHistory(); // 히스토리 로드 함수 실행
}, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  const menuTabs = [
    { id: 'home', name: '홈' },
    { id: 'project', name: '프로젝트' },
    { id: 'settings', name: '설정' },
    { id: 'info', name: '정보' }
  ];

  const handleFileOpen = async () => {
    try {
        const result = await LoadEnvFile('.env');
        setVariables(result);
        setCurrentFile('.env'); // 현재 파일 경로 저장
        
        // 파일을 열 때마다 히스토리에 추가
        await AddToHistory('.env', '환경 변수 파일'); // 백엔드에 히스토리 저장
        
        // 히스토리 상태 업데이트를 위해 다시 로드
        const updatedHistory = await GetHistory();
        setHistory(updatedHistory);
    } catch (err) {
        console.error('Error loading file:', err);
    }
};

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
function AddToHistory(arg0: string, arg1: string) {
  throw new Error('Function not implemented.')
}

