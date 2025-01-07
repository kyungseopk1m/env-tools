package storage

import (
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/kyungseopk1m/env-tools/app/models"
)

func GetStorageFilePath() (string, error) {
    userConfigDir, err := os.UserConfigDir()
    if err != nil {
        return "", err
    }
    
    appDir := filepath.Join(userConfigDir, "env-tools")
    if err := os.MkdirAll(appDir, 0755); err != nil {
        return "", err
    }
    
    return filepath.Join(appDir, "history.json"), nil
}

func SaveHistory(histories []models.EnvHistory) error {
    filePath, err := GetStorageFilePath()
    if err != nil {
        return err
    }

    data, err := json.MarshalIndent(histories, "", "  ")
    if err != nil {
        return err
    }

    return os.WriteFile(filePath, data, 0644)
}

func LoadHistory() ([]models.EnvHistory, error) {
    filePath, err := GetStorageFilePath()
    if err != nil {
        return nil, err
    }

    data, err := os.ReadFile(filePath)
    if err != nil {
        if os.IsNotExist(err) {
            return []models.EnvHistory{}, nil
        }
        return nil, err
    }

    var histories []models.EnvHistory
    if err := json.Unmarshal(data, &histories); err != nil {
        return nil, err
    }

    return histories, nil
}