package models

// EnvVariable represents a single environment variable
type EnvVariable struct {
	Type  TextType `json:"type"`
	Key   string   `json:"key,omitempty"`
	Value string   `json:"value"`
}

type TextType int

const (
	COMMENT TextType = iota
	ENV
)
