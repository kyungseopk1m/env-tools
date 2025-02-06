import React from 'react';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'toggle' | 'select';
  value: string | boolean;
  options?: string[];
}

export const Settings: React.FC = () => {
  const settings: SettingItem[] = [
    {
      id: 'theme',
      title: '프로젝트 테마',
      description: '앱에서 표시될 프로젝트 테마를 설정하세요.',
      type: 'select',
      value: 'light',
      options: ['light', 'dark', 'system']
    },
    {
      id: 'theme',
      title: '프로젝트 테마',
      description: '앱에서 표시될 프로젝트 테마를 설정하세요.',
      type: 'select',
      value: 'light',
      options: ['light', 'dark', 'system']
    },
    // {
    //   id: 'autoSave',
    //   title: '자동 저장',
    //   description: '변경사항을 자동으로 저장할지 설정합니다.',
    //   type: 'toggle',
    //   value: true
    // }
  ];

  return (
    <div className="content-body settings-container">
      {settings.map((setting) => (
        <div key={setting.id} className="setting-card">
          <div className="setting-item">
            <div className="setting-info">
              <h3>{setting.title}</h3>
              <p>{setting.description}</p>
            </div>
            <div className="setting-control">
              {setting.type === 'toggle' && (
                <button className={`toggle-button ${setting.value ? 'active' : ''}`}>
                  {setting.value ? 'ON' : 'OFF'}
                </button>
              )}
              {setting.type === 'select' && (
                <select value={setting.value as string}>
                  {setting.options?.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};