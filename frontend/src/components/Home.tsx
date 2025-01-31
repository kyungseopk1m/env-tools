import React from 'react';
import { EnvHistory } from '../models';

interface HomeProps {
  onImport: () => void;
  onNewFile: () => void;
  recentHistory: EnvHistory[];
}

export const Home: React.FC<HomeProps> = ({ onImport, onNewFile, recentHistory }) => {
  return (
    <div className="content-body">
      <div className="home-actions">
        <button className="action-button" onClick={onImport}>
          <span className="action-icon">📂</span>
          <span>불러오기</span>
        </button>
        <button className="action-button" onClick={onNewFile}>
          <span className="action-icon">📄</span>
          <span>새 파일</span>
        </button>
      </div>
      
      <div className="recent-files">
        <h3>최근 폴더 목록</h3>
        <div className="history-list">
          {recentHistory.map((item, index) => (
            <div key={index} className="history-item">
              <span className="history-icon">📁</span>
              <div className="history-details">
                <span className="history-path">{item.filePath}</span>
                <span className="history-date">
                  {new Date(item.lastOpened).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button className="help-button">
        <span>?</span>
      </button>
    </div>
  );
};