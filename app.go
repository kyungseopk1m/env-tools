package main

import (
	"context"
	"fmt"
	"github.com/kyungseopk1m/env-tools/app/utils"
	"time"

	"github.com/kyungseopk1m/env-tools/app/env"
	"github.com/kyungseopk1m/env-tools/app/models"
	"github.com/kyungseopk1m/env-tools/app/storage"
	// "github.com/wailsapp/wails/v2/pkg/menu"
	// "github.com/wailsapp/wails/v2/pkg/menu/keys"
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

func (a *App) GetProjectPath() (*string, error) {
	result, err := utils.SelectFileDialog(a.ctx)
	if err != nil {
		fmt.Printf("Error Get Project Path: %v\n", err)
		return nil, err
	}

	return &result, nil
}

func (a *App) OpenFolder(folderPath string) error {
	err := utils.OpenFolder(folderPath)
	if err != nil {
		fmt.Printf("Error Open Folder: %v\n", err)
		return err
	}

	return nil
}

// createMenu creates the application menu
// func (a *App) createMenu() *menu.Menu {
// 	appMenu := menu.NewMenu()

// 	fileMenu := appMenu.AddSubmenu("File")
// 	fileMenu.AddText("Open", keys.CmdOrCtrl("o"), func(_ *menu.CallbackData) {})
// 	fileMenu.AddText("Save", keys.CmdOrCtrl("s"), func(_ *menu.CallbackData) {})

// 	return appMenu
// }

func (a *App) AddToHistory(filePath string, description string) error {
	histories, err := storage.LoadHistory()
	if err != nil {
		return err
	}

	newHistory := models.EnvHistory{
		FilePath:    filePath,
		LastOpened:  time.Now(),
		Description: description,
	}

	// 중복 항목 제거
	for i, h := range histories {
		if h.FilePath == filePath {
			histories = append(histories[:i], histories[i+1:]...)
			break
		}
	}

	histories = append([]models.EnvHistory{newHistory}, histories...)
	return storage.SaveHistory(histories)
}

func (a *App) GetHistory() ([]models.EnvHistory, error) {
	return storage.LoadHistory()
}
