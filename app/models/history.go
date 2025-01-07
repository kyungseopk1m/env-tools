package models

import "time"

type EnvHistory struct {
    FilePath    string    `json:"filePath"`
    LastOpened  time.Time `json:"lastOpened"`
    Description string    `json:"description"`
}

type HistoryManager struct {
    Histories []EnvHistory `json:"histories"`
    FilePath  string      `json:"filePath"`
}