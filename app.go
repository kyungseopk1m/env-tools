package main

import (
	"context"
	"fmt"

	"github.com/kyungseopk1m/env-tools/app/env"
	"github.com/kyungseopk1m/env-tools/app/models"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// LoadEnvFile loads and parses a .env file
func (a *App) LoadEnvFile(filePath string) ([]models.EnvVariable, error) {
	variables, err := env.ParseEnvFile(filePath)
	if err != nil {
		fmt.Printf("Error loading .env file: %v\n", err)
		return nil, err
	}
	return variables, nil
}

// SaveEnvFile saves environment variables to a .env file
func (a *App) SaveEnvFile(filePath string, variables []models.EnvVariable) error {
	err := env.WriteEnvFile(filePath, variables)
	if err != nil {
		fmt.Printf("Error saving .env file: %v\n", err)
		return err
	}
	return nil
}