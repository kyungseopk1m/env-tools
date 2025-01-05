import React from 'react';
import { EnvVariable } from '../models';

interface Props {
    variables: EnvVariable[];
    onEdit: (index: number, variable: EnvVariable) => void;
    onDelete: (index: number) => void;
}

export const EnvList: React.FC<Props> = ({ variables, onEdit, onDelete }) => {
    return (
        <div className="env-list">
            {variables.map((variable, index) => (
                <div key={index} className="env-item">
                    <input
                        value={variable.key}
                        onChange={(e) => onEdit(index, { ...variable, key: e.target.value })}
                    />
                    <input
                        value={variable.value}
                        onChange={(e) => onEdit(index, { ...variable, value: e.target.value })}
                    />
                    <button onClick={() => onDelete(index)}>삭제</button>
                </div>
            ))}
        </div>
    );
};