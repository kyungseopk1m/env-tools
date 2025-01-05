package models

// EnvVariable represents a single environment variable
type EnvVariable struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}